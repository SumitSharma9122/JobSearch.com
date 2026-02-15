const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [String],
    salary: { type: Number },
    location: { type: String, required: true },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
        required: true
    },
    experienceLevel: { type: String, enum: ['Entry Level', 'Mid Level', 'Senior Level'] },
    position: { type: Number },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
