const express = require('express');
const Domain = require('../models/Domain');
const router = express();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST, // e.g. 'smtp.sendgrid.net'
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});


// Configure Cloudinary
router.get("/userDomainsList", async (req, res) => {
    try {
        const { search, tld, minPrice, maxPrice, page, limit, length } = req.query;

        const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
        const parsedLimit = Math.max(parseInt(limit, 10) || 10);

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

        // Add name length filtering
        if (length) {
            query.nameLength = {};
            switch (length) {
                case '3':
                    query.nameLength.$lte = 3;
                    break;
                case '4':
                    query.nameLength.$lte = 4;
                    break;
                case '5':
                    query.nameLength.$lte = 5;
                    break;
                case '6':
                    query.nameLength.$lte = 6;
                    break;
                case '7':
                    query.nameLength.$lte = 7;
                    break;
                case '8':
                    query.nameLength.$lte = 8;
                    break;
                case '15':
                    query.nameLength.$lte = 15;
                    break;
                case '20':
                    query.nameLength.$lte = 20;
                    break;
                case '20+':
                    query.nameLength.$gt = 20;
                    break;
            }
        }

        const skip = (parsedPage - 1) * parsedLimit;

        // Aggregation pipeline
        const aggregationPipeline = [
            {
                $addFields: {
                    nameLength: { $strLenCP: "$name" }
                }
            },
            { $match: query },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: parsedLimit  }
        ];

        // Get paginated results
        const domains = await Domain.aggregate(aggregationPipeline);

        // Get total count
        const countPipeline = [
            {
                $addFields: {
                    nameLength: { $strLenCP: "$name" }
                }
            },
            { $match: query },
            { $count: "total" }
        ];
        const totalResult = await Domain.aggregate(countPipeline);
        const total = totalResult[0]?.total || 0;

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
        const { search, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
        const parsedPage = Math.max(parseInt(page, 10), 1);
        const parsedLimit = Math.max(parseInt(limit, 10), 1);
        const skip = (parsedPage - 1) * parsedLimit;
        const responseData = {
            exactMatch: null,
            relatedDomains: []
        };

        // Declare variables in outer scope
        let searchTerm = '';
        let searchTermLower = '';
        let firstChar = '';

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

        if (search) {
            searchTerm = search.trim();
            searchTermLower = searchTerm.toLowerCase();
            firstChar = searchTerm.charAt(0).toLowerCase();

            query.$or = [
                // Exact matches
                { name: searchTerm },
                { category: searchTerm },
                
                // Partial matches
                { name: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
                
                // First letter anywhere
                { name: { $regex: firstChar, $options: "i" } },
                { category: { $regex: firstChar, $options: "i" } }
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

        // Build aggregation pipeline
        const aggregationPipeline = [
            { $match: query },
            {
                $addFields: {
                    score: {
                        $add: [
                            // Exact matches
                            { $cond: [{ $eq: [{ $toLower: "$name" }, searchTermLower] }, 3, 0] },
                            { $cond: [{ $eq: [{ $toLower: "$category" }, searchTermLower] }, 2, 0] },
                            
                            // Partial matches
                            { $cond: [{ $regexMatch: { input: "$name", regex: searchTerm, options: "i" } }, 1, 0] },
                            { $cond: [{ $regexMatch: { input: "$category", regex: searchTerm, options: "i" } }, 1, 0] },
                            
                            // First letter matches
                            { $cond: [{ $regexMatch: { input: "$name", regex: firstChar, options: "i" } }, 0.5, 0] },
                            { $cond: [{ $regexMatch: { input: "$category", regex: firstChar, options: "i" } }, 0.5, 0] }
                        ]
                    }
                }
            },
            { $sort: { score: -1, price: 1 } },
            { $skip: skip },
            { $limit: parsedLimit }
        ];

        // Get paginated results
        const [totalResult, domains] = await Promise.all([
            Domain.countDocuments(query),
            Domain.aggregate(aggregationPipeline)
        ]);

        responseData.relatedDomains = domains;

        res.json({
            success: true,
            ...responseData,
            total: totalResult,
            page: parsedPage,
            pages: Math.ceil(totalResult / parsedLimit),
        });

    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({
            success: false,
            message: "Error performing search"
        });
    }
});

// Submit offer route
router.post('/submit-offer', async (req, res) => {
    try {
        const { name, email, mobile, domain, offerPrice } = req.body;

        // Validate required fields
        if (!name || !email || !mobile || !domain) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create email content with professional template
        const mailOptions = {
            from: `"Domlea" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New Domain Offer: ${domain}`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Domain Offer Notification</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333333;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
                        <tr>
                            <td style="padding: 20px; background-color: #2c3e50; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0;">New Domain Offer Received</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 30px 20px;">
                                <h2 style="color: #2c3e50; margin-top: 0;">Offer Details</h2>
                                <table cellpadding="10" style="width: 100%;">
                                    <tr>
                                        <td style="border-bottom: 1px solid #eeeeee;"><strong>Domain Name:</strong></td>
                                        <td style="border-bottom: 1px solid #eeeeee;">${domain}</td>
                                    </tr>
                                    <tr>
                                        <td style="border-bottom: 1px solid #eeeeee;"><strong>Offer Price:</strong></td>
                                        <td style="border-bottom: 1px solid #eeeeee; color: #27ae60;">${offerPrice || 'Not specified'}</td>
                                    </tr>
                                    <tr>
                                        <td style="border-bottom: 1px solid #eeeeee;"><strong>Submitted:</strong></td>
                                        <td style="border-bottom: 1px solid #eeeeee;">${new Date().toLocaleString()}</td>
                                    </tr>
                                </table>
                                <h3 style="color: #2c3e50; margin-top: 30px;">Contact Information</h3>
                                <table cellpadding="10" style="width: 100%;">
                                    <tr>
                                        <td><strong>Name:</strong></td>
                                        <td>${name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Email:</strong></td>
                                        <td><a href="mailto:${email}">${email}</a></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Mobile:</strong></td>
                                        <td><a href="tel:${mobile}">${mobile}</a></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; background-color: #f8f9fa; text-align: center;">
                                <p style="margin: 0; color: #666666; font-size: 12px;">
                                    This is an automated message from ${process.env.COMPANY_NAME || 'Domlea'}.<br>
                                    © ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Domlea'}. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Offer submitted successfully' });
    } catch (error) {
        console.error('Error submitting offer:', error);
        res.status(500).json({ error: 'Error submitting offer' });
    }
});

module.exports = router;

// to send email to admin for newsletter subscription
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Valid email required' }); // Fixed response
        }

        const mailOptions = {
            from: `"Domlea" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New Newsletter Subscription`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        .brand-header { background-color: #2c3e50; padding: 20px; text-align: center; }
        .brand-name { color: white; font-size: 24px; margin: 0; }
        .content { padding: 25px; font-family: Arial, sans-serif; }
    </style>
</head>
<body>
    <div class="brand-header">
        <h1 class="brand-name">${process.env.COMPANY_NAME || 'Domlea'}</h1>
    </div>
    <div class="content">
        <h3>New Newsletter Subscription</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscription Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Website:</strong> ${process.env.WEBSITE_URL || 'https://domlea.com'}</p>
        <hr>
        <p style="color: #666;">
            This subscription was received through the 
            <a href="${process.env.WEBSITE_URL || 'https://domlea.com'}">
                ${process.env.COMPANY_NAME || 'Domlea'}
            </a> website.
        </p>
    </div>
</body>
</html>
`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true }); // Added proper status code
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ error: 'Subscription failed' }); // Fixed response
    }
});

router.get('/:domainName', async (req, res) => {
    try {
        const searchName = req.params.domainName.toLowerCase().trim();
        
        const domain = await Domain.findOne({ 
            fullName: searchName // Match against lowercase version
        });

        if (!domain) {
            return res.status(404).json({ 
                success: false,
                message: 'Domain not found' 
            });
        }

        // Return domain with original casing
        res.json({
            success: true,
            data: {
                ...domain.toObject(),
                name: domain.name, // Original casing
                tld: domain.tld    // Original casing
            }
        });

    } catch (error) {
        console.error('Domain detail error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
});


module.exports = router;