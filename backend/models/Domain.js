const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    tld: {
        type: String,
        required: true,
        index: true
        // enum: ['.com', '.in', '.us', '.net', '.org', '.io']
    },
    price: {
        type: String,
        required: true,
        // min: 0,
        index: true
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'AUD', 'EURO', 'GBP', 'CAD'],
        index: true
    },
    currencySymbol: {
        type: String,
        required: true,
        enum: ['$', '€', '£']
    },
    countryCode: {
        type: String,
        required: true,
        enum: ['us', 'au', 'eu', 'gb', 'ca']
    },
    fullName: String,
    category: {
        type: String,
        required: true,
        // enum: ['Technology', 'Business', 'Education', 'Health', 'Entesrtainment'],
        index: true
    },
    expiryDate: {
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
    // imageUrl: { // Add this field
    //     type: String,
    //     default: '',
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// domainSchema.pre('save', function (next) {
//     this.fullName = `${this.name}${this.tld}`;
//     next();
// });

const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;