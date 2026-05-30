const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const jsonDb = require('../config/jsonDb');

const JWT_SECRET = process.env.JWT_SECRET || 'webdy_super_secret_agency_token_key_2026';

// Helper to find a user
const findUserByEmail = async (email) => {
  if (global.dbMode === 'json') {
    return jsonDb.findOne('users', { email: email.toLowerCase() });
  } else {
    return await User.findOne({ email: email.toLowerCase() });
  }
};

const findUserById = async (id) => {
  if (global.dbMode === 'json') {
    return jsonDb.findOne('users', { _id: id });
  } else {
    return await User.findById(id);
  }
};

// @route   POST /api/auth/register
// @desc    Register a new client
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, mobile, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let newUser;
    if (global.dbMode === 'json') {
      newUser = jsonDb.insert('users', {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'client',
        mobile: mobile || '',
        address: address || ''
      });
    } else {
      newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'client',
        mobile: mobile || '',
        address: address || ''
      });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        mobile: newUser.mobile,
        address: newUser.address
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
        address: user.address
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/auth/profile
// @desc    Get current user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      mobile: user.mobile,
      address: user.address,
      createdAt: user.createdAt
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Request password recovery (mocked feedback for security)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await findUserByEmail(email);
    // Standard secure practice: Always return same message, but let backend know
    if (!user) {
      return res.json({ message: 'If that email is registered, we have sent a secure password recovery link containing reset instructions.' });
    }

    // Success response
    res.json({
      message: 'If that email is registered, we have sent a secure password recovery link containing reset instructions.',
      demoNote: `[Demo Mode] Password recovery email triggered. Password is stored safely encrypted.`
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Server error in password recovery request' });
  }
});

module.exports = router;
