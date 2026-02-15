const User = require('../models/User');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');

exports.getStats = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const companiesCount = await Company.countDocuments();
        const jobsCount = await Job.countDocuments();
        const applicationsCount = await Application.countDocuments();

        return res.status(200).json({
            stats: {
                users: usersCount,
                companies: companiesCount,
                jobs: jobsCount,
                applications: applicationsCount
            },
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

exports.deleteJobByAdmin = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }
        await job.deleteOne();
        return res.status(200).json({
            message: "Job deleted by admin.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

exports.deleteCompanyByAdmin = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        await company.deleteOne();
        return res.status(200).json({
            message: "Company deleted by admin.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
