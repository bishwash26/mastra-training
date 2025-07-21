import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

const weatherDataSchema = z.object({
  temperature: z.number(),
  feelsLike: z.number(),
  humidity: z.number(),
  windSpeed: z.number(),
  windGust: z.number(),
  conditions: z.string(),
  location: z.string(),
});

const restaurantDataSchema = z.object({
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
});

const combinedRecommendationSchema = z.object({
  weatherSummary: z.string(),
  diningRecommendations: z.string(),
  topRestaurants: z.array(z.object({
    name: z.string(),
    cuisine: z.string().optional(),
    distance: z.number().optional(),
    weatherRecommendation: z.string().optional(),
    whyRecommended: z.string(),
  })),
  location: z.string(),
});

const getWeatherData = createStep({
  id: 'get-weather-data',
  description: 'Fetches current weather data for a location',
  inputSchema: z.object({
    location: z.string().describe('The location to get weather for'),
  }),
  outputSchema: weatherDataSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Input data not found');
    }

    // Simulate weather data for now - in real implementation, you'd call the weather tool
    const weatherData = {
      temperature: 22,
      feelsLike: 24,
      humidity: 65,
      windSpeed: 10,
      windGust: 15,
      conditions: 'Partly cloudy',
      location: inputData.location,
    };

    return weatherData;
  },
});

const getRestaurantRecommendations = createStep({
  id: 'get-restaurant-recommendations',
  description: 'Fetches restaurant recommendations with weather considerations',
  inputSchema: weatherDataSchema,
  outputSchema: restaurantDataSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Input data not found');
    }

    // Simulate restaurant data for now
    const restaurantData = {
      restaurants: [
        {
          name: 'The Weather Cafe',
          address: '123 Main St, Downtown',
          cuisine: 'International',
          phone: '+1-555-0123',
          website: 'https://weathercafe.com',
          rating: 4.5,
          priceRange: '$$',
          distance: 0.5,
          weatherRecommendation: 'Perfect for indoor dining with cozy atmosphere',
        },
        {
          name: 'Sunny Side Bistro',
          address: '456 Oak Ave, Uptown',
          cuisine: 'Mediterranean',
          phone: '+1-555-0456',
          website: 'https://sunnysidebistro.com',
          rating: 4.2,
          priceRange: '$$$',
          distance: 1.2,
          weatherRecommendation: 'Great for outdoor dining with patio seating',
        },
        {
          name: 'Rainy Day Ramen',
          address: '789 Pine St, Midtown',
          cuisine: 'Japanese',
          phone: '+1-555-0789',
          website: 'https://rainydayramen.com',
          rating: 4.7,
          priceRange: '$',
          distance: 0.8,
          weatherRecommendation: 'Warm comfort food perfect for any weather',
        },
      ],
      location: inputData.location,
      totalFound: 3,
    };

    return restaurantData;
  },
});

const generateCombinedRecommendations = createStep({
  id: 'generate-combined-recommendations',
  description: 'Generates weather-aware dining recommendations',
  inputSchema: restaurantDataSchema,
  outputSchema: combinedRecommendationSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Input data not found');
    }

    const restaurantData = inputData;

    // Generate recommendations based on the restaurant data
    const recommendationsText = `Based on the current weather conditions, here are some great dining options:

🌤️ WEATHER SUMMARY
Current conditions are perfect for exploring local dining options.

🍽️ DINING RECOMMENDATIONS  
The weather is ideal for both indoor and outdoor dining experiences. Consider restaurants with cozy atmospheres or outdoor seating depending on your preference.

🏆 TOP RESTAURANT PICKS
1. The Weather Cafe - International
   Distance: 0.5 km
   Why recommended: Perfect for indoor dining with cozy atmosphere
   
2. Sunny Side Bistro - Mediterranean  
   Distance: 1.2 km
   Why recommended: Great for outdoor dining with patio seating
   
3. Rainy Day Ramen - Japanese
   Distance: 0.8 km
   Why recommended: Warm comfort food perfect for any weather`;

    // Extract top 3 restaurants for structured output
    const topRestaurants = restaurantData.restaurants.slice(0, 3).map((restaurant) => ({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      distance: restaurant.distance,
      weatherRecommendation: restaurant.weatherRecommendation,
      whyRecommended: restaurant.weatherRecommendation || 'Great dining option',
    }));

    return {
      weatherSummary: `Current weather in ${restaurantData.location}: Partly cloudy, 22°C (feels like 24°C)`,
      diningRecommendations: recommendationsText,
      topRestaurants,
      location: restaurantData.location,
    };
  },
});

const getWeatherBasedReason = (conditions: string, cuisine: string): string => {
  const conditionsLower = conditions.toLowerCase();
  
  if (conditionsLower.includes('rain') || conditionsLower.includes('snow')) {
    return 'Perfect for indoor dining with cozy atmosphere';
  } else if (conditionsLower.includes('sunny') || conditionsLower.includes('clear')) {
    return 'Great for outdoor dining or restaurants with patios';
  } else if (conditionsLower.includes('cold') || conditionsLower.includes('freezing')) {
    return 'Ideal for warm comfort food and hot beverages';
  } else if (conditionsLower.includes('hot') || conditionsLower.includes('warm')) {
    return 'Perfect for light, refreshing options and cold drinks';
  }
  
  return 'Suitable for various dining preferences';
};

const restaurantWorkflow = createWorkflow({
  id: 'restaurant-workflow',
  inputSchema: z.object({
    location: z.string().describe('The location to get weather and restaurant recommendations for'),
  }),
  outputSchema: combinedRecommendationSchema,
})
  .then(getWeatherData)
  .then(getRestaurantRecommendations)
  .then(generateCombinedRecommendations);

restaurantWorkflow.commit();

export { restaurantWorkflow }; 