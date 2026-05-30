const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const Review = require('../models/Review');
const jsonDb = require('../config/jsonDb');

// Helper to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// @route   GET /api/reviews
// @desc    Get all approved reviews to render on the home page carousel
router.get('/', async (req, res) => {
  try {
    let reviews;

    if (global.dbMode === 'json') {
      reviews = jsonDb.find('reviews', { status: 'approved' });
      // Fallback custom default reviews if empty
      if (reviews.length === 0) {
        reviews = [
          {
            _id: "r1",
            name: "Rahul Sharma",
            text: "Webdy transformed our outdated site into a modern masterpiece. The attention to detail is unmatched!",
            rating: 5,
            address: "New Delhi, IN"
          },
          {
            _id: "r2",
            name: "Priya Singh",
            text: "The vibrant theme they designed for us is exactly what we needed. Highly recommend their services.",
            rating: 5,
            address: "Mumbai, IN"
          }
        ];
      }
    } else {
      reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
    }

    res.json(reviews);
  } catch (err) {
    console.error('Fetch approved reviews error:', err);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
});

// @route   POST /api/reviews
// @desc    Submit a review (Starts as pending until moderated by admin)
router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, address, text, rating } = req.body;

    if (!name || !email || !text || !rating) {
      return res.status(400).json({ message: 'Please provide name, email, text, and rating' });
    }

    const numericRating = parseInt(rating, 10);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    }

    let savedReview;

    if (global.dbMode === 'json') {
      savedReview = jsonDb.insert('reviews', {
        name,
        email: email.toLowerCase(),
        mobile: mobile || '',
        address: address || '',
        text,
        rating: numericRating,
        status: 'pending' // Enforce validation moderation
      });
    } else {
      savedReview = await Review.create({
        name,
        email: email.toLowerCase(),
        mobile: mobile || '',
        address: address || '',
        text,
        rating: numericRating,
        status: 'pending'
      });
    }

    res.status(201).json({
      message: 'Review submitted! It will appear on our homepage once approved by Webdy operations.',
      review: savedReview
    });
  } catch (err) {
    console.error('Submit review error:', err);
    res.status(500).json({ message: 'Server error while submitting review' });
  }
});

// @route   GET /api/reviews/admin
// @desc    Get all reviews, including pending (Admin only)
router.get('/admin', auth, admin, async (req, res) => {
  try {
    let reviews;

    if (global.dbMode === 'json') {
      reviews = jsonDb.find('reviews');
      reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      reviews = await Review.find().sort({ createdAt: -1 });
    }

    res.json(reviews);
  } catch (err) {
    console.error('Admin fetch reviews error:', err);
    res.status(500).json({ message: 'Server error fetching moderated reviews' });
  }
});

// @route   PUT /api/reviews/:id/approve
// @desc    Approve a client review (Admin only)
router.put('/:id/approve', auth, admin, async (req, res) => {
  try {
    let updatedReview;

    if (global.dbMode === 'json') {
      updatedReview = jsonDb.findByIdAndUpdate('reviews', req.params.id, { status: 'approved' });
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found in local DB' });
      }
    } else {
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid review ID format' });
      }
      updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        { status: 'approved' },
        { new: true }
      );
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
    }

    res.json({
      message: 'Review approved and is now live on Webdy dynamic testimonials!',
      review: updatedReview
    });
  } catch (err) {
    console.error('Approve review error:', err);
    res.status(500).json({ message: 'Server error approving review' });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete/reject a review (Admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    if (global.dbMode === 'json') {
      const deleted = jsonDb.delete('reviews', { _id: req.params.id });
      if (!deleted) {
        return res.status(404).json({ message: 'Review not found in local DB' });
      }
    } else {
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid review ID format' });
      }
      const deletedReview = await Review.findByIdAndDelete(req.params.id);
      if (!deletedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Delete review error:', err);
    res.status(500).json({ message: 'Server error deleting review' });
  }
});

module.exports = router;
