import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const LoginView = ({ onLoginSuccess, navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email, password });
      
      // Save Token and user info
      localStorage.setItem('webdy_token', res.data.token);
      localStorage.setItem('webdy_user', JSON.stringify(res.data.user));
      
      toast.success(`👋 Welcome back, ${res.data.user.name}!`);
      
      // Pass user up to parent App state
      onLoginSuccess(res.data.user);
      
      // Redirect based on role
      if (res.data.user.role === 'admin') {
        navigateTo('admin');
      } else {
        navigateTo('dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-brand-light relative px-6 overflow-hidden">
      {/* Dynamic Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 text-left">
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
              <h2 className="text-2xl font-extrabold text-brand-dark">Access Portal</h2>
              <p className="text-xs text-brand-slate">
                Log in to submit new project enquiries and monitor structural dev roadmaps.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-brand-dark">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 bg-white"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-bold text-brand-dark">Account Password</label>
                  <button
                    type="button"
                    onClick={() => navigateTo('forgot-password')}
                    className="text-[10px] font-bold text-brand-purple hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 bg-white"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-purple to-brand-blue hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md text-xs mt-2"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
                <LogIn size={16} />
              </button>
            </form>

            <span className="block h-px bg-brand-dark/5 my-6" />

            <p className="text-center text-xs text-brand-slate">
              Don't have an agency account yet?{' '}
              <button
                onClick={() => navigateTo('signup')}
                className="font-bold text-brand-purple hover:underline cursor-pointer focus:outline-none"
              >
                Create Account
              </button>
            </p>

            <div className="mt-4 p-3 rounded-xl bg-purple-50 text-[10px] text-brand-purple font-semibold text-center">
              💡 Demo Admin: <span className="font-bold select-all">admin@webdy.com</span> | Password: <span className="font-bold select-all">AdminWebdy2026!</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginView;
