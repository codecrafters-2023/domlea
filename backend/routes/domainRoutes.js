// import express from 'express';
const express = require('express');
const router = express.Router();
const Domain = require('../models/Domain')
const { protect, admin } = require('../middleware/authMiddleware');
// const {generateDomainImage, cloudinary} = require('../utils/imageGenerator');

router.get('/categories', protect, admin, async (req, res) => {
    try {
        // Verify the collection has documents
        const count = await Domain.countDocuments();
        if (count === 0) return res.json({ success: true, data: [] });

        // Get distinct categories that actually exist in documents
        const categories = await Domain.distinct('category', { category: { $exists: true } });

        res.json({
            success: true,
            data: categories.filter(c => c !== null && c !== "")
        });
    } catch (error) {
        console.error('Category error:', error);
        res.status(500).json({
            success: false,
            message: error.message // Return specific error
        });
    }
});

router.get('/all-tlds', protect, admin, async (req, res) => {
    try {
        const tlds = await Domain.distinct('tld', { tld: { $exists: true } });
        res.json({
            success: true,
            data: tlds.filter(t => t && t.trim() !== "")
        });
    } catch (error) {
        console.error('TLD error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch TLDs'
        });
    }
});


router.post('/addDomain', protect, admin, async (req, res) => {
    try {
        const { name, tld, price, category, expiryDate, description, isPremium, currency, currencySymbol, countryCode } = req.body;

        // Validate required fields
        if (!name || !tld || !price || !currency || !currencySymbol || !countryCode || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please include all required fields'
            });
        }

        // const imageUrl = await generateDomainImage(name, tld.replace('.', ''));

        const domain = await Domain.create({
            name: name,
            tld,
            fullName: (name + tld).toLowerCase(),
            price,
            currency,
            currencySymbol,
            countryCode,
            category,
            expiryDate,
            description: description || '',
            isPremium,
            websiteUrl: req.body.websiteUrl || '',
            // imageUrl
        });

        res.status(201).json({
            success: true,
            data: domain
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});


router.get('/getDomains', protect, admin, async (req, res) => {
    try {
        const { search, category, tld, page = 1, limit = 20 } = req.query;

        const query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        if (tld) {
            query.tld = tld;
        }

        const skip = (page - 1) * limit;

        const domains = await Domain.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Domain.countDocuments(query);

        res.json({
            success: true,
            data: domains,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Add this GET route before the PUT route
router.get('/:id', protect, admin, async (req, res) => {
    try {
        const domain = await Domain.findById(req.params.id);
        if (!domain) {
            return res.status(404).json({
                success: false,
                message: 'Domain not found'
            });
        }
        res.json({
            success: true,
            data: domain
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});


// router.put('/:id', protect, admin, async (req, res) => {
//     try {
//         const domain = await Domain.findById(req.params.id);
//         const { currency, currencySymbol, countryCode } = req.body;

//         // Validate currency fields
//         if (!currency || !currencySymbol || !countryCode) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Currency information is required'
//             });
//         }

//         if (!domain) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Domain not found'
//             });
//         }

//         const updatedDomain = await Domain.findByIdAndUpdate(
//             req.params.id,
//             { ...req.body, websiteUrl: req.body.websiteUrl || '' },
//             { new: true, runValidators: true }
//         );

//         res.json({
//             success: true,
//             data: updatedDomain
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error'
//         });
//     }
// });

router.put('/:id', protect, admin, async (req, res) => {
    try {
        const domain = await Domain.findById(req.params.id);
        const { currency, currencySymbol, countryCode, name, tld } = req.body;

        // Validate currency fields
        if (!currency || !currencySymbol || !countryCode) {
            return res.status(400).json({
                success: false,
                message: 'Currency information is required'
            });
        }

        if (!domain) {
            return res.status(404).json({
                success: false,
                message: 'Domain not found'
            });
        }

        // Recalculate fullName if name or tld changes
        let fullName;
        if (name || tld) {
            const newName = name || domain.name;
            const newTld = tld || domain.tld;
            fullName = `${newName}${newTld}`.toLowerCase();
        }

        const updatedDomain = await Domain.findByIdAndUpdate(
            req.params.id,
            { 
                ...req.body,
                // Only update fullName if it was recalculated
                ...(fullName && { fullName }),
                websiteUrl: req.body.websiteUrl || '' 
            },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: updatedDomain
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});


// Updated delete route with image cleanup
router.delete('/deleteDomain/:id', protect, admin, async (req, res) => {
    try {
        const domain = await Domain.findById(req.params.id);

        if (!domain) {
            return res.status(404).json({
                success: false,
                message: 'Domain not found'
            });
        }

        await domain.deleteOne();

        res.json({
            success: true,
            message: 'Domain and associated image removed'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

router.get('/premium', async (req, res) => {
    try {
        // Remove pagination and get all premium domains
        const domains = await Domain.find({ isPremium: true })
            .sort({ createdAt: -1 });

        console.log(`Found ${domains.length} premium domains`);

        res.json({
            success: true,
            data: domains,
            count: domains.length
        });

    } catch (error) {
        console.error('Premium domains error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});




module.exports = router;
