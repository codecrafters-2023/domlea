// import express from 'express';
const express = require('express');
const router = express.Router();
const Domain = require('../models/Domain')
const { protect, admin } = require('../middleware/authMiddleware');
const generateDomainImage = require('../utils/imageGenerator');

router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, tld, price, category, expiryDate, description, isPremium } = req.body;

        // Validate required fields
        if (!name || !tld || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please include all required fields'
            });
        }

        const imageUrl = await generateDomainImage(name, tld.replace('.', ''));
        // Create domain
        const domain = await Domain.create({
            name: name.toLowerCase(),
            tld,
            price,
            category,
            expiryDate,
            description: description || '',
            isPremium,
            imageUrl
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
        const { search, category, tld, page = 1, limit = 10 } = req.query;

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


router.put('/:id', protect, admin, async (req, res) => {
    try {
        const domain = await Domain.findById(req.params.id);

        if (!domain) {
            return res.status(404).json({
                success: false,
                message: 'Domain not found'
            });
        }

        const updatedDomain = await Domain.findByIdAndUpdate(
            req.params.id,
            req.body,
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


router.delete('/:id', async (req, res) => {
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
            message: 'Domain removed'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});



module.exports = router;