import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Edit3, X } from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const defaultReviews = [
    {
      _id: 'd1',
      name: 'Rahul Sharma',
      address: 'New Delhi, IN',
      text: 'Webdy transformed our outdated site into a modern masterpiece. The attention to detail is unmatched!',
      rating: 5
    },
    {
      _id: 'd2',
      name: 'Priya Singh',
      address: 'Mumbai, IN',
      text: 'The vibrant theme they designed for us is exactly what we needed. Highly recommend their services.',
      rating: 5
    },
    {
      _id: 'd3',
      name: 'Michael Chen',
      address: 'California, US',
      text: 'Stunning layouts, lightning speeds, and priority support. Webdy is the best development agency out there.',
      rating: 5
    }
  ];

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reviews');
      if (res.data && res.data.length > 0) {
        setReviews(res.data);
      } else {
        setReviews(defaultReviews);
      }
    } catch (err) {
      console.warn('Could not fetch reviews, loading defaults:', err);
      setReviews(defaultReviews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (reviews.length <= 1 || isFormOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews, isFormOpen]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !text) {
      toast.error('Please fill out all required fields');
      return;
    }

    try {
      const res = await api.post('/reviews', {
        name,
        email,
        mobile,
        address,
        text,
        rating
      });
      toast.success(res.data.message || 'Review submitted successfully for admin review!');
      
      // Reset form
      setName('');
      setEmail('');
      setMobile('');
      setAddress('');
      setText('');
      setRating(5);
      setIsFormOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error submitting feedback');
    }
  };

  const activeReview = reviews[currentIndex] || defaultReviews[0];

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Neon Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
            What Dynamic Brands Say About Us
          </h2>
          <p className="text-sm md:text-base text-brand-slate">
            Hear from startup founders and corporate executives who experienced the Webdy difference.
          </p>
        </div>

        {/* Carousel Frame */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            {activeReview && (
              <motion.div
                key={activeReview._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <GlassCard className="max-w-3xl mx-auto p-10 md:p-14 relative text-left border border-brand-dark/5 hover:-translate-y-0.5">
                  <Quote className="absolute top-6 right-8 text-brand-purple/15 w-24 h-24 rotate-180 pointer-events-none" />
                  
                  <div className="space-y-6 relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(activeReview.rating || 5)].map((_, i) => (
                        <Star key={i} size={18} className="fill-amber-400" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-lg md:text-xl text-brand-dark leading-relaxed font-semibold italic">
                      "{activeReview.text}"
                    </p>

                    <span className="block h-px bg-brand-dark/5" />

                    {/* Reviewer Details */}
                    <div>
                      <h4 className="text-base font-bold text-brand-dark">{activeReview.name}</h4>
                      <p className="text-xs text-brand-slate">{activeReview.address || 'Verified Client'}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Carousel navigation buttons */}
          <div className="absolute inset-y-12 -left-4 md:-left-12 flex items-center">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white border border-brand-dark/5 hover:border-brand-purple hover:text-brand-purple transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute inset-y-12 -right-4 md:-right-12 flex items-center">
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white border border-brand-dark/5 hover:border-brand-purple hover:text-brand-purple transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Call to feedback button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-brand-purple bg-brand-purple/10 border border-brand-purple/20 hover:bg-brand-purple hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
          >
            <Edit3 size={14} />
            Leave a Client Review
          </button>
        </div>

        {/* Modal form drawer for feedback submission */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-brand-dark/40 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-xl bg-white rounded-3xl p-8 relative shadow-2xl border border-brand-dark/5 text-left"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 p-1.5 text-brand-slate hover:text-brand-dark rounded-full hover:bg-slate-50 transition-all"
              >
                <X size={20} />
              </button>

              <div className="mb-6 space-y-1.5">
                <h3 className="text-xl font-bold text-brand-dark">Write Your Review</h3>
                <p className="text-xs text-brand-slate">
                  Help other scaling businesses learn about your design roadmap with Webdy.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-brand-dark">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-brand-dark">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-brand-dark">Mobile Number</label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-brand-dark">Client Location</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Delhi, IN"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-dark">Overall Rating</label>
                  <div className="flex gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-amber-400 focus:outline-none transition-transform active:scale-90"
                      >
                        <Star
                          size={24}
                          className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-dark">Testimonial Review *</label>
                  <textarea
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe your design and performance experience with Webdy..."
                    rows={4}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-purple to-brand-blue hover:shadow-glow-purple transition-all duration-300 mt-2 text-xs"
                >
                  Submit for Moderation
                </button>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsSection;
