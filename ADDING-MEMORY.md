# 🧠 Adding Memory to Agents

## 📋 Overview

Memory in Mastra agents enables them to:
- **Remember conversations** across multiple interactions
- **Learn user preferences** and apply them consistently
- **Maintain context** from previous conversations
- **Build relationships** with users over time

## 🏗️ Memory Configuration Options

### **1. 📦 Basic Memory Setup (Current)**

```typescript
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const agent = new Agent({
  name: 'My Agent',
  instructions: 'Your agent instructions...',
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // Persistent file-based storage
    }),
  }),
});
```

**Features:**
- ✅ Persistent storage (survives restarts)
- ✅ File-based database
- ✅ Automatic memory management

### **2. 🧠 In-Memory Only (Temporary)**

```typescript
export const agent = new Agent({
  name: 'Temporary Memory Agent',
  instructions: 'Your agent instructions...',
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: ':memory:', // In-memory storage (lost on restart)
    }),
  }),
});
```

**Features:**
- ⚡ Fast access
- 🗑️ Lost on server restart
- 💡 Good for temporary sessions

### **3. 🗄️ Custom Database Path**

```typescript
export const agent = new Agent({
  name: 'Custom Memory Agent',
  instructions: 'Your agent instructions...',
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../my-custom-agent.db', // Custom database file
    }),
  }),
});
```

**Features:**
- 🎯 Isolated memory per agent
- 📁 Custom database location
- 🔒 Independent memory storage

### **4. 🚫 No Memory (Stateless)**

```typescript
export const agent = new Agent({
  name: 'Stateless Agent',
  instructions: 'Your agent instructions...',
  model: openai('gpt-4o-mini'),
  // No memory configuration - each conversation is independent
});
```

**Features:**
- 🔄 Each conversation is independent
- ⚡ No memory overhead
- 🗑️ No persistent storage

## 🎯 Memory-Focused Agent Examples

### **Example 1: Memory-Focused Instructions**

```typescript
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
  `,
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../memory-focused.db',
    }),
  }),
});
```

### **Example 2: Domain-Specific Memory**

```typescript
export const travelMemoryAgent = new Agent({
  name: 'Travel Memory Agent',
  instructions: `
    You are a specialized travel assistant with memory capabilities.
    
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
```

### **Example 3: Learning Memory Agent**

```typescript
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
```

## 🔧 Adding Memory to Existing Agents

### **Step 1: Import Memory Dependencies**

```typescript
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
```

### **Step 2: Add Memory Configuration**

```typescript
// Before (no memory)
export const agent = new Agent({
  name: 'My Agent',
  instructions: 'Your instructions...',
  model: openai('gpt-4o-mini'),
  tools: { myTool },
});

// After (with memory)
export const agent = new Agent({
  name: 'My Agent',
  instructions: 'Your instructions...',
  model: openai('gpt-4o-mini'),
  tools: { myTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../my-agent.db',
    }),
  }),
});
```

### **Step 3: Update Instructions for Memory**

```typescript
export const agent = new Agent({
  name: 'My Agent',
  instructions: `
    You are a helpful assistant with memory capabilities.
    
    Memory Guidelines:
    - Remember user preferences and past conversations
    - Use context from previous interactions
    - Maintain conversation flow naturally
    - Apply learned preferences consistently
    
    When responding:
    - Reference previous conversations when relevant
    - Apply learned user preferences automatically
    - Use memory to avoid repeating information
    - Build on previous context naturally
  `,
  model: openai('gpt-4o-mini'),
  tools: { myTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../my-agent.db',
    }),
  }),
});
```

## 🧪 Testing Memory Configuration

### **Test 1: Basic Memory Test**

```typescript
// Test conversation memory
const response1 = await agent.stream([
  { role: 'user', content: 'What\'s the weather in Tokyo?' }
]);

const response2 = await agent.stream([
  { role: 'user', content: 'What about the same city?' }
]);

// Agent should remember Tokyo from first conversation
```

### **Test 2: Preference Memory Test**

```typescript
// Set preference
const response1 = await agent.stream([
  { role: 'user', content: 'Remember I prefer indoor activities when it rains' }
]);

// Test preference
const response2 = await agent.stream([
  { role: 'user', content: 'What should I do in Paris if it rains?' }
]);

// Agent should suggest indoor activities
```

### **Test 3: Tool Usage Memory Test**

```typescript
// First tool usage
const response1 = await agent.stream([
  { role: 'user', content: 'Get weather for London' }
]);

// Reference previous tool usage
const response2 = await agent.stream([
  { role: 'user', content: 'Now find restaurants there' }
]);

// Agent should remember London from weather tool
```

## 📊 Memory Configuration Comparison

| Configuration | Persistence | Speed | Use Case |
|---------------|-------------|-------|----------|
| **File-based** | ✅ Permanent | 🟡 Medium | Production, long-term |
| **In-memory** | ❌ Temporary | ⚡ Fast | Testing, temporary |
| **Custom path** | ✅ Permanent | 🟡 Medium | Isolated agents |
| **No memory** | ❌ None | ⚡ Fastest | Stateless operations |

## 🎯 Memory Best Practices

### **✅ Do's**

1. **Use Descriptive Database Names**
   ```typescript
   url: 'file:../weather-agent-memory.db'
   ```

2. **Add Memory-Focused Instructions**
   ```typescript
   instructions: `
     You have memory capabilities. Remember user preferences
     and previous conversations to provide better responses.
   `
   ```

3. **Test Memory Regularly**
   ```typescript
   // Test with follow-up questions
   "What about the same location?"
   ```

### **❌ Don'ts**

1. **Don't Overload Memory**
   ```typescript
   // Bad: Too much information
   "Remember everything about my entire life"
   ```

2. **Don't Rely on Memory for Critical Data**
   ```typescript
   // Bad: Memory can be cleared
   "Store my password"
   ```

3. **Don't Assume Memory Persistence**
   ```typescript
   // Bad: Memory might be cleared
   "Always remember this forever"
   ```

## 🔧 Memory Management

### **Database Monitoring**

```bash
# Check memory database files
ls -la .mastra/

# Monitor database size
du -h .mastra/*.db
```

### **Memory Cleanup**

```typescript
// Clear specific agent memory
await agent.memory.clear();

// Remove database files
rm .mastra/agent-memory.db
```

### **Memory Backup**

```bash
# Backup memory database
cp .mastra/mastra.db .mastra/mastra-backup.db
```

## 🚀 Advanced Memory Features

### **Memory Segmentation**

```typescript
// Different memory for different purposes
const conversationMemory = new Memory({
  storage: new LibSQLStore({ url: 'file:../conversation.db' })
});

const preferenceMemory = new Memory({
  storage: new LibSQLStore({ url: 'file:../preferences.db' })
});
```

### **Memory Synchronization**

```typescript
// Share memory between agents
const sharedMemory = new Memory({
  storage: new LibSQLStore({ url: 'file:../shared.db' })
});

export const agent1 = new Agent({
  // ... other config
  memory: sharedMemory,
});

export const agent2 = new Agent({
  // ... other config
  memory: sharedMemory,
});
```

## 🎉 Summary

### **✅ Your Current Setup**

Your agents already have memory configured:
- **Weather Agent**: Memory enabled ✅
- **Restaurant Agent**: Memory enabled ✅
- **Travel Agent**: Memory enabled ✅

### **🎯 Next Steps**

1. **Test existing memory** at `http://localhost:4112`
2. **Customize memory instructions** for better performance
3. **Add memory to new agents** using the examples above
4. **Monitor memory performance** and optimize as needed

### **📚 Resources**

- **`memory-examples.ts`**: Various memory configuration examples
- **`MEMORY.md`**: Detailed memory understanding guide
- **`MEMORY-INSTALLATION.md`**: Installation and usage guide

---

**🧠 Your agents are ready to use memory effectively!** 