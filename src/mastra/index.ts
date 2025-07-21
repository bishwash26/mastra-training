
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { restaurantWorkflow } from './workflows/restaurant-workflow';
import { weatherAgent } from './agents/weather-agent';
import { restaurantAgent } from './agents/restaurant-agent';
import { travelAgent } from './agents/travel-agent';
import { shoppingAgent } from './agents/shopping-agent';

export const mastra = new Mastra({
  workflows: { weatherWorkflow, restaurantWorkflow },
  agents: { weatherAgent, restaurantAgent, travelAgent, shoppingAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
