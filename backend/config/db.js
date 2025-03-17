const mongoose = require('mongoose');

const connectDB = async () => {
  const MAX_RETRIES = 3;
  let retryCount = 0;

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        w: 'majority'
      });
      console.log('MongoDB connected');
    } catch (err) {
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        console.log(`MongoDB connection retry (${retryCount}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        return connectWithRetry();
      }
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  };

  await connectWithRetry();
};

module.exports = connectDB;