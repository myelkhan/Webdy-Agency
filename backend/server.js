const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const jsonDb = require('./config/jsonDb');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for seamless development and testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Webdy Premium Full-Stack API is running!',
    dbMode: global.dbMode,
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enquiries', require('./routes/enquiries'));
app.use('/api/reviews', require('./routes/reviews'));

// Express Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Automatic Admin Seeding function
const seedAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@webdy.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminWebdy2026!';
  const hashedPassword = bcrypt.hashSync(adminPassword, 10);

  try {
    if (global.dbMode === 'json') {
      const existingAdmin = jsonDb.findOne('users', { email: adminEmail });
      if (!existingAdmin) {
        jsonDb.insert('users', {
          name: 'Webdy Admin',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin',
          mobile: '+91 8279310322',
          address: 'Delhi, IN'
        });
        console.log(`🔑 Fallback Admin Seeded successfully! Email: ${adminEmail} | Password: ${adminPassword}`);
      } else {
        console.log('🔑 Fallback Admin already exists in JSON database.');
      }
    } else {
      const existingAdmin = await User.findOne({ email: adminEmail });
      if (!existingAdmin) {
        await User.create({
          name: 'Webdy Admin',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin',
          mobile: '+91 8279310322',
          address: 'Delhi, IN'
        });
        console.log(`🔑 MongoDB Admin Seeded successfully! Email: ${adminEmail} | Password: ${adminPassword}`);
      } else {
        console.log('🔑 MongoDB Admin already exists.');
      }
    }
  } catch (error) {
    console.error('Failed to seed Admin Account on startup:', error);
  }
};

// Start Server (only if not imported by serverless-http in serverless environment)
const PORT = process.env.PORT || 5000;
if (process.env.NETLIFY || process.env.FUNCTIONS_SIGNATURE) {
  // If running in Netlify serverless, ensure we connect to DB on function load
  connectDB().then(() => seedAdminUser());
} else {
  app.listen(PORT, async () => {
    console.log(`🚀 Webdy Express Server running on port ${PORT}`);
    
    // Connect to DB
    await connectDB();
    
    // Seed the Admin account
    await seedAdminUser();
  });
}

module.exports = app;
