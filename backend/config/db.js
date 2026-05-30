const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

global.dbMode = 'mongodb'; // Default mode

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/webdy', {
      serverSelectionTimeoutMS: 3000 // Quick timeout to check if server is up
    });
    console.log(`📡 MongoDB Connected Successfully: ${conn.connection.host}`);
    global.dbMode = 'mongodb';
  } catch (error) {
    console.warn('⚠️  Could not connect to MongoDB. Switching to dynamic local JSON fallback database...');
    global.dbMode = 'json';
    
    // Ensure the data directory exists for JSON DB (using /tmp on serverless environments)
    const isServerless = process.env.NETLIFY || process.env.LAMBDA_TASK_ROOT;
    const dataDir = isServerless ? '/tmp' : path.join(__dirname, '../data');
    if (!isServerless && !fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const dbPath = isServerless ? '/tmp/fallback_db.json' : path.join(dataDir, 'fallback_db.json');
    if (!fs.existsSync(dbPath)) {
      const initialDb = {
        users: [],
        enquiries: [],
        reviews: [
          {
            _id: "review1",
            name: "Rahul Sharma",
            email: "rahul@example.com",
            mobile: "+91 9876543210",
            address: "New Delhi, IN",
            text: "Webdy transformed our outdated site into a modern masterpiece. The attention to detail is unmatched!",
            rating: 5,
            status: "approved",
            createdAt: new Date().toISOString()
          },
          {
            _id: "review2",
            name: "Priya Singh",
            email: "priya@example.com",
            mobile: "+91 8888888888",
            address: "Mumbai, IN",
            text: "The vibrant theme they designed for us is exactly what we needed. Highly recommend their services.",
            rating: 5,
            status: "approved",
            createdAt: new Date().toISOString()
          }
        ]
      };
      fs.writeFileSync(dbPath, JSON.stringify(initialDb, null, 2), 'utf8');
      console.log('📦 Initialized fallback JSON database at: backend/data/fallback_db.json');
    } else {
      console.log('📦 Loaded existing fallback JSON database.');
    }
  }
};

module.exports = connectDB;
