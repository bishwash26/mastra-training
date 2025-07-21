# Mastra Training - Agent Collection

This changes were made following this course: 
https://mastra.ai/course

A collection of specialized Mastra agents for weather, dining, and travel assistance.

## 🚀 Quick Start

Add .env file with following keys:
```bash
OPENAI_API_KEY=<your-api-key>
```

```bash
npm install
npm run dev
```

## 🤖 Available Agents

### 🌤️ Weather Agent
**Purpose**: Provides weather information and activity suggestions

###  Resturant Agenda
**Purpose**: Provides Resturant Infomration according to weather

## Travel Agent
**Purpose**: Provides travel guide to the user according to weather 


**Capabilities**:
- Get current weather for any location
- Suggest activities based on weather conditions
- Provide detailed weather forecasts
- Location-based weather recommendations

**Usage**:
```typescript
import { weatherAgent } from './src/mastra/agents/weather-agent';

// Ask for weather information
const response = await weatherAgent.stream([
  { role: 'user', content: 'What\'s the weather like in Paris?' }
]);
```

### 🍽️ Restaurant Agent
**Purpose**: Finds restaurants with weather-aware recommendations

**Capabilities**:
- Find restaurants in any location
- Weather-based dining recommendations
- Cuisine-specific suggestions
- Distance and rating information

**Usage**:
```typescript
import { restaurantAgent } from './src/mastra/agents/restaurant-agent';

// Find restaurants
const response = await restaurantAgent.stream([
  { role: 'user', content: 'Find Italian restaurants in Rome' }
]);
```

### 🌍 Travel Agent
**Purpose**: Comprehensive travel planning with weather and dining integration

**Capabilities**:
- Weather-aware travel planning
- Local dining recommendations
- Destination research and tips
- Seasonal travel considerations

**Usage**:
```typescript
import { travelAgent } from './src/mastra/agents/travel-agent';

// Plan a trip
const response = await travelAgent.stream([
  { role: 'user', content: 'Plan a trip to Tokyo in March' }
]);
```

## 🛠️ Tools

### Weather Tool
- **Function**: Get current weather data
- **Input**: Location (city name)
- **Output**: Temperature, conditions, humidity, wind data

### Restaurant Tool
- **Function**: Find restaurants with weather considerations
- **Input**: Location, cuisine (optional), weather conditions
- **Output**: Restaurant list with ratings, distances, weather recommendations

## 🔄 Workflows

### Weather Workflow
Multi-step process that:
1. Fetches weather data for a location
2. Generates activity suggestions based on weather
3. Provides formatted recommendations

### Restaurant Workflow
Multi-step process that:
1. Gets weather data for location
2. Finds restaurants with weather considerations
3. Generates comprehensive dining recommendations

## 📦 Exporting Agents

### Method 1: Direct Import
```typescript
import { weatherAgent, restaurantAgent, travelAgent } from './src/mastra/exports';
```

### Method 2: Individual Imports
```typescript
import { weatherAgent } from './src/mastra/agents/weather-agent';
import { restaurantAgent } from './src/mastra/agents/restaurant-agent';
import { travelAgent } from './src/mastra/agents/travel-agent';
```

### Method 3: Complete Mastra Instance
```typescript
import { mastra } from './src/mastra/index';

// Use the complete Mastra instance with all agents and workflows
```

## 🎯 Agent Collections

### Weather & Dining Collection
```typescript
import { agentCollections } from './src/mastra/exports';

const weatherAndDining = agentCollections.weatherAndDining;
// Contains: weatherAgent, restaurantAgent, weatherWorkflow, restaurantWorkflow
```

### Travel Planning Collection
```typescript
const travelPlanning = agentCollections.travelPlanning;
// Contains: travelAgent, restaurantWorkflow
```

### Complete Suite
```typescript
const completeSuite = agentCollections.completeSuite;
// Contains: All agents and workflows
```

## 🔧 Configuration

### Agent Configurations
```typescript
import { agentConfigs } from './src/mastra/exports';

console.log(agentConfigs.weather);
// Outputs: name, description, tools, useCases
```

### Custom Setup
```typescript
import { Mastra } from '@mastra/core/mastra';
import { weatherAgent, restaurantAgent } from './src/mastra/exports';

const customMastra = new Mastra({
  agents: { weatherAgent, restaurantAgent },
  // Add your custom configuration
});
```

## 📋 Usage Examples

### Weather Query
```
User: "What's the weather in Tokyo?"
Agent: Provides current conditions, temperature, and activity suggestions
```

### Restaurant Search
```
User: "Find restaurants in Paris"
Agent: Lists restaurants with weather considerations and recommendations
```

### Travel Planning
```
User: "Plan a trip to Rome in April"
Agent: Provides weather forecast, attractions, dining options, and travel tips
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Export for Distribution
```bash
npm run export:agents
npm run package:agents
```

## 📝 License

ISC License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your agent or tool
4. Update documentation
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the agent configurations

---

**Built with Mastra** - The AI agent framework for building intelligent applications. 
