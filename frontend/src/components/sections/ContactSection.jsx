import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const ContactSection = ({ user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('Business Website');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      toast.error('Please fill out all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/enquiries', {
        name,
        email,
        phone,
        businessType,
        message,
        userId: user ? user.id : null
      });

      toast.success(res.data.message || '🎉 Project enquiry received! We will connect in 2 hours.', {
        duration: 5000
      });

      // Clear Form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error submitting enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-1/10 w-[450px] h-[450px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider">
            Consultation Desk
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
            Let's Talk About Your Next Big Idea
          </h2>
          <p className="text-sm md:text-base text-brand-slate">
            Ready to scale your digital performance? Send our creative developers a brief and let's craft excellence together.
          </p>
        </div>

        {/* Contact Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-brand-dark leading-tight">
                Connect Directly with our Design Operations
              </h3>
              <p className="text-xs md:text-sm text-brand-slate leading-relaxed">
                Whether you need a simple corporate landing page or a complex custom SaaS dashboard, our engineers are ready to build.
              </p>
            </div>

            {/* Quick Details Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand-light border border-brand-dark/5 shadow-sm">
                <div className="p-3 rounded-xl bg-purple-100 text-brand-purple">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-slate">Email Support</p>
                  <a href="mailto:webdyagency@gmail.com" className="text-sm font-bold text-brand-dark hover:text-brand-purple transition-colors">
                    webdyagency@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand-light border border-brand-dark/5 shadow-sm">
                <div className="p-3 rounded-xl bg-blue-100 text-brand-blue">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-slate">WhatsApp & Call</p>
                  <a href="tel:+918279310322" className="text-sm font-bold text-brand-dark hover:text-brand-purple transition-colors">
                    +91 82793 10322
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand-light border border-brand-dark/5 shadow-sm">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-slate">HQ Office</p>
                  <p className="text-sm font-bold text-brand-dark">Delhi, India</p>
                </div>
              </div>
            </div>

            {/* Premium Social CTA Channels */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://wa.me/918279310322"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-green-500 hover:bg-green-600 hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
              <a
                href="https://www.instagram.com/webdy.agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-tr from-pink-500 to-violet-600 hover:shadow-lg transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                Instagram Portal
              </a>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <GlassCard className="border border-brand-dark/5 p-8 md:p-10 text-left shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <h4 className="text-xl font-bold text-brand-dark mb-2">Submit Project Requirements</h4>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-extrabold text-brand-dark">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-extrabold text-brand-dark">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-extrabold text-brand-dark">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-extrabold text-brand-dark">Business Category *</label>
                    <select
                      id="contact-business-type"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple bg-white cursor-pointer"
                    >
                      <option value="Business Website">Business Website Development</option>
                      <option value="Portfolio Website">Portfolio Website</option>
                      <option value="E-Commerce Website">E-Commerce Website</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="SEO Optimization">SEO Optimization</option>
                      <option value="Website Maintenance">Website Maintenance</option>
                      <option value="Speed Optimization">Speed Optimization</option>
                      <option value="Custom Web Application">Custom Web Application</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-extrabold text-brand-dark">Project Specifications *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your design aesthetics, feature requirements, and timeline expectations..."
                    className="w-full px-4 py-3 text-sm rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand-purple to-brand-blue hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md text-sm"
                >
                  {submitting ? 'Submitting Enquiry...' : 'Send Enquiry Message'}
                  <Send size={16} />
                </button>

                {user && (
                  <p className="text-[10px] text-brand-purple text-center font-bold">
                    🛡️ Logged in. This enquiry will be automatically linked to your personal Client Dashboard.
                  </p>
                )}
              </form>
            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
