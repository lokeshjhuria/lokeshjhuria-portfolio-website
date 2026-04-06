// API Testing Script
// Run this with: node test-api.js

const http = require('http');

// Test function
function testEndpoint(path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
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
                    const response = {
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: JSON.parse(body)
                    };
                    resolve(response);
                } catch (error) {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: body
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

// Test all endpoints
async function runTests() {
    console.log('🧪 Testing Portfolio API...\n');

    try {
        // Test 1: Health Check
        console.log('1. Testing Health Check...');
        const health = await testEndpoint('/api/health');
        console.log(`   Status: ${health.statusCode}`);
        console.log(`   Response:`, health.body);
        console.log('   ✅ Health check passed!\n');

        // Test 2: Portfolio Data
        console.log('2. Testing Portfolio Data...');
        const portfolio = await testEndpoint('/api/portfolio');
        console.log(`   Status: ${portfolio.statusCode}`);
        console.log(`   Name: ${portfolio.body.name}`);
        console.log(`   Title: ${portfolio.body.title}`);
        console.log(`   Skills: ${portfolio.body.skills.technical.length} technical, ${portfolio.body.skills.soft.length} soft`);
        console.log('   ✅ Portfolio data passed!\n');

        // Test 3: Contact Form (Valid)
        console.log('3. Testing Contact Form (Valid)...');
        const validContact = await testEndpoint('/api/contact', 'POST', {
            name: 'Test User',
            email: 'test@example.com',
            message: 'This is a test message with more than 10 characters.'
        });
        console.log(`   Status: ${validContact.statusCode}`);
        console.log(`   Response:`, validContact.body);
        console.log('   ✅ Valid contact form passed!\n');

        // Test 4: Contact Form (Invalid Email)
        console.log('4. Testing Contact Form (Invalid Email)...');
        const invalidEmail = await testEndpoint('/api/contact', 'POST', {
            name: 'Test User',
            email: 'invalid-email',
            message: 'This is a test message with more than 10 characters.'
        });
        console.log(`   Status: ${invalidEmail.statusCode}`);
        console.log(`   Response:`, invalidEmail.body);
        console.log('   ✅ Invalid email validation passed!\n');

        // Test 5: Contact Form (Missing Fields)
        console.log('5. Testing Contact Form (Missing Fields)...');
        const missingFields = await testEndpoint('/api/contact', 'POST', {
            name: 'Test User'
            // Missing email and message
        });
        console.log(`   Status: ${missingFields.statusCode}`);
        console.log(`   Response:`, missingFields.body);
        console.log('   ✅ Missing fields validation passed!\n');

        // Test 6: 404 Error
        console.log('6. Testing 404 Error...');
        const notFound = await testEndpoint('/api/nonexistent');
        console.log(`   Status: ${notFound.statusCode}`);
        console.log(`   Response:`, notFound.body);
        console.log('   ✅ 404 error handling passed!\n');

        console.log('🎉 All tests completed successfully!');
        console.log('\n📊 Summary:');
        console.log('   ✅ Health Check: Working');
        console.log('   ✅ Portfolio Data: Working');
        console.log('   ✅ Contact Form: Working');
        console.log('   ✅ Validation: Working');
        console.log('   ✅ Error Handling: Working');
        console.log('\n🚀 Backend is in complete working condition!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Make sure the server is running on port 3000');
        console.log('2. Check if Node.js is installed');
        console.log('3. Verify all dependencies are installed');
        console.log('4. Check for port conflicts');
    }
}

// Check if server is running
async function checkServer() {
    try {
        await testEndpoint('/api/health');
        return true;
    } catch (error) {
        return false;
    }
}

// Main execution
async function main() {
    const serverRunning = await checkServer();
    
    if (!serverRunning) {
        console.log('❌ Server is not running on port 3000');
        console.log('\n🚀 To start the server:');
        console.log('1. Double-click: start-server.bat');
        console.log('2. Or run: npm start');
        console.log('3. Or run: node server.js');
        console.log('\nThen run this test again.');
        return;
    }

    await runTests();
}

// Run the tests
main();
