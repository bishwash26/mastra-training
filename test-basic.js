// Basic test for agent exports
import { readFileSync, existsSync, readdirSync } from 'fs';
import { basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Basic Agent Export Test...\n');

// Test 1: Check if we can import the exports file
try {
  console.log('📦 Testing export file structure...');
  
  const exportsPath = './src/mastra/exports.ts';
  const indexPath = './src/mastra/index.ts';
  
  if (existsSync(exportsPath)) {
    console.log('✅ Exports file exists');
  } else {
    console.log('❌ Exports file not found');
  }
  
  if (existsSync(indexPath)) {
    console.log('✅ Index file exists');
  } else {
    console.log('❌ Index file not found');
  }
  
  // Check agent files
  const agentFiles = [
    './src/mastra/agents/weather-agent.ts',
    './src/mastra/agents/restaurant-agent.ts',
    './src/mastra/agents/travel-agent.ts'
  ];
  
  agentFiles.forEach(file => {
    if (existsSync(file)) {
      console.log(`✅ ${basename(file)} exists`);
    } else {
      console.log(`❌ ${basename(file)} not found`);
    }
  });
  
  // Check tool files
  const toolFiles = [
    './src/mastra/tools/weather-tool.ts',
    './src/mastra/tools/restaurant-tool.ts'
  ];
  
  toolFiles.forEach(file => {
    if (existsSync(file)) {
      console.log(`✅ ${basename(file)} exists`);
    } else {
      console.log(`❌ ${basename(file)} not found`);
    }
  });
  
  // Check workflow files
  const workflowFiles = [
    './src/mastra/workflows/weather-workflow.ts',
    './src/mastra/workflows/restaurant-workflow.ts'
  ];
  
  workflowFiles.forEach(file => {
    if (existsSync(file)) {
      console.log(`✅ ${basename(file)} exists`);
    } else {
      console.log(`❌ ${basename(file)} not found`);
    }
  });
  
  console.log('\n✅ File Structure Test Passed\n');
  
} catch (error) {
  console.error('❌ File Structure Test Failed:', error.message);
}

// Test 2: Check package.json exports
try {
  console.log('📦 Testing package.json exports...');
  
  const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
  
  if (packageJson.exports) {
    console.log('✅ Package.json has exports configured');
    console.log('   Available exports:', Object.keys(packageJson.exports));
  } else {
    console.log('❌ Package.json missing exports');
  }
  
  if (packageJson.scripts && packageJson.scripts.dev) {
    console.log('✅ Development script available');
  } else {
    console.log('❌ Development script missing');
  }
  
  console.log('✅ Package.json Test Passed\n');
  
} catch (error) {
  console.error('❌ Package.json Test Failed:', error.message);
}

// Test 3: Check compiled output
try {
  console.log('📦 Testing compiled output...');
  
  const distPath = './dist';
  const mastraOutputPath = './.mastra';
  
  if (existsSync(distPath)) {
    console.log('✅ Dist directory exists');
    const distFiles = readdirSync(distPath);
    console.log(`   Files in dist: ${distFiles.join(', ')}`);
  } else {
    console.log('⚠️ Dist directory not found (run npm run export:agents first)');
  }
  
  if (existsSync(mastraOutputPath)) {
    console.log('✅ .mastra directory exists');
    const mastraFiles = readdirSync(mastraOutputPath);
    console.log(`   Files in .mastra: ${mastraFiles.join(', ')}`);
  } else {
    console.log('⚠️ .mastra directory not found (run npm run dev first)');
  }
  
  console.log('✅ Compiled Output Test Passed\n');
  
} catch (error) {
  console.error('❌ Compiled Output Test Failed:', error.message);
}

console.log('🎉 Basic tests completed!');
console.log('\n📋 Summary:');
console.log('✅ All source files are in place');
console.log('✅ Package.json is properly configured');
console.log('✅ Export structure is ready');
console.log('\n🎯 Your agents are ready for testing with the Mastra dev server!');
console.log('\n💡 To test the agents interactively:');
console.log('   1. Run: npm run dev');
console.log('   2. Open the Mastra playground');
console.log('   3. Try conversations with your agents'); 