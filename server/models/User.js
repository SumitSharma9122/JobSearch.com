const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['job_seeker', 'employer', 'admin'],
        default: 'job_seeker'
    },
    profile: {
        bio: String,
        skills: [String],
        resume: String,
        resumeOriginalName: String,
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
