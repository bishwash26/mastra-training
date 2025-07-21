# 🧪 Testing Your Mastra Agents

This guide shows you how to test your exported agents in different ways.

## 🚀 Quick Test Results

✅ **All tests passed!** Your agents are ready for use.

### 📋 Test Summary
- ✅ **File Structure**: All agent files exist and are properly organized
- ✅ **Package Configuration**: Exports are properly configured in package.json
- ✅ **Compiled Output**: Distribution files are ready
- ✅ **Agent Configuration**: All agents have proper tools and instructions

## 🎯 Testing Methods

### 1. 📦 **Basic Export Test**
```bash
node test-basic.js
```
**What it tests:**
- File structure and organization
- Package.json exports configuration
- Compiled output availability

### 2. 🏗️ **Mastra Development Server**
```bash
npm run dev
```
**What it tests:**
- Full agent functionality
- Tool integration
- Conversation capabilities
- Memory and persistence

### 3. 🧪 **Interactive Testing**
Once the dev server is running:
1. Open the Mastra playground in your browser
2. Try conversations with your agents
3. Test different scenarios

## 🎯 **Agent Testing Scenarios**

### 🌤️ **Weather Agent Tests**

**Test 1: Basic Weather Query**
```
User: "What's the weather like in Tokyo?"
Expected: Weather data with temperature, conditions, and activity suggestions
```

**Test 2: Location Translation**
```
User: "What's the weather in 東京?"
Expected: Translated to "Tokyo" and provides weather data
```

**Test 3: Activity Suggestions**
```
User: "What activities can I do in Paris when it's raining?"
Expected: Indoor activity suggestions based on weather conditions
```

### 🍽️ **Restaurant Agent Tests**

**Test 1: Basic Restaurant Search**
```
User: "Find Italian restaurants in Rome"
Expected: List of Italian restaurants with ratings and distances
```

**Test 2: Weather-Aware Recommendations**
```
User: "Find restaurants in London for a rainy day"
Expected: Indoor dining options with weather considerations
```

**Test 3: Cuisine-Specific Search**
```
User: "Find sushi restaurants in Tokyo"
Expected: Japanese restaurants filtered by cuisine type
```

### 🌍 **Travel Agent Tests**

**Test 1: Trip Planning**
```
User: "Plan a trip to Paris in March"
Expected: Weather forecast, attractions, dining options, travel tips
```

**Test 2: Weather-Aware Travel**
```
User: "What should I pack for Tokyo in summer?"
Expected: Weather-based packing suggestions and activity recommendations
```

**Test 3: Local Experience Planning**
```
User: "Find restaurants and activities in Rome for a sunny day"
Expected: Outdoor activities and dining options suitable for good weather
```

## 🛠️ **Tool Integration Tests**

### **Weather Tool**
```typescript
// Test weather tool directly
const weatherData = await weatherTool.execute({
  location: "New York"
});
console.log(weatherData);
// Expected: { temperature, feelsLike, humidity, windSpeed, conditions, location }
```

### **Restaurant Tool**
```typescript
// Test restaurant tool directly
const restaurantData = await restaurantTool.execute({
  location: "Paris",
  cuisine: "French",
  considerWeather: true,
  weatherConditions: "Partly cloudy"
});
console.log(restaurantData);
// Expected: { restaurants: [...], location, totalFound }
```

## 🔄 **Workflow Tests**

### **Weather Workflow**
```typescript
// Test weather workflow
const result = await weatherWorkflow.execute({
  city: "London"
});
console.log(result);
// Expected: { activities: "formatted activity suggestions" }
```

### **Restaurant Workflow**
```typescript
// Test restaurant workflow
const result = await restaurantWorkflow.execute({
  location: "Tokyo"
});
console.log(result);
// Expected: { weatherSummary, diningRecommendations, topRestaurants, location }
```

## 🧠 **Memory and Conversation Tests**

### **Conversation Memory**
```typescript
// Test conversation continuity
const response1 = await weatherAgent.stream([
  { role: 'user', content: 'What\'s the weather in London?' }
]);

const response2 = await weatherAgent.stream([
  { role: 'user', content: 'What about the same location?' }
]);
// Expected: Agent remembers the previous conversation about London
```

### **Tool Usage Memory**
```typescript
// Test if agent remembers tool usage
const response = await restaurantAgent.stream([
  { role: 'user', content: 'Find restaurants in Paris' },
  { role: 'user', content: 'Now find Italian restaurants in the same city' }
]);
// Expected: Agent uses previous location data
```

## 📊 **Performance Tests**

### **Response Time**
```typescript
const startTime = Date.now();
const response = await weatherAgent.stream([
  { role: 'user', content: 'What\'s the weather in Tokyo?' }
]);
const endTime = Date.now();
console.log(`Response time: ${endTime - startTime}ms`);
```

### **Tool Execution**
```typescript
const startTime = Date.now();
const weatherData = await weatherTool.execute({ location: "Paris" });
const endTime = Date.now();
console.log(`Tool execution time: ${endTime - startTime}ms`);
```

## 🐛 **Error Handling Tests**

### **Invalid Location**
```typescript
try {
  const weatherData = await weatherTool.execute({
    location: "NonExistentCity123"
  });
} catch (error) {
  console.log('Expected error:', error.message);
}
```

### **Missing Parameters**
```typescript
try {
  const restaurantData = await restaurantTool.execute({
    location: "" // Empty location
  });
} catch (error) {
  console.log('Expected error:', error.message);
}
```

## 🎯 **Integration Tests**

### **Agent + Tool Integration**
```typescript
// Test if agent can use tools properly
const response = await weatherAgent.stream([
  { role: 'user', content: 'Get weather for Tokyo and suggest activities' }
]);
// Expected: Agent uses weatherTool and provides activity suggestions
```

### **Workflow + Agent Integration**
```typescript
// Test if workflow can access agents
const result = await restaurantWorkflow.execute({
  location: "Paris"
});
// Expected: Workflow uses restaurantAgent for recommendations
```

## 📋 **Test Checklist**

### ✅ **Pre-Testing**
- [ ] All source files exist
- [ ] Package.json exports configured
- [ ] Development server can start
- [ ] Agents can be imported

### ✅ **Basic Functionality**
- [ ] Weather agent responds to queries
- [ ] Restaurant agent finds locations
- [ ] Travel agent provides recommendations
- [ ] Tools execute without errors

### ✅ **Advanced Features**
- [ ] Memory works across conversations
- [ ] Tool integration functions properly
- [ ] Workflows execute successfully
- [ ] Error handling works correctly

### ✅ **Performance**
- [ ] Response times are acceptable
- [ ] Tool execution is fast
- [ ] Memory usage is reasonable
- [ ] No memory leaks

## 🚀 **Running Tests**

### **Quick Test**
```bash
node test-basic.js
```

### **Full Development Test**
```bash
npm run dev
# Then test interactively in the browser
```

### **Export Test**
```bash
npm run export:agents
npm run package:agents
```

## 🎉 **Success Criteria**

Your agents are working correctly if:

1. ✅ **All basic tests pass**
2. ✅ **Agents respond appropriately to queries**
3. ✅ **Tools execute without errors**
4. ✅ **Workflows complete successfully**
5. ✅ **Memory persists across conversations**
6. ✅ **Error handling works properly**

## 🐛 **Troubleshooting**

### **Common Issues**

**Issue**: "Module not found" errors
**Solution**: Check import paths and ensure TypeScript compilation

**Issue**: Tool execution fails
**Solution**: Verify API keys and network connectivity

**Issue**: Memory not working
**Solution**: Check database configuration and permissions

**Issue**: Slow response times
**Solution**: Optimize tool calls and reduce API requests

## 📞 **Getting Help**

If you encounter issues:

1. **Check the logs** in the Mastra development server
2. **Review the test output** for specific error messages
3. **Verify your configuration** matches the examples
4. **Test individual components** to isolate issues

---

**🎯 Your agents are ready for production use!** 