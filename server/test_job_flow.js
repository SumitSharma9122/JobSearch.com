const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/v1';

// Users
const recruiter = {
    email: 'sumit156@gmail.com',
    password: 'password12346',
    role: 'employer'
};

const jobSeeker = {
    email: 'pintu12@gmail.com',
    password: '123456',
    role: 'job_seeker'
};

// State
let recruiterToken = '';
let jobSeekerToken = '';
let companyId = '';
let jobId = '';

async function login(user) {
    try {
        const res = await axios.post(`${BASE_URL}/user/login`, user);
        console.log(`[LOGIN] Logged in as ${user.role} (${user.email})`);
        // The token is in the cookie, but for this script we might need to extract it if the API doesn't return it in body
        // Looking at userController.js:102, token is sent in cookie AND not in body explicitly? 
        // Wait, line 102: .cookie("token", token...).json({...}) 
        // It does NOT send token in JSON. It sends user object. 
        // We need to extract the cookie from the response headers.
        const cookies = res.headers['set-cookie'];
        let token = '';
        if (cookies) {
            const tokenCookie = cookies.find(c => c.startsWith('token='));
            if (tokenCookie) {
                token = tokenCookie.split(';')[0];
            }
        }
        return token;
    } catch (error) {
        console.error(`[LOGIN ERROR] ${user.email}:`, error.response?.data || error.message);
        throw error;
    }
}

async function registerCompany(token) {
    try {
        const companyName = `TestCompany_${Date.now()}`;
        const res = await axios.post(`${BASE_URL}/company/register`, { companyName }, {
            headers: { Cookie: token }
        });
        console.log(`[COMPANY] Registered company: ${res.data.company.name}`);
        return res.data.company._id;
    } catch (error) {
        console.error('[COMPANY ERROR]', error.response?.data || error.message);
        throw error;
    }
}

async function postJob(token, compId) {
    try {
        const jobData = {
            title: `Software Engineer ${Date.now()}`,
            description: "We are looking for a software engineer.",
            requirements: "React, Node.js, MongoDB",
            salary: 120000,
            location: "Remote",
            jobType: "Full-time",
            experience: "Entry Level",
            position: 1,
            companyId: compId
        };
        const res = await axios.post(`${BASE_URL}/job/post`, jobData, {
            headers: { Cookie: token }
        });
        console.log(`[JOB] Posted job: ${res.data.job.title}`);
        return res.data.job._id;
    } catch (error) {
        console.error('[JOB ERROR]', error.response?.data || error.message);
        throw error;
    }
}

async function applyForJob(token, jId) {
    try {
        const res = await axios.get(`${BASE_URL}/application/apply/${jId}`, {
            headers: { Cookie: token }
        });
        console.log(`[APPLY] Applied for job: ${res.data.message}`);
    } catch (error) {
        console.error('[APPLY ERROR]', error.response?.data || error.message);
        throw error;
    }
}

async function checkApplicants(token, jId) {
    try {
        const res = await axios.get(`${BASE_URL}/application/${jId}/applicants`, {
            headers: { Cookie: token }
        });
        const applications = res.data.job.applications;
        console.log(`[APPLICANTS] Found ${applications.length} applicants.`);
        applications.forEach(app => {
            console.log(` - Applicant ID: ${app.applicant._id}, Name: ${app.applicant.fullname} (Wait, schema says name?)`);
            // Checking Application population in applicationController.js:80 -> populate applicant
            // Checking User model: name, email...
            // So it should be app.applicant.name
            if (app.applicant) {
                console.log(` - Name: ${app.applicant.name}, Email: ${app.applicant.email}`);
            }
        });
    } catch (error) {
        console.error('[CHECK APPLICANTS ERROR]', error.response?.data || error.message);
        throw error;
    }
}

async function run() {
    try {
        // 1. Login Recruiter
        recruiterToken = await login(recruiter);

        // 2. Register Company
        companyId = await registerCompany(recruiterToken);

        // 3. Post Job
        jobId = await postJob(recruiterToken, companyId);

        // 4. Login Job Seeker
        jobSeekerToken = await login(jobSeeker);

        // 5. Apply for Job
        await applyForJob(jobSeekerToken, jobId);

        // 6. Check Applicants (as Recruiter)
        await checkApplicants(recruiterToken, jobId);

    } catch (error) {
        console.error('Test Failed');
    }
}

run();
