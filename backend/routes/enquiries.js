const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const Enquiry = require('../models/Enquiry');
const jsonDb = require('../config/jsonDb');

// Helper to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// @route   POST /api/enquiries
// @desc    Submit a new website development enquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, businessType, message, userId } = req.body;

    if (!name || !email || !phone || !businessType || !message) {
      return res.status(400).json({ message: 'Please provide name, email, phone, businessType, and message' });
    }

    let savedEnquiry;

    if (global.dbMode === 'json') {
      savedEnquiry = jsonDb.insert('enquiries', {
        name,
        email: email.toLowerCase(),
        phone,
        businessType,
        message,
        userId: userId || null,
        status: 'Received'
      });
    } else {
      const activeUserId = userId && isValidObjectId(userId) ? userId : null;
      savedEnquiry = await Enquiry.create({
        name,
        email: email.toLowerCase(),
        phone,
        businessType,
        message,
        userId: activeUserId,
        status: 'Received'
      });
    }

    res.status(201).json({
      message: 'Enquiry submitted successfully! Our elite design team will connect with you within 2 hours.',
      enquiry: savedEnquiry
    });
  } catch (err) {
    console.error('Enquiry submission error:', err);
    res.status(500).json({ message: 'Server error while submitting enquiry' });
  }
});

// @route   GET /api/enquiries/my
// @desc    Get all enquiries submitted by the current authenticated client
router.get('/my', auth, async (req, res) => {
  try {
    let enquiries;
    
    if (global.dbMode === 'json') {
      enquiries = jsonDb.find('enquiries', { userId: req.user.id });
    } else {
      enquiries = await Enquiry.find({ userId: req.user.id }).sort({ createdAt: -1 });
    }

    res.json(enquiries);
  } catch (err) {
    console.error('Fetch client enquiries error:', err);
    res.status(500).json({ message: 'Server error fetching your enquiries' });
  }
});

// @route   GET /api/enquiries
// @desc    Get all enquiries in the system (Admin only)
router.get('/', auth, admin, async (req, res) => {
  try {
    let enquiries;

    if (global.dbMode === 'json') {
      enquiries = jsonDb.find('enquiries');
      // Sort manually by date descending
      enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      enquiries = await Enquiry.find().sort({ createdAt: -1 });
    }

    res.json(enquiries);
  } catch (err) {
    console.error('Fetch all enquiries error:', err);
    res.status(500).json({ message: 'Server error fetching all enquiries' });
  }
});

// @route   PUT /api/enquiries/:id/status
// @desc    Update enquiry status (Admin only)
router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Received', 'Under Review', 'In Discussion', 'Approved', 'Rejected', 'Completed'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid or missing status value' });
    }

    let updatedEnquiry;

    if (global.dbMode === 'json') {
      updatedEnquiry = jsonDb.findByIdAndUpdate('enquiries', req.params.id, { status });
      if (!updatedEnquiry) {
        return res.status(404).json({ message: 'Enquiry not found in local DB' });
      }
    } else {
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid enquiry ID format' });
      }
      updatedEnquiry = await Enquiry.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
      if (!updatedEnquiry) {
        return res.status(404).json({ message: 'Enquiry not found' });
      }
    }

    res.json({
      message: `Enquiry status updated successfully to ${status}`,
      enquiry: updatedEnquiry
    });
  } catch (err) {
    console.error('Update enquiry status error:', err);
    res.status(500).json({ message: 'Server error updating enquiry status' });
  }
});

module.exports = router;
