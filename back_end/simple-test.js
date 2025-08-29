const http = require('http');

const API_BASE_URL = 'http://localhost:5000';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsedBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAPI() {
  try {
    console.log('🧪 Testing Recipe Generation API...\n');
    
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await makeRequest('GET', '/health');
    console.log('✅ Health check passed:', healthResponse.data.status);
    
    // Test 2: Generate recipe with ingredients
    console.log('\n2. Testing recipe generation...');
    const recipeResponse = await makeRequest('POST', '/api/recipes/generate', {
      ingredients: ['chicken', 'rice', 'garlic', 'onion']
    });
    
    console.log('✅ Recipe generated successfully!');
    console.log('📊 Response structure:');
    console.log(JSON.stringify(recipeResponse.data, null, 2));
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection refused. Make sure the server is running on port 5000');
      console.log('💡 Run: npm run dev');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

// Run the test
testAPI();
