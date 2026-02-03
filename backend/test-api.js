/**
 * Simple API Test Script
 * Run with: node test-api.js
 */

const BASE_URL = 'http://localhost:5000';

// Helper function to make requests
async function makeRequest(method, endpoint, data = null) {
    const url = `${BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return { status: response.status, data: result };
    } catch (error) {
        return { status: 0, error: error.message };
    }
}

// Test functions
async function testHealthCheck() {
    console.log('\n🔍 Testing Health Check...');
    const result = await makeRequest('GET', '/health');

    if (result.status === 200 && result.data.success) {
        console.log('✅ Health check passed');
        console.log('   Response:', result.data.message);
    } else {
        console.log('❌ Health check failed');
        console.log('   Response:', result);
    }
}

async function testUserRegistration() {
    console.log('\n🔍 Testing User Registration...');

    const testUser = {
        email: `test${Date.now()}@example.com`,
        password: 'Test123456',
        displayName: 'Test User',
        role: 'user',
    };

    const result = await makeRequest('POST', '/api/auth/register', testUser);

    if (result.status === 201 && result.data.success) {
        console.log('✅ User registration passed');
        console.log('   User ID:', result.data.data.uid);
        console.log('   Email:', result.data.data.email);
        return result.data.data;
    } else {
        console.log('❌ User registration failed');
        console.log('   Response:', result);
        return null;
    }
}

async function testPasswordReset() {
    console.log('\n🔍 Testing Password Reset...');

    const result = await makeRequest('POST', '/api/auth/reset-password', {
        email: 'test@example.com',
    });

    if (result.status === 200 && result.data.success) {
        console.log('✅ Password reset passed');
        console.log('   Reset link generated');
    } else {
        console.log('❌ Password reset failed');
        console.log('   Response:', result);
    }
}

async function testUnauthorizedAccess() {
    console.log('\n🔍 Testing Unauthorized Access (should fail)...');

    const result = await makeRequest('GET', '/api/auth/profile');

    if (result.status === 401 && !result.data.success) {
        console.log('✅ Authorization check passed (correctly blocked)');
        console.log('   Message:', result.data.message);
    } else {
        console.log('❌ Authorization check failed (should have been blocked)');
        console.log('   Response:', result);
    }
}

async function testInvalidRoute() {
    console.log('\n🔍 Testing Invalid Route (should return 404)...');

    const result = await makeRequest('GET', '/api/invalid/route');

    if (result.status === 404) {
        console.log('✅ 404 handler passed');
        console.log('   Message:', result.data.message);
    } else {
        console.log('❌ 404 handler failed');
        console.log('   Response:', result);
    }
}

// Main test runner
async function runTests() {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║                                                        ║');
    console.log('║   🧪 Lipibook Backend API Tests                       ║');
    console.log('║                                                        ║');
    console.log('╚════════════════════════════════════════════════════════╝');

    console.log('\n📋 Testing backend at:', BASE_URL);
    console.log('⏰ Started at:', new Date().toLocaleString());

    // Check if server is running
    console.log('\n🔌 Checking if server is running...');
    try {
        const response = await fetch(`${BASE_URL}/health`);
        if (!response.ok) {
            throw new Error('Server not responding');
        }
        console.log('✅ Server is running');
    } catch (error) {
        console.log('❌ Server is not running!');
        console.log('   Please start the server with: npm run dev');
        process.exit(1);
    }

    // Run tests
    await testHealthCheck();
    await testUserRegistration();
    await testPasswordReset();
    await testUnauthorizedAccess();
    await testInvalidRoute();

    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║                                                        ║');
    console.log('║   ✅ Basic Tests Completed                            ║');
    console.log('║                                                        ║');
    console.log('╚════════════════════════════════════════════════════════╝');

    console.log('\n📝 Next Steps:');
    console.log('   1. Check Firebase Console for registered users');
    console.log('   2. Check Firestore for user documents');
    console.log('   3. Test authenticated endpoints with Firebase ID token');
    console.log('   4. See TESTING_GUIDE.md for more details\n');
}

// Run the tests
runTests().catch(console.error);
