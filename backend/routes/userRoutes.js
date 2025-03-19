const express = require('express');
const Domain = require('../models/Domain');
const { protect } = require('../middleware/authMiddleware');
const generateDomainImage = require('../utils/imageGenerator');
const router = express();


// Configure Cloudinary
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
            .sort({ createdAt: -1 })
            .lean();

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
        const query = { isPremium: true };

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
        // Fetch all unique TLDs and remove the leading dot
        const tlds = await Domain.distinct("tld");
        const cleanedTlds = tlds.map(tld => tld.replace(/^\./, "")); // Remove leading dot
        
        res.json({
            success: true,
            data: cleanedTlds, // Send TLDs without dots (e.g., "com" instead of ".com")
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});


// Domain Search Service
router.get("/search-domains", async (req, res) => {
    try {
        const { search, minPrice, maxPrice } = req.query;
        const responseData = {
            exactMatch: null,
            relatedDomains: []
        };

        // Check for exact domain match first
        if (search && search.includes('.')) {
            const [name, tld] = search.split('.');
            const exactDomain = await Domain.findOne({
                name: name.trim(),
                tld: `.${tld.trim()}`
            }).lean();

            if (exactDomain) {
                responseData.exactMatch = exactDomain;
            }
        }

        // Build query for related domains
        const query = {};
        const firstChar = search?.charAt(0).toLowerCase() || '';

        // Search filters
        if (search) {
            query.$or = [
                { name: { $regex: `^${firstChar}`, $options: "i" } },
                { category: { $regex: search, $options: "i" } }
            ];
        }

        // Price filters
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        // Exclude exact match from related domains
        if (responseData.exactMatch) {
            query._id = { $ne: responseData.exactMatch._id };
        }

        // Get related domains
        responseData.relatedDomains = await Domain.find(query)
            .limit(20)
            .sort({ price: 1 })
            .lean();

        res.json({
            success: true,
            ...responseData
        });

    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error performing search" 
        });
    }
});

// router.get('/check-domain', async (req, res) => {
//     const { domain } = req.query;

//     // Remove any extra dots from the domain name
//     const cleanedDomain = domain.replace(/\.+/g, '.');

//     try {
//         // Split the domain into name and TLD
//         const [name, tld] = cleanedDomain.split('.');

//         // Query the database for the domain
//         const domainExists = await Domain.findOne({ name, tld: `.${tld}` });

//         res.json({ exists: !!domainExists });
//     } catch (error) {
//         console.error("Error checking domain:", error);
//         res.status(500).json({ error: 'Error checking domain' });
//     }
// });

// router.get('/domain/:domainName', async (req, res) => {
//     const { domainName } = req.params;

//     try {
//         // Split the domain into name and TLD
//         const [name, tld] = domainName.split('.');

//         // Query the database for the domain
//         const domain = await Domain.findOne({ name, tld: `.${tld}` });

//         // Fetch related domains (domains that start with the first letter of the searched domain)
//         const firstLetter = name.substring(0, 1); // Get the first letter
//         const relatedDomains = await Domain.find({
//             name: { $regex: `^${firstLetter}`, $options: 'i' }, // Case-insensitive search for first letter
//             _id: { $ne: domain?._id }, // Exclude the current domain if it exists
//         }).limit(5); // Limit to 5 related domains

//         // Use the cached imageUrl from the database
//         const relatedDomainsWithImages = relatedDomains.map((relatedDomain) => ({
//             ...relatedDomain.toObject(),
//             imageUrl: relatedDomain.imageUrl || 'https://via.placeholder.com/150', // Use a placeholder if no image is available
//         }));

//         res.json({
//             success: true,
//             data: domain, // This will be null if the domain doesn't exist
//             relatedDomains: relatedDomainsWithImages, // Include related domains with image URLs
//         });
//     } catch (error) {
//         console.error("Error fetching domain:", error);
//         res.status(500).json({ error: 'Error fetching domain' });
//     }
// });

// router.get('/category/:categoryName', async (req, res) => {
//     const { categoryName } = req.params;

//     try {
//         const categoryName = decodeURIComponent(req.params.categoryName);
//         const domains = await Domain.find({
//             category: { $regex: new RegExp(`^${categoryName}$`, 'i') }
//         });

//         res.json({
//             success: true,
//             data: domains,
//         });
//     } catch (error) {
//         console.error("Error fetching domains by category:", error);
//         res.status(500).json({ error: 'Error fetching domains by category' });
//     }
// });

// // get domain details
// router.get('/:domainName', async (req, res) => {
//     try {
//         const domain = await Domain.findOne({ fullName: req.params.domainName });
//         if (!domain) return res.status(404).json({ error: 'Domain not found' });
//         res.json(domain);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });


module.exports = router;