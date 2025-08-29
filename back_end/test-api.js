const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

async function testRecipeGeneration() {
  try {
    console.log('🧪 Testing Recipe Generation API...\n');
    
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data.status);
    
    // Test 2: Generate recipe with ingredients
    console.log('\n2. Testing recipe generation...');
    const recipeResponse = await axios.post(`${API_BASE_URL}/api/recipes/generate`, {
      ingredients: ['chicken', 'rice', 'garlic', 'onion']
    });
    
    console.log('✅ Recipe generated successfully!');
    console.log('📊 Response structure:');
    console.log(JSON.stringify(recipeResponse.data, null, 2));
    
  } catch (error) {
    if (error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection refused. Make sure the server is running on port 5000');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

// Run the test
testRecipeGeneration();
