const axios = require('axios');
const FormData = require('form-data');

async function registerUser() {
    try {
        const form = new FormData();
        // Mapping user's input: "pintu12@gmail.com,pintu sharma, password:-123456,student"
        form.append('name', 'pintu sharma');
        form.append('email', 'pintu12@gmail.com');
        form.append('password', '123456');
        // Mapping 'student' to 'job_seeker' as per User model enum
        form.append('role', 'job_seeker');

        console.log("Sending request to http://localhost:5000/api/v1/user/register");

        const response = await axios.post('http://localhost:5000/api/v1/user/register', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('Register User Response:', response.status, response.data);
    } catch (error) {
        if (error.response) {
            console.error('Register User Error:', error.response.status, error.response.data);
        } else {
            console.error('Register User Error:', error.message);
        }
    }
}

registerUser();
