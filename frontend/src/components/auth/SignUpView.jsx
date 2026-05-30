import React, { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, UserPlus, ArrowLeft } from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const SignUpView = ({ onLoginSuccess, navigateTo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Name, email, and password are required');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
        mobile,
        address
      });

      // Save Token and user info
      localStorage.setItem('webdy_token', res.data.token);
      localStorage.setItem('webdy_user', JSON.stringify(res.data.user));

      toast.success(`🎉 Welcome aboard, ${res.data.user.name}!`);

      // Pass user up to parent state
      onLoginSuccess(res.data.user);

      // Redirect to Client Dashboard
      navigateTo('dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-brand-light relative px-6 overflow-hidden">
      {/* Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 text-left">
        {/* Back Link */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-slate hover:text-brand-purple mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Homepage
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard className="p-8 md:p-10 border border-brand-dark/5 shadow-2xl">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-extrabold text-brand-dark">Create Account</h2>
              <p className="text-xs text-brand-slate">
                Register to launch custom development sprints and consult directly with our HQ engineers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-dark">Full Name *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 bg-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-dark">Email Address *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-brand-dark">Create Password *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-dark">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple bg-white"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-dark">Address Location</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                      <MapPin size={16} />
                    </span>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Delhi, IN"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-purple to-brand-blue hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md text-xs mt-4"
              >
                {loading ? 'Creating Account...' : 'Complete Signup'}
                <UserPlus size={16} />
              </button>
            </form>

            <span className="block h-px bg-brand-dark/5 my-6" />

            <p className="text-center text-xs text-brand-slate">
              Already have an agency account?{' '}
              <button
                onClick={() => navigateTo('login')}
                className="font-bold text-brand-purple hover:underline cursor-pointer focus:outline-none"
              >
                Log In
              </button>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpView;
