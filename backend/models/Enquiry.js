const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for anonymous contact submissions
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  businessType: {
    type: String,
    required: true,
    enum: [
      'Business Website',
      'Portfolio Website',
      'E-Commerce Website',
      'Landing Page',
      'UI/UX Design',
      'Website Redesign',
      'SEO Optimization',
      'Website Maintenance',
      'Speed Optimization',
      'Custom Web Application'
    ]
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Received', 'Under Review', 'In Discussion', 'Approved', 'Rejected', 'Completed'],
    default: 'Received'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
