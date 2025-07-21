# 🧠 Understanding Memory in Mastra

## 📋 Overview

Memory in Mastra enables your agents to:
- **Remember conversations** across multiple interactions
- **Maintain context** about user preferences and past requests
- **Build relationships** with users over time
- **Provide personalized responses** based on history

## 🏗️ Memory Architecture

### **Two-Level Memory System**

#### **1. 🏗️ Application-Level Memory**
```typescript
// In src/mastra/index.ts
storage: new LibSQLStore({
  url: ":memory:", // In-memory storage
})
```
**Purpose**: Telemetry, evaluations, temporary data
**Persistence**: Lost when server restarts
**Use Case**: Performance metrics, temporary logs

#### **2. 🤖 Agent-Level Memory**
```typescript
// In each agent (weather-agent.ts, restaurant-agent.ts, etc.)
memory: new Memory({
  storage: new LibSQLStore({
    url: 'file:../mastra.db', // Persistent file-based storage
  }),
})
```
**Purpose**: Conversation history, user preferences, persistent data
**Persistence**: Survives server restarts
**Use Case**: Long-term memory, user sessions

## 🎯 How Memory Works

### **🔄 Memory Flow Diagram**

```
User Message → Agent → Memory Check → Response → Memory Update
     ↓           ↓         ↓           ↓           ↓
   Input    Process   Retrieve    Generate   Store
   Query    Context   History     Response   New Data
```

### **📊 Memory Storage Types**

| Storage Type | Location | Persistence | Use Case |
|--------------|----------|-------------|----------|
| **In-Memory** | `:memory:` | Temporary | Telemetry, logs |
| **File-Based** | `file:../mastra.db` | Permanent | Conversations, preferences |

### **🗄️ Database Files**

Your memory is stored in these files:
- **`mastra.db`**: Main database (4.0 KB)
- **`mastra.db-wal`**: Write-Ahead Log (165 KB)
- **`mastra.db-shm`**: Shared Memory (32 KB)

## 🧪 Testing Memory

### **1. 💬 Conversation Memory Test**

```typescript
// First conversation
const response1 = await weatherAgent.stream([
  { role: 'user', content: 'What\'s the weather like in Tokyo?' }
]);

// Second conversation - agent should remember Tokyo
const response2 = await weatherAgent.stream([
  { role: 'user', content: 'What about the same location?' }
]);
```

**Expected Result**: Agent remembers Tokyo from the first conversation

### **2. 🛠️ Tool Usage Memory Test**

```typescript
// First request - uses weather tool
const response1 = await weatherAgent.stream([
  { role: 'user', content: 'Get weather for Paris' }
]);

// Second request - references previous tool usage
const response2 = await weatherAgent.stream([
  { role: 'user', content: 'Now find restaurants in the same city' }
]);
```

**Expected Result**: Agent remembers Paris from the weather tool usage

### **3. 🤝 Cross-Agent Memory Test**

```typescript
// Weather agent conversation
const weatherResponse = await weatherAgent.stream([
  { role: 'user', content: 'What\'s the weather in London?' }
]);

// Restaurant agent conversation - should be independent
const restaurantResponse = await restaurantAgent.stream([
  { role: 'user', content: 'Find restaurants in London' }
]);
```

**Expected Result**: Each agent has independent memory

### **4. 💾 Memory Persistence Test**

```typescript
// First session - set preference
const response1 = await weatherAgent.stream([
  { role: 'user', content: 'Remember that I prefer indoor activities when it rains' }
]);

// Second session - test if preference is remembered
const response2 = await weatherAgent.stream([
  { role: 'user', content: 'What should I do in Tokyo if it rains?' }
]);
```

**Expected Result**: Agent remembers the indoor activity preference

## 🎯 Memory Features

### **📝 Conversation History**
- **What it stores**: Previous messages, responses, context
- **How it works**: Agent retrieves relevant history for each new message
- **Use case**: Maintaining conversation flow and context

### **👤 User Preferences**
- **What it stores**: User likes, dislikes, preferences, settings
- **How it works**: Agent learns and applies preferences over time
- **Use case**: Personalized recommendations and responses

### **🛠️ Tool Usage Patterns**
- **What it stores**: Which tools were used, when, and how
- **How it works**: Agent remembers tool usage for future reference
- **Use case**: Optimizing tool usage and improving efficiency

### **📍 Location and Context Memory**
- **What it stores**: Previously discussed locations, weather data, activities
- **How it works**: Agent remembers locations and related information
- **Use case**: Providing context-aware responses

## 🔧 Memory Configuration

### **Agent-Level Memory Setup**

```typescript
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  // ... other configuration
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // Persistent storage
    }),
  }),
});
```

### **Application-Level Memory Setup**

```typescript
import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';

export const mastra = new Mastra({
  // ... agents and workflows
  storage: new LibSQLStore({
    url: ":memory:", // Temporary storage
  }),
});
```

## 📊 Memory Management

### **🗄️ Database Management**

**Check Memory Database**:
```bash
ls -la .mastra/
# Shows: mastra.db, mastra.db-wal, mastra.db-shm
```

**Database Size Monitoring**:
```bash
du -h .mastra/mastra.db*
# Shows sizes of all database files
```

### **🧹 Memory Cleanup**

**Clear Agent Memory**:
```typescript
// Clear specific agent memory
await weatherAgent.memory.clear();
```

**Clear All Memory**:
```bash
# Remove database files (will be recreated)
rm .mastra/mastra.db*
```

## 🎯 Best Practices

### **✅ Do's**

1. **Use Memory for Context**
   ```typescript
   // Good: Agent remembers previous location
   "What about the same city?"
   ```

2. **Store User Preferences**
   ```typescript
   // Good: Agent learns preferences
   "Remember I prefer indoor activities"
   ```

3. **Maintain Conversation Flow**
   ```typescript
   // Good: Natural conversation progression
   "What's the weather?" → "What about tomorrow?"
   ```

### **❌ Don'ts**

1. **Don't Overload Memory**
   ```typescript
   // Bad: Too much information at once
   "Remember everything about my entire life"
   ```

2. **Don't Rely on Memory for Critical Data**
   ```typescript
   // Bad: Memory can be cleared
   "Store my credit card number"
   ```

3. **Don't Assume Memory Persistence**
   ```typescript
   // Bad: Memory might be cleared
   "Always remember this forever"
   ```

## 🧪 Running Memory Tests

### **Quick Memory Test**
```bash
node test-memory.js
```

### **Interactive Memory Test**
1. Start the development server: `npm run dev`
2. Open the playground: `http://localhost:4112`
3. Try these conversation patterns:

**Pattern 1: Location Memory**
```
User: "What's the weather in Paris?"
Agent: [Provides weather data]
User: "What about the same city?"
Agent: [Should remember Paris]
```

**Pattern 2: Preference Memory**
```
User: "I prefer indoor activities when it rains"
Agent: [Acknowledges preference]
User: "What should I do in Tokyo if it rains?"
Agent: [Should suggest indoor activities]
```

**Pattern 3: Tool Usage Memory**
```
User: "Get weather for London"
Agent: [Uses weather tool]
User: "Now find restaurants there"
Agent: [Should remember London location]
```

## 📈 Memory Performance

### **📊 Memory Metrics**

- **Database Size**: Monitor `.mastra/mastra.db` size
- **Response Time**: Memory retrieval should be fast
- **Context Relevance**: Memory should improve responses
- **Persistence**: Data should survive server restarts

### **🔍 Memory Debugging**

**Check Memory Database**:
```bash
# View database files
ls -la .mastra/

# Check database size
du -h .mastra/mastra.db*
```

**Test Memory Functionality**:
```bash
# Run memory tests
node test-memory.js
```

## 🚀 Advanced Memory Features

### **🎯 Memory Segmentation**
Different types of memory for different purposes:
- **Conversation Memory**: Chat history
- **Preference Memory**: User likes/dislikes
- **Tool Memory**: Usage patterns
- **Context Memory**: Current session data

### **🔄 Memory Synchronization**
- **Cross-Agent Memory**: Share data between agents
- **Session Memory**: Temporary data for current session
- **Persistent Memory**: Long-term storage

### **📊 Memory Analytics**
- **Usage Patterns**: How memory is being used
- **Performance Metrics**: Memory retrieval speed
- **Storage Optimization**: Efficient memory usage

## 🎉 Memory Success Indicators

Your memory is working correctly if:

1. ✅ **Agents remember previous conversations**
2. ✅ **User preferences are applied consistently**
3. ✅ **Tool usage is optimized based on history**
4. ✅ **Context is maintained across interactions**
5. ✅ **Memory persists across server restarts**
6. ✅ **Database files are being updated**

## 🐛 Troubleshooting Memory

### **Common Issues**

**Issue**: Agent doesn't remember previous conversations
**Solution**: Check if memory is properly configured in agent

**Issue**: Memory database is too large
**Solution**: Implement memory cleanup or archiving

**Issue**: Slow response times
**Solution**: Optimize memory queries or reduce stored data

**Issue**: Memory not persisting after restart
**Solution**: Verify file-based storage configuration

---

**🧠 Your agents now have powerful memory capabilities!** 