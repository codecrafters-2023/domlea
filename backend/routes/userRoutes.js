const express = require('express');
const Domain = require('../models/Domain');
const { protect } = require('../middleware/authMiddleware');
const router = express();



router.get("/userDomainsList", async (req, res) => {
    try {
        const { search, tld, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

        let query = {};

        // Search by domain name
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // Filter by TLD (Top-Level Domain)
        if (tld) {
            query.tld = { $regex: `${tld}$`, $options: "i" };
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Fetch domains from the database with pagination
        const domains = await Domain.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        // Count total domains for pagination
        const total = await Domain.countDocuments(query);

        res.json({
            success: true,
            data: domains,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("Error fetching domains:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Fetch the premium domain
router.get("/premium-domains", async (req, res) => {
    try {
        const { tld } = req.query;

        // Query to fetch premium domains
        const query = { isPremium: true }; // Only fetch premium domains

        // Filter by TLD if provided
        if (tld && tld !== "All") {
            query.tld = tld;
        }

        // Fetch domains from the database
        const domains = await Domain.find(query).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: domains,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

// getting tlds

router.get("/tlds", async (req, res) => {
    try {
        // Fetch all unique TLDs for premium domains
        const tlds = await Domain.distinct("tld", { isPremium: true });
        res.json({
            success: true,
            data: tlds,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

// fetch all tlds for userlisting page
router.get("/all-tlds", async (req, res) => {
    try {
        // Fetch all unique TLDs from the database
        const tlds = await Domain.distinct("tld");
        res.json({
            success: true,
            data: tlds,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

router.get('/check-domain', async (req, res) => {
    const { domain } = req.query;

    // Remove any extra dots from the domain name
    const cleanedDomain = domain.replace(/\.+/g, '.'); // Replace multiple dots with a single dot
    // console.log("Searching for domain:", cleanedDomain); // Debugging

    try {
        // Split the domain into name and TLD
        const [name, tld] = cleanedDomain.split('.');

        // Query the database for the domain
        const domainExists = await Domain.findOne({ name, tld: `.${tld}` });

        // console.log("Domain found:", domainExists); // Debugging

        res.json({ exists: !!domainExists });
    } catch (error) {
        console.error("Error checking domain:", error);
        res.status(500).json({ error: 'Error checking domain' });
    }
});

router.get('/domain/:domainName', async (req, res) => {
    const { domainName } = req.params;

    try {
        // Split the domain into name and TLD
        const [name, tld] = domainName.split('.');

        // Query the database for the domain
        const domain = await Domain.findOne({ name, tld: `.${tld}` });

        if (!domain) {
            return res.status(404).json({ success: false, message: 'Domain not found' });
        }

        // Fetch related domains (domains that start with the first letter of the searched domain)
        const firstLetter = name.substring(0, 1); // Get the first letter
        const relatedDomains = await Domain.find({
            name: { $regex: `^${firstLetter}`, $options: 'i' }, // Case-insensitive search for first letter
            _id: { $ne: domain._id }, // Exclude the current domain
        }).limit(5); // Limit to 5 related domains

        res.json({ success: true, data: domain, relatedDomains });
    } catch (error) {
        console.error("Error fetching domain:", error);
        res.status(500).json({ error: 'Error fetching domain' });
    }
});

module.exports = router;