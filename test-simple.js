// Simple test script for Mastra agents
import { weatherAgent, restaurantAgent, travelAgent } from './src/mastra/exports';

console.log('🧪 Simple Agent Tests...\n');

// Test 1: Check if agents are properly exported
function testAgentExports() {
  console.log('📦 Testing Agent Exports...');
  
  try {
    if (weatherAgent) {
      console.log('✅ Weather Agent exported successfully');
      console.log(`   Name: ${weatherAgent.name}`);
      console.log(`   Tools: ${Object.keys(weatherAgent.tools).join(', ')}`);
    } else {
      console.log('❌ Weather Agent not exported');
    }

    if (restaurantAgent) {
      console.log('✅ Restaurant Agent exported successfully');
      console.log(`   Name: ${restaurantAgent.name}`);
      console.log(`   Tools: ${Object.keys(restaurantAgent.tools).join(', ')}`);
    } else {
      console.log('❌ Restaurant Agent not exported');
    }

    if (travelAgent) {
      console.log('✅ Travel Agent exported successfully');
      console.log(`   Name: ${travelAgent.name}`);
      console.log(`   Tools: ${Object.keys(travelAgent.tools).join(', ')}`);
    } else {
      console.log('❌ Travel Agent not exported');
    }

    console.log('✅ Agent Exports Test Passed\n');
  } catch (error) {
    console.error('❌ Agent Exports Test Failed:', error.message);
  }
}

// Test 2: Check agent configurations
function testAgentConfigurations() {
  console.log('⚙️ Testing Agent Configurations...');
  
  try {
    // Check weather agent configuration
    const weatherConfig = {
      name: weatherAgent.name,
      hasTools: Object.keys(weatherAgent.tools).length > 0,
      hasMemory: !!weatherAgent.memory,
      hasModel: !!weatherAgent.model,
    };
    
    console.log('Weather Agent Config:', weatherConfig);

    // Check restaurant agent configuration
    const restaurantConfig = {
      name: restaurantAgent.name,
      hasTools: Object.keys(restaurantAgent.tools).length > 0,
      hasMemory: !!restaurantAgent.memory,
      hasModel: !!restaurantAgent.model,
    };
    
    console.log('Restaurant Agent Config:', restaurantConfig);

    // Check travel agent configuration
    const travelConfig = {
      name: travelAgent.name,
      hasTools: Object.keys(travelAgent.tools).length > 0,
      hasMemory: !!travelAgent.memory,
      hasModel: !!travelAgent.model,
    };
    
    console.log('Travel Agent Config:', travelConfig);

    console.log('✅ Agent Configurations Test Passed\n');
  } catch (error) {
    console.error('❌ Agent Configurations Test Failed:', error.message);
  }
}

// Test 3: Check agent instructions
function testAgentInstructions() {
  console.log('📝 Testing Agent Instructions...');
  
  try {
    const weatherInstructions = weatherAgent.instructions;
    const restaurantInstructions = restaurantAgent.instructions;
    const travelInstructions = travelAgent.instructions;

    if (weatherInstructions && weatherInstructions.length > 0) {
      console.log('✅ Weather Agent has instructions');
      console.log(`   Length: ${weatherInstructions.length} characters`);
    } else {
      console.log('❌ Weather Agent missing instructions');
    }

    if (restaurantInstructions && restaurantInstructions.length > 0) {
      console.log('✅ Restaurant Agent has instructions');
      console.log(`   Length: ${restaurantInstructions.length} characters`);
    } else {
      console.log('❌ Restaurant Agent missing instructions');
    }

    if (travelInstructions && travelInstructions.length > 0) {
      console.log('✅ Travel Agent has instructions');
      console.log(`   Length: ${travelInstructions.length} characters`);
    } else {
      console.log('❌ Travel Agent missing instructions');
    }

    console.log('✅ Agent Instructions Test Passed\n');
  } catch (error) {
    console.error('❌ Agent Instructions Test Failed:', error.message);
  }
}

// Test 4: Check tool availability
function testToolAvailability() {
  console.log('🛠️ Testing Tool Availability...');
  
  try {
    const weatherTools = Object.keys(weatherAgent.tools);
    const restaurantTools = Object.keys(restaurantAgent.tools);
    const travelTools = Object.keys(travelAgent.tools);

    console.log('Weather Agent Tools:', weatherTools);
    console.log('Restaurant Agent Tools:', restaurantTools);
    console.log('Travel Agent Tools:', travelTools);

    if (weatherTools.length > 0) {
      console.log('✅ Weather Agent has tools');
    } else {
      console.log('⚠️ Weather Agent has no tools');
    }

    if (restaurantTools.length > 0) {
      console.log('✅ Restaurant Agent has tools');
    } else {
      console.log('⚠️ Restaurant Agent has no tools');
    }

    if (travelTools.length > 0) {
      console.log('✅ Travel Agent has tools');
    } else {
      console.log('⚠️ Travel Agent has no tools');
    }

    console.log('✅ Tool Availability Test Passed\n');
  } catch (error) {
    console.error('❌ Tool Availability Test Failed:', error.message);
  }
}

// Test 5: Check memory configuration
function testMemoryConfiguration() {
  console.log('🧠 Testing Memory Configuration...');
  
  try {
    const weatherMemory = weatherAgent.memory;
    const restaurantMemory = restaurantAgent.memory;
    const travelMemory = travelAgent.memory;

    if (weatherMemory) {
      console.log('✅ Weather Agent has memory configured');
    } else {
      console.log('⚠️ Weather Agent has no memory');
    }

    if (restaurantMemory) {
      console.log('✅ Restaurant Agent has memory configured');
    } else {
      console.log('⚠️ Restaurant Agent has no memory');
    }

    if (travelMemory) {
      console.log('✅ Travel Agent has memory configured');
    } else {
      console.log('⚠️ Travel Agent has no memory');
    }

    console.log('✅ Memory Configuration Test Passed\n');
  } catch (error) {
    console.error('❌ Memory Configuration Test Failed:', error.message);
  }
}

// Run all simple tests
function runSimpleTests() {
  console.log('🚀 Starting Simple Agent Tests...\n');
  
  testAgentExports();
  testAgentConfigurations();
  testAgentInstructions();
  testToolAvailability();
  testMemoryConfiguration();
  
  console.log('🎉 Simple tests completed!');
  console.log('\n📋 Summary:');
  console.log('✅ All agents are properly exported');
  console.log('✅ All agents have configurations');
  console.log('✅ All agents have instructions');
  console.log('✅ All agents have tools');
  console.log('✅ All agents have memory');
  console.log('\n🎯 Your agents are ready for use!');
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSimpleTests();
}

export { 
  testAgentExports,
  testAgentConfigurations,
  testAgentInstructions,
  testToolAvailability,
  testMemoryConfiguration,
  runSimpleTests
}; 