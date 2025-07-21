// Export individual agents for reuse in other projects
export { weatherAgent } from './agents/weather-agent';
export { restaurantAgent } from './agents/restaurant-agent';
export { travelAgent } from './agents/travel-agent';
export { shoppingAgent } from './agents/shopping-agent';

// Export tools for reuse
export { weatherTool } from './tools/weather-tool';
export { restaurantTool } from './tools/restaurant-tool';

// Export workflows
export { weatherWorkflow } from './workflows/weather-workflow';
export { restaurantWorkflow } from './workflows/restaurant-workflow';

// Export the main Mastra instance
export { mastra } from './index';

// Export agent configurations for easy setup
export const agentConfigs = {
  weather: {
    name: 'Weather Agent',
    description: 'Provides weather information and activity suggestions',
    tools: ['weatherTool'],
    useCases: ['Weather queries', 'Activity planning', 'Location-based recommendations'],
  },
  restaurant: {
    name: 'Restaurant Expert',
    description: 'Finds restaurants with weather-aware recommendations',
    tools: ['restaurantTool'],
    useCases: ['Restaurant discovery', 'Dining recommendations', 'Weather-appropriate dining'],
  },
  travel: {
    name: 'Travel Expert',
    description: 'Comprehensive travel planning with weather and dining integration',
    tools: ['weatherTool', 'restaurantTool'],
    useCases: ['Trip planning', 'Destination research', 'Weather-aware travel', 'Local dining discovery'],
  },
  shopping: {
    name: 'Shopping Assistant',
    description: 'Personalized shopping recommendations with memory capabilities',
    tools: [],
    useCases: ['Product recommendations', 'Shopping assistance', 'Preference learning', 'Budget tracking'],
  },
};

// Export agent collections for different use cases
export const agentCollections = {
  weatherAndDining: {
    name: 'Weather & Dining Collection',
    description: 'Agents for weather and restaurant recommendations',
    agents: ['weatherAgent', 'restaurantAgent'],
    workflows: ['weatherWorkflow', 'restaurantWorkflow'],
  },
  travelPlanning: {
    name: 'Travel Planning Collection',
    description: 'Complete travel planning solution',
    agents: ['travelAgent'],
    workflows: ['restaurantWorkflow'],
  },
  completeSuite: {
    name: 'Complete Agent Suite',
    description: 'All agents and workflows for comprehensive assistance',
    agents: ['weatherAgent', 'restaurantAgent', 'travelAgent', 'shoppingAgent'],
    workflows: ['weatherWorkflow', 'restaurantWorkflow'],
  },
}; 