const axios = require('axios');

async function testLogin() {
    try {
        const loginData = {
            email: 'sumit156@gmail.com',
            password: 'password12346',
            role: 'employer'
        };

        console.log("Sending request to http://localhost:5000/api/v1/user/login");

        const response = await axios.post('http://localhost:5000/api/v1/user/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Login Response:', response.status, response.data);
    } catch (error) {
        if (error.response) {
            console.error('Login Error:', error.response.status, error.response.data);
        } else {
            console.error('Login Error:', error.message);
        }
    }
}

testLogin();
