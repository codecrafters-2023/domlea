const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const domainRoutes = require('./routes/domainRoutes');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
const path = require('path');

const app = express();
const server = require('serverless-http')(app);
const PORT = process.env.PORT || 5000;

// Database
connectDB();

module.exports = app;
module.exports.handler = server;

// Middleware
app.use(express.json());
const allowedOrigins = [
    'https://www.domlea.com',
    'https://domlea.com',
    process.env.CLIENT_URL || "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        // console.log("Incoming request from:", origin); // Debugging
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            console.log("Blocked CORS origin:", origin);
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use((req, res, next) => {
    res.setHeader('Connection', 'keep-alive');
    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/api/auth', authRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res) => {
    console.error('Global error:', err);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
