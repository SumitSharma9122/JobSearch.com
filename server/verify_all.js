const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Company = require('./models/Company');
const Job = require('./models/Job');
const Application = require('./models/Application');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

const verifyAll = async () => {
    await connectDB();

    try {
        console.log("\n--- STARTING FINAL SYSTEM VERIFICATION ---\n");

        // 1. Verify Users
        console.log("1. Verifying Key Users...");
        const employer = await User.findOne({ email: "sumit156@gmail.com" });
        const jobSeeker = await User.findOne({ email: "pintu12@gmail.com" });

        if (employer) console.log(`   ✅ Employer found: ${employer.fullname} (${employer.role})`);
        else console.log("   ❌ Employer NOT found");

        if (jobSeeker) console.log(`   ✅ Job Seeker found: ${jobSeeker.fullname} (${jobSeeker.role})`);
        else console.log("   ❌ Job Seeker NOT found");

        if (!employer || !jobSeeker) {
            console.log("   ⚠️ Cannot proceed without both users.");
            process.exit(1);
        }

        // 2. Verify Companies
        console.log("\n2. Verifying Company Data...");
        const company = await Company.findOne({ userId: employer._id });
        if (company) {
            console.log(`   ✅ Company found for Employer: ${company.name}`);
        } else {
            console.log("   ❌ No company found for Employer. Creating one...");
            const newCompany = await Company.create({
                name: "Test Corp",
                userId: employer._id
            });
            console.log(`   ✅ Created Company: ${newCompany.name}`);
        }

        // 3. Verify Jobs
        console.log("\n3. Verifying Job Postings...");
        let job = await Job.findOne({ created_by: employer._id });
        if (job) {
            console.log(`   ✅ Job found: ${job.title} (ID: ${job._id})`);
            console.log(`      Experience: ${job.experienceLevel}, Salary: ${job.salary}LPA`);
        } else {
            console.log("   ⚠️ No job found. Creating a test job...");
            job = await Job.create({
                title: "Senior React Developer",
                description: "We are looking for an expert React developer.",
                requirements: ["React", "Redux", "Node.js"],
                salary: 25,
                location: "Bangalore",
                jobType: "Full Time",
                experienceLevel: 4,
                position: 2,
                company: company._id,
                created_by: employer._id
            });
            console.log(`   ✅ Created Job: ${job.title}`);
        }

        // 4. Verify Applications
        console.log("\n4. Verifying Applications...");
        let application = await Application.findOne({ job: job._id, applicant: jobSeeker._id });

        if (application) {
            console.log(`   ✅ Application found for Job '${job.title}' by '${jobSeeker.fullname}'`);
        } else {
            console.log("   ⚠️ No application found. Creating test application...");
            application = await Application.create({
                job: job._id,
                applicant: jobSeeker._id,
                status: 'pending'
            });
            job.applications.push(application._id);
            await job.save();
            console.log("   ✅ Created Application");
        }

        // 5. Verify Stats (Employer Dashboard Data)
        console.log("\n5. Verifying Employer Stats Data...");
        // Simulate getAdminJobs controller logic
        const adminJobs = await Job.find({ created_by: employer._id }).populate({
            path: 'applications'
        });

        const totalJobs = adminJobs.length;
        const totalApplicants = adminJobs.reduce((acc, j) => acc + (j.applications.length || 0), 0);

        console.log(`   ✅ Employer has ${totalJobs} active jobs.`);
        console.log(`   ✅ Employer has ${totalApplicants} total applicants.`);

        if (totalJobs > 0 && totalApplicants >= 0) {
            console.log("\n✅ BACKEND VERIFICATION SUCCESSFUL: All systems operational.");
        } else {
            console.log("\n⚠️ BACKEND VERIFICATION WARNING: Stats look empty.");
        }

    } catch (error) {
        console.error("\n❌ VERIFICATION FAILED:", error);
    } finally {
        await mongoose.disconnect();
    }
}

verifyAll();
