import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

interface GeocodingResponse {
  results: {
    latitude: number;
    longitude: number;
    name: string;
  }[];
}

interface RestaurantResponse {
  features: {
    properties: {
      name: string;
      street: string;
      city: string;
      postcode: string;
      housenumber?: string;
      cuisine?: string;
      phone?: string;
      website?: string;
      opening_hours?: string;
      rating?: number;
      price_range?: string;
      xid: string;
    };
    geometry: {
      coordinates: [number, number];
    };
  }[];
}

export const restaurantTool = createTool({
  id: 'find-restaurants',
  description: 'Find restaurants in a location with optional weather-based recommendations',
  inputSchema: z.object({
    location: z.string().describe('City name or address'),
    cuisine: z.string().optional().describe('Preferred cuisine type (e.g., Italian, Chinese, etc.)'),
    maxResults: z.number().optional().describe('Maximum number of restaurants to return (default: 5)'),
    considerWeather: z.boolean().optional().describe('Whether to consider weather conditions for recommendations'),
    weatherConditions: z.string().optional().describe('Current weather conditions (if considerWeather is true)'),
  }),
  outputSchema: z.object({
    restaurants: z.array(z.object({
      name: z.string(),
      address: z.string(),
      cuisine: z.string().optional(),
      phone: z.string().optional(),
      website: z.string().optional(),
      rating: z.number().optional(),
      priceRange: z.string().optional(),
      distance: z.number().optional(),
      weatherRecommendation: z.string().optional(),
    })),
    location: z.string(),
    totalFound: z.number(),
  }),
  execute: async ({ context }) => {
    return await findRestaurants(
      context.location,
      context.cuisine,
      context.maxResults || 5,
      context.considerWeather,
      context.weatherConditions
    );
  },
});

const findRestaurants = async (
  location: string,
  cuisine?: string,
  maxResults: number = 5,
  considerWeather?: boolean,
  weatherConditions?: string
) => {
  // Step 1: Geocoding - Convert location to coordinates
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;
  const geocodingResponse = await fetch(geocodingUrl);
  const geocodingData = (await geocodingResponse.json()) as GeocodingResponse;

  if (!geocodingData.results?.[0]) {
    throw new Error(`Location '${location}' not found`);
  }

  const { latitude, longitude, name } = geocodingData.results[0];

  // Step 2: Find restaurants using OpenTripMap API (free, no API key required)
  const radius = 5000; // 5km radius
  const restaurantUrl = `https://api.opentripmap.com/0.1/en/places/autosuggest?name=restaurant&radius=${radius}&lon=${longitude}&lat=${latitude}&limit=${maxResults}&apikey=5ae2e3f221c38a28845f05b6e1d3f7e6f793095faa50ad5ba8b1f51`;

  const response = await fetch(restaurantUrl);
  const data = (await response.json()) as RestaurantResponse;

  // Step 3: Get detailed information for each restaurant
  const restaurants = await Promise.all(
    data.features.slice(0, maxResults).map(async (feature) => {
      const detailsUrl = `https://api.opentripmap.com/0.1/en/places/xid/${feature.properties.xid}?apikey=5ae2e3f221c38a28845f05b6e1d3f7e6f793095faa50ad5ba8b1f51`;
      const detailsResponse = await fetch(detailsUrl);
      const details = await detailsResponse.json();

      // Calculate distance from search location
      const distance = calculateDistance(
        latitude,
        longitude,
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0]
      );

      // Generate weather-based recommendation
      let weatherRecommendation = '';
      if (considerWeather && weatherConditions) {
        weatherRecommendation = generateWeatherRecommendation(
          weatherConditions,
          details.cuisine || 'restaurant'
        );
      }

      return {
        name: feature.properties.name,
        address: `${feature.properties.street || ''} ${feature.properties.housenumber || ''}, ${feature.properties.city || ''} ${feature.properties.postcode || ''}`.trim(),
        cuisine: details.cuisine || feature.properties.cuisine,
        phone: details.phone || feature.properties.phone,
        website: details.website || feature.properties.website,
        rating: details.rating || feature.properties.rating,
        priceRange: details.price_range || feature.properties.price_range,
        distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
        weatherRecommendation,
      };
    })
  );

  // Step 4: Filter by cuisine if specified
  const filteredRestaurants = cuisine
    ? restaurants.filter(restaurant => 
        restaurant.cuisine?.toLowerCase().includes(cuisine.toLowerCase())
      )
    : restaurants;

  return {
    restaurants: filteredRestaurants,
    location: name,
    totalFound: filteredRestaurants.length,
  };
};

// Helper function to calculate distance between two points
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Helper function to generate weather-based recommendations
const generateWeatherRecommendation = (weatherConditions: string, cuisine: string): string => {
  const conditions = weatherConditions.toLowerCase();
  
  if (conditions.includes('rain') || conditions.includes('snow')) {
    return `Perfect for indoor dining - cozy atmosphere recommended`;
  } else if (conditions.includes('sunny') || conditions.includes('clear')) {
    return `Great weather for outdoor dining - look for restaurants with patios`;
  } else if (conditions.includes('cold') || conditions.includes('freezing')) {
    return `Warm comfort food recommended - consider hot soups and stews`;
  } else if (conditions.includes('hot') || conditions.includes('warm')) {
    return `Light, refreshing options recommended - consider salads and cold drinks`;
  }
  
  return `Weather-appropriate dining options available`;
}; 