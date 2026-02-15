const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    website: String,
    location: String,
    logo: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
