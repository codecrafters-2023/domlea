const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const domainRoutes = require('./routes/domainRoutes');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const allowedOrigins = [
  'https://www.domlea.com',
  'https://domlea.com',
  process.env.CLIENT_URL || 'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Database
connectDB();

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.use(express.static('frontend/build'));

//     // Handle React routing - return all requests to React app
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
//     });

// }

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use((req, res, next) => {
    res.setHeader('Connection', 'keep-alive');
    next();
});
// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/api/auth', authRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
