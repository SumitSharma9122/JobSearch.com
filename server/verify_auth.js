const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000/api/v1/user';

async function verifyAuth() {
    console.log('Starting Auth Verification...');

    // Generate unique user details
    const uniqueId = Date.now();
    const user = {
        name: `Test User ${uniqueId}`,
        email: `test${uniqueId}@example.com`,
        password: 'password123',
        role: 'job_seeker'
    };

    console.log('Testing Signup with:', user);

    // 1. Test Signup
    try {
        const form = new FormData();
        form.append('name', user.name);
        form.append('email', user.email);
        form.append('password', user.password);
        form.append('role', user.role);

        // Append a dummy file if needed, or just skip since it's optional in our code now
        // But to test multer we should probably send one if we can, or at least send multipart data
        // We'll proceed with multipart data but no file for simplicity, verifying multer doesn't crash 
        // and parses body correctly.

        const signupRes = await axios.post(`${BASE_URL}/register`, form, {
            headers: {
                ...form.getHeaders()
            }
        });

        if (signupRes.data.success) {
            console.log('✅ Signup Successful');
        } else {
            console.error('❌ Signup Failed:', signupRes.data);
            return;
        }

    } catch (error) {
        console.error('❌ Signup Error:', error.response ? error.response.data : error.message);
        return;
    }

    // 2. Test Login
    console.log('Testing Login...');
    try {
        const loginRes = await axios.post(`${BASE_URL}/login`, {
            email: user.email,
            password: user.password,
            role: user.role
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (loginRes.data.success && loginRes.headers['set-cookie']) {
            console.log('✅ Login Successful');
            console.log('Cookies received:', loginRes.headers['set-cookie']);
        } else {
            console.error('❌ Login Failed:', loginRes.data);
        }

    } catch (error) {
        console.error('❌ Login Error:', error.response ? error.response.data : error.message);
    }
}

verifyAuth();
