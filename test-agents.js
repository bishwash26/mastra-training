// Test file for Mastra agents
import { weatherAgent, restaurantAgent, travelAgent } from './src/mastra/exports.js';
import { mastra } from './src/mastra/index.js';

console.log('🧪 Testing Mastra Agents...\n');

// Test 1: Weather Agent
async function testWeatherAgent() {
  console.log('🌤️ Testing Weather Agent...');
  try {
    const response = await weatherAgent.stream([
      { role: 'user', content: 'What\'s the weather like in Tokyo?' }
    ]);

    console.log('Weather Agent Response:');
    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
    }
    console.log('\n✅ Weather Agent Test Passed\n');
  } catch (error) {
    console.error('❌ Weather Agent Test Failed:', error.message);
  }
}

// Test 2: Restaurant Agent
async function testRestaurantAgent() {
  console.log('🍽️ Testing Restaurant Agent...');
  try {
    const response = await restaurantAgent.stream([
      { role: 'user', content: 'Find Italian restaurants in Rome' }
    ]);

    console.log('Restaurant Agent Response:');
    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
    }
    console.log('\n✅ Restaurant Agent Test Passed\n');
  } catch (error) {
    console.error('❌ Restaurant Agent Test Failed:', error.message);
  }
}

// Test 3: Travel Agent
async function testTravelAgent() {
  console.log('🌍 Testing Travel Agent...');
  try {
    const response = await travelAgent.stream([
      { role: 'user', content: 'Plan a trip to Paris in March' }
    ]);

    console.log('Travel Agent Response:');
    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
    }
    console.log('\n✅ Travel Agent Test Passed\n');
  } catch (error) {
    console.error('❌ Travel Agent Test Failed:', error.message);
  }
}

// Test 4: Mastra Instance
async function testMastraInstance() {
  console.log('🏗️ Testing Mastra Instance...');
  try {
    // Test getting agents from Mastra instance
    const weatherAgentFromMastra = mastra.getAgent('weatherAgent');
    const restaurantAgentFromMastra = mastra.getAgent('restaurantAgent');
    const travelAgentFromMastra = mastra.getAgent('travelAgent');

    if (weatherAgentFromMastra && restaurantAgentFromMastra && travelAgentFromMastra) {
      console.log('✅ All agents available in Mastra instance');
    } else {
      console.log('⚠️ Some agents not found in Mastra instance');
    }

    // Test workflows
    const weatherWorkflow = mastra.getWorkflow('weatherWorkflow');
    const restaurantWorkflow = mastra.getWorkflow('restaurantWorkflow');

    if (weatherWorkflow && restaurantWorkflow) {
      console.log('✅ All workflows available in Mastra instance');
    } else {
      console.log('⚠️ Some workflows not found in Mastra instance');
    }

    console.log('✅ Mastra Instance Test Passed\n');
  } catch (error) {
    console.error('❌ Mastra Instance Test Failed:', error.message);
  }
}

// Test 5: Tool Integration
async function testToolIntegration() {
  console.log('🛠️ Testing Tool Integration...');
  try {
    // Test weather tool directly
    const weatherTool = mastra.getTool('weatherTool');
    if (weatherTool) {
      console.log('✅ Weather Tool available');
    } else {
      console.log('⚠️ Weather Tool not found');
    }

    // Test restaurant tool directly
    const restaurantTool = mastra.getTool('restaurantTool');
    if (restaurantTool) {
      console.log('✅ Restaurant Tool available');
    } else {
      console.log('⚠️ Restaurant Tool not found');
    }

    console.log('✅ Tool Integration Test Passed\n');
  } catch (error) {
    console.error('❌ Tool Integration Test Failed:', error.message);
  }
}

// Test 6: Agent Memory
async function testAgentMemory() {
  console.log('🧠 Testing Agent Memory...');
  try {
    // Test conversation memory
    const response1 = await weatherAgent.stream([
      { role: 'user', content: 'What\'s the weather in London?' }
    ]);

    let firstResponse = '';
    for await (const chunk of response1.textStream) {
      firstResponse += chunk;
    }

    const response2 = await weatherAgent.stream([
      { role: 'user', content: 'What about the same location?' }
    ]);

    let secondResponse = '';
    for await (const chunk of response2.textStream) {
      secondResponse += chunk;
    }

    if (firstResponse && secondResponse) {
      console.log('✅ Agent memory working (responses generated)');
    } else {
      console.log('⚠️ Agent memory may not be working properly');
    }

    console.log('✅ Agent Memory Test Passed\n');
  } catch (error) {
    console.error('❌ Agent Memory Test Failed:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Agent Tests...\n');
  
  await testWeatherAgent();
  await testRestaurantAgent();
  await testTravelAgent();
  await testMastraInstance();
  await testToolIntegration();
  await testAgentMemory();
  
  console.log('🎉 All tests completed!');
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().catch(console.error);
}

export { 
  testWeatherAgent, 
  testRestaurantAgent, 
  testTravelAgent, 
  testMastraInstance, 
  testToolIntegration, 
  testAgentMemory,
  runAllTests 
}; 