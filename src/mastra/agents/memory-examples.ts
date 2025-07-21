import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

// Example 1: Basic Memory Configuration (Current Setup)
export const basicMemoryAgent = new Agent({
  name: 'Basic Memory Agent',
  instructions: 'You are a helpful assistant with basic memory capabilities.',
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // Persistent file-based storage
    }),
  }),
});

// Example 2: In-Memory Only (Temporary)
export const inMemoryAgent = new Agent({
  name: 'In-Memory Agent',
  instructions: 'You are a helpful assistant with temporary in-memory storage.',
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: ':memory:', // In-memory storage (lost on restart)
    }),
  }),
});

// Example 3: Custom Database Path
export const customMemoryAgent = new Agent({
  name: 'Custom Memory Agent',
  instructions: 'You are a helpful assistant with custom memory storage.',
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../custom-agent.db', // Custom database file
    }),
  }),
});

// Example 4: Memory with Custom Configuration
export const advancedMemoryAgent = new Agent({
  name: 'Advanced Memory Agent',
  instructions: `
    You are a helpful assistant with advanced memory capabilities.
    
    Memory Guidelines:
    - Remember user preferences and past conversations
    - Use context from previous interactions
    - Maintain conversation flow naturally
    - Apply learned preferences consistently
  `,
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../advanced-agent.db',
    }),
  }),
});

// Example 5: Agent with Memory-Focused Instructions
export const memoryFocusedAgent = new Agent({
  name: 'Memory-Focused Agent',
  instructions: `
    You are a memory-focused assistant that excels at:
    
    1. **Conversation Memory**: Remember previous conversations and context
    2. **User Preferences**: Learn and apply user preferences over time
    3. **Location Memory**: Remember discussed locations and related information
    4. **Tool Usage Memory**: Remember which tools were used and their results
    5. **Context Awareness**: Use memory to provide more relevant responses
    
    When responding:
    - Reference previous conversations when relevant
    - Apply learned user preferences automatically
    - Use memory to avoid repeating information
    - Build on previous context naturally
    - Remember user's preferred communication style
    
    Memory Examples:
    - If user mentioned preferring indoor activities, suggest indoor options
    - If user asked about a location before, reference that location
    - If user has specific preferences, apply them consistently
    - Use previous tool results to provide better recommendations
  `,
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../memory-focused.db',
    }),
  }),
});

// Example 6: Agent with No Memory (for comparison)
export const noMemoryAgent = new Agent({
  name: 'No Memory Agent',
  instructions: 'You are a helpful assistant without memory capabilities.',
  model: openai('gpt-4o-mini'),
  // No memory configuration - each conversation is independent
});

// Example 7: Agent with Memory for Specific Domain
export const domainMemoryAgent = new Agent({
  name: 'Domain Memory Agent',
  instructions: `
    You are a specialized assistant for travel planning with memory capabilities.
    
    Memory Focus Areas:
    - **Travel Preferences**: Remember user's travel style, budget, preferences
    - **Previous Trips**: Recall past destinations and experiences
    - **Planning Context**: Remember current trip planning details
    - **User Constraints**: Remember budget, time, accessibility needs
    - **Favorite Destinations**: Learn user's preferred locations
    
    Use memory to:
    - Suggest destinations based on past preferences
    - Remember budget constraints from previous conversations
    - Reference past trips when planning new ones
    - Apply learned travel style automatically
    - Build on previous planning sessions
  `,
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../travel-memory.db',
    }),
  }),
});

// Example 8: Agent with Memory for Learning
export const learningMemoryAgent = new Agent({
  name: 'Learning Memory Agent',
  instructions: `
    You are an adaptive assistant that learns from interactions.
    
    Learning Capabilities:
    - **Adapt to User Style**: Learn user's communication preferences
    - **Remember Corrections**: Learn from user feedback and corrections
    - **Build Context**: Develop understanding of user's domain knowledge
    - **Preference Learning**: Learn user's likes, dislikes, and needs
    - **Interaction Patterns**: Adapt to user's interaction style
    
    Memory Usage:
    - Apply learned preferences automatically
    - Use previous corrections to improve responses
    - Build on established context and knowledge
    - Adapt communication style to user preferences
    - Remember successful interaction patterns
  `,
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../learning-memory.db',
    }),
  }),
});

// Export all memory examples
export const memoryExamples = {
  basicMemoryAgent,
  inMemoryAgent,
  customMemoryAgent,
  advancedMemoryAgent,
  memoryFocusedAgent,
  noMemoryAgent,
  domainMemoryAgent,
  learningMemoryAgent,
}; 