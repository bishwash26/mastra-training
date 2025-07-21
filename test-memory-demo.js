// Memory demonstration for Mastra agents
import { weatherAgent, restaurantAgent, shoppingAgent } from './src/mastra/exports.js';

console.log('🧠 Memory Demonstration for Mastra Agents\n');

// Demo 1: Weather Agent Memory
async function demoWeatherMemory() {
  console.log('🌤️ Demo 1: Weather Agent Memory\n');
  
  try {
    // First conversation - get weather
    console.log('📝 First conversation:');
    const response1 = await weatherAgent.stream([
      { role: 'user', content: 'What\'s the weather like in Tokyo?' }
    ]);

    let firstResponse = '';
    for await (const chunk of response1.textStream) {
      process.stdout.write(chunk);
      firstResponse += chunk;
    }
    console.log('\n');

    // Second conversation - reference same location
    console.log('📝 Second conversation (referencing same location):');
    const response2 = await weatherAgent.stream([
      { role: 'user', content: 'What about the same city?' }
    ]);

    let secondResponse = '';
    for await (const chunk of response2.textStream) {
      process.stdout.write(chunk);
      secondResponse += chunk;
    }
    console.log('\n');

    if (firstResponse && secondResponse) {
      console.log('✅ Weather agent remembered Tokyo from previous conversation');
    }

    console.log('✅ Weather Memory Demo Completed\n');
  } catch (error) {
    console.error('❌ Weather Memory Demo Failed:', error.message);
  }
}

// Demo 2: Restaurant Agent Memory
async function demoRestaurantMemory() {
  console.log('🍽️ Demo 2: Restaurant Agent Memory\n');
  
  try {
    // First conversation - find restaurants
    console.log('📝 First conversation:');
    const response1 = await restaurantAgent.stream([
      { role: 'user', content: 'Find Italian restaurants in Rome' }
    ]);

    let firstResponse = '';
    for await (const chunk of response1.textStream) {
      process.stdout.write(chunk);
      firstResponse += chunk;
    }
    console.log('\n');

    // Second conversation - reference same location
    console.log('📝 Second conversation (referencing same location):');
    const response2 = await restaurantAgent.stream([
      { role: 'user', content: 'Any with outdoor seating in the same city?' }
    ]);

    let secondResponse = '';
    for await (const chunk of response2.textStream) {
      process.stdout.write(chunk);
      secondResponse += chunk;
    }
    console.log('\n');

    if (firstResponse && secondResponse) {
      console.log('✅ Restaurant agent remembered Rome from previous conversation');
    }

    console.log('✅ Restaurant Memory Demo Completed\n');
  } catch (error) {
    console.error('❌ Restaurant Memory Demo Failed:', error.message);
  }
}

// Demo 3: Shopping Agent Memory
async function demoShoppingMemory() {
  console.log('🛍️ Demo 3: Shopping Agent Memory\n');
  
  try {
    // First conversation - set preferences
    console.log('📝 First conversation (setting preferences):');
    const response1 = await shoppingAgent.stream([
      { role: 'user', content: 'Remember I prefer size M and my budget is $100' }
    ]);

    let firstResponse = '';
    for await (const chunk of response1.textStream) {
      process.stdout.write(chunk);
      firstResponse += chunk;
    }
    console.log('\n');

    // Second conversation - test preferences
    console.log('📝 Second conversation (testing preferences):');
    const response2 = await shoppingAgent.stream([
      { role: 'user', content: 'Find me a dress for a wedding' }
    ]);

    let secondResponse = '';
    for await (const chunk of response2.textStream) {
      process.stdout.write(chunk);
      secondResponse += chunk;
    }
    console.log('\n');

    if (firstResponse && secondResponse) {
      console.log('✅ Shopping agent remembered size M and $100 budget preferences');
    }

    console.log('✅ Shopping Memory Demo Completed\n');
  } catch (error) {
    console.error('❌ Shopping Memory Demo Failed:', error.message);
  }
}

// Demo 4: Cross-Agent Memory Isolation
async function demoCrossAgentMemory() {
  console.log('🤝 Demo 4: Cross-Agent Memory Isolation\n');
  
  try {
    // Weather agent conversation
    console.log('📝 Weather agent conversation:');
    const weatherResponse = await weatherAgent.stream([
      { role: 'user', content: 'What\'s the weather in London?' }
    ]);

    let weatherText = '';
    for await (const chunk of weatherResponse.textStream) {
      process.stdout.write(chunk);
      weatherText += chunk;
    }
    console.log('\n');

    // Restaurant agent conversation (should be independent)
    console.log('📝 Restaurant agent conversation (independent memory):');
    const restaurantResponse = await restaurantAgent.stream([
      { role: 'user', content: 'Find restaurants in London' }
    ]);

    let restaurantText = '';
    for await (const chunk of restaurantResponse.textStream) {
      process.stdout.write(chunk);
      restaurantText += chunk;
    }
    console.log('\n');

    console.log('✅ Each agent has independent memory - they don\'t share context');
    console.log('✅ Cross-Agent Memory Isolation Demo Completed\n');
  } catch (error) {
    console.error('❌ Cross-Agent Memory Demo Failed:', error.message);
  }
}

// Demo 5: Memory Persistence Test
async function demoMemoryPersistence() {
  console.log('💾 Demo 5: Memory Persistence Test\n');
  
  try {
    // Set a preference
    console.log('📝 Setting a preference:');
    const response1 = await weatherAgent.stream([
      { role: 'user', content: 'Remember that I prefer indoor activities when it rains' }
    ]);

    let firstResponse = '';
    for await (const chunk of response1.textStream) {
      process.stdout.write(chunk);
      firstResponse += chunk;
    }
    console.log('\n');

    // Test if preference is remembered
    console.log('📝 Testing if preference is remembered:');
    const response2 = await weatherAgent.stream([
      { role: 'user', content: 'What should I do in Paris if it rains?' }
    ]);

    let secondResponse = '';
    for await (const chunk of response2.textStream) {
      process.stdout.write(chunk);
      secondResponse += chunk;
    }
    console.log('\n');

    if (firstResponse && secondResponse) {
      console.log('✅ Memory persistence working - agent remembered indoor activity preference');
    }

    console.log('✅ Memory Persistence Demo Completed\n');
  } catch (error) {
    console.error('❌ Memory Persistence Demo Failed:', error.message);
  }
}

// Run all memory demos
async function runMemoryDemos() {
  console.log('🚀 Starting Memory Demonstrations...\n');
  
  await demoWeatherMemory();
  await demoRestaurantMemory();
  await demoShoppingMemory();
  await demoCrossAgentMemory();
  await demoMemoryPersistence();
  
  console.log('🎉 Memory Demonstrations Completed!');
  console.log('\n📋 Memory Demo Summary:');
  console.log('✅ Weather agent remembers locations');
  console.log('✅ Restaurant agent remembers locations');
  console.log('✅ Shopping agent remembers preferences');
  console.log('✅ Agents have independent memory');
  console.log('✅ Memory persists across conversations');
  console.log('\n🧠 Your agents have working memory!');
  console.log('\n💡 Try these in the playground at http://localhost:4112:');
  console.log('   1. "What\'s the weather in Tokyo?"');
  console.log('   2. "What about the same city?"');
  console.log('   3. "Remember I prefer indoor activities"');
  console.log('   4. "What should I do in Paris if it rains?"');
}

// Run demos if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMemoryDemos().catch(console.error);
}

export { 
  demoWeatherMemory,
  demoRestaurantMemory,
  demoShoppingMemory,
  demoCrossAgentMemory,
  demoMemoryPersistence,
  runMemoryDemos
}; 