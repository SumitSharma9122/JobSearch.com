const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Company = require('./models/Company');
const Job = require('./models/Job');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const companyNames = [
    "TechCorp", "InnovateSolutions", "BuildRight", "CodeCrafters", "DataDriven",
    "NetWorks", "CloudSys", "AppMasters", "WebWizards", "SoftServe",
    "GlobalTech", "FutureSystems", "SmartSoft", "DevDynamics", "LogicLabs",
    "PixelPerfect", "ByteBuilders", "CyberSecure", "InfoTech", "SysAdmin co"
];

const jobTitles = [
    "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist",
    "Product Manager", "UX/UI Designer", "DevOps Engineer", "QA Engineer", "System Administrator",
    "Mobile App Developer", "Cloud Architect", "Database Administrator", "Network Engineer", "Security Analyst",
    "IT Support Specialist", "Technical Writer", "Scrum Master", "Business Analyst", "Marketing Specialist"
];

const locations = ["Remote", "New York, NY", "San Francisco, CA", "Bangalore, India", "London, UK", "Berlin, Germany", "Toronto, Canada", "Sydney, Australia", "Singapore", "Dubai, UAE"];
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const levels = ["Entry Level", "Mid Level", "Senior Level"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedDatabase = async () => {
    await connectDB();

    try {
        console.log('Starting seed...');

        // Clear existing data (optional, maybe ask user? User said "create 20...". I'll add to existing or create new. Let's just add to be safe and avoid deleting user data unless they asked. But for a clean "20 company... show all", maybe clearing or ensuring unique emails is good. I'll use unique emails for the generated ones.)

        for (let i = 0; i < 20; i++) {
            const companyName = `${companyNames[i % companyNames.length]} ${i + 1}`; // Ensure uniqueness
            const recruiterName = `Recruiter ${i + 1}`;
            const email = `recruiter${i + 1}@example.com`;
            const password = await bcrypt.hash('password123', 10);

            // 1. Create User (Recruiter)
            let user = await User.findOne({ email });
            if (!user) {
                user = await User.create({
                    name: recruiterName,
                    email,
                    password,
                    role: 'employer',
                    profile: {
                        bio: `Recruiter at ${companyName}`,
                        profilePhoto: `https://randomuser.me/api/portraits/men/${i + 1}.jpg`
                    }
                });
                console.log(`Created user: ${user.name}`);
            } else {
                console.log(`User ${email} already exists, skipping creation or reusing.`);
            }

            // 2. Create Company
            // Check if company exists for this user to avoid duplicates if re-running
            let company = await Company.findOne({ name: companyName });
            if (!company) {
                company = await Company.create({
                    name: companyName,
                    description: `A leading company in technology and innovation. We are ${companyName}.`,
                    website: `https://www.${companyName.replace(/\s+/g, '').toLowerCase()}.com`,
                    location: getRandom(locations),
                    logo: `https://logo.clearbit.com/${companyName.replace(/\s+/g, '').toLowerCase()}.com` || "https://png.pngtree.com/png-vector/20220513/ourmid/pngtree-hand-drawn-doodle-start-up-logo-png-image_4590932.png", // Attempt to get a logo or fallback
                    userId: user._id
                });
                console.log(`Created company: ${company.name}`);
            }

            // 3. Create Job
            const jobTitle = getRandom(jobTitles);
            await Job.create({
                title: jobTitle,
                description: `We are hiring a ${jobTitle} to join our dynamic team at ${companyName}. \n\nResponsibilities:\n- Develop and maintain software.\n- Collaborate with cross-functional teams.\n- Participate in code reviews.\n\nRequirements:\n- Proven experience as a ${jobTitle}.\n- Strong problem-solving skills.\n- Team player.`,
                requirements: ["JavaScript", "React", "Node.js", "MongoDB", "Python", "Java", "C++", "AWS", "Docker", "Git"].sort(() => 0.5 - Math.random()).slice(0, 4), // Random 4 skills
                salary: getRandomInt(5, 50), // LPA
                location: company.location,
                jobType: getRandom(jobTypes),
                experienceLevel: getRandom(levels),
                position: getRandomInt(1, 5),
                company: company._id,
                created_by: user._id
            });
            console.log(`Created job: ${jobTitle} at ${companyName}`);
        }

        console.log('Database seeded successfully with 20 companies and jobs!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
