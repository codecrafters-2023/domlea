const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    tld: {
        type: String,
        required: true,
        // enum: ['.com', '.in', '.us', '.net', '.org', '.io']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Technology', 'Business', 'Education', 'Health', 'Entertainment']
    },
    expiryDate:{
        type: Date,
        // default: Date.now
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    isPremium: {
        type: Boolean,
        default: false, // Default to false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;