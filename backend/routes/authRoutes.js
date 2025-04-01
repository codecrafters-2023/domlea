const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Register
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ email, password, role });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(201).json({ _id: user._id, email: user.email, role: user.role, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.json({ _id: user._id, email: user.email, role: user.role, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 600000; // 10 minutes
        await user.save();

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            pool: true,
            maxConnections: 5,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // HTML email template
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
        const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Password Reset Request</title>
            <style>
                /* Keep the same CSS styles from previous answer */
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; padding: 20px; }
                .header { text-align: center; padding-bottom: 20px; }
                .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; }
                .button { display: inline-block; background-color: #007bff; color: white!important; 
                            padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9em; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Password Reset Request</h2>
                </div>
                <div class="content">
                    <p>Hello ${user.name || user.email},</p>
                    <p>We received a request to reset your password. Click the button below to reset it:</p>
                    <a href="${resetLink}" class="button">Reset Password</a>
                    <p>If you didn't request this password reset, please ignore this email. This link expires in 10 minutes.</p>
                    <p>Can't click the button? Copy this link to your browser:<br>
                    <code>${resetLink}</code></p>
                </div>
                <div class="footer">
                    <p>Best regards,<br>${process.env.COMPANY_NAME || 'Domlea'} Team</p>
                    <p>Need help? Contact <a href="mailto:${process.env.SUPPORT_EMAIL || 'farmaha@gmail.com'}">
                        ${process.env.SUPPORT_EMAIL || 'farmaha@gmail.com'}</a></p>
                    <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Domlea'}. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Email options
        const mailOptions = {
            to: user.email,
            subject: 'Password Reset Instructions',
            html: htmlTemplate,
            text: `Please use this link to reset your password: ${resetLink}` // Fallback text version
        };

        // Send email with error handling
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Password reset email sent successfully' });

    } catch (error) {
        console.error('Password reset error:', error);
        
        // Handle specific email errors
        if (error.code === 'ECONNRESET') {
            return res.status(503).json({ message: 'Email service temporarily unavailable' });
        }
        
        res.status(500).json({ 
            message: error.response?.body?.message || 'Error processing password reset request' 
        });
    }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: decoded.id,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Protected route example
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin route example
router.get('/admin', protect, admin, (req, res) => {
    res.json({ message: 'Admin Dashboard' });
});

module.exports = router;