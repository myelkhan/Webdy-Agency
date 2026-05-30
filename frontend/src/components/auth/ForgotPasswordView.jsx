import React, { useState } from 'react';
import { Mail, Key, ArrowLeft, Send } from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const ForgotPasswordView = ({ navigateTo }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [demoNote, setDemoNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/forgot-password', { email });
      toast.success(res.data.message || 'Recovery email requested successfully.');
      setSubmitted(true);
      if (res.data.demoNote) {
        setDemoNote(res.data.demoNote);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-brand-light relative px-6 overflow-hidden">
      {/* Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 text-left">
        {/* Back Link */}
        <button
          onClick={() => navigateTo('login')}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-slate hover:text-brand-purple mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Login
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard className="p-8 md:p-10 border border-brand-dark/5 shadow-2xl">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-extrabold text-brand-dark">Recover Credentials</h2>
              <p className="text-xs text-brand-slate">
                Enter your registered agency email address to trigger a dynamic decryption/reset email link.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-brand-dark">Registered Email</label>
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-purple to-brand-blue hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md text-xs mt-2"
                >
                  {loading ? 'Requesting Reset...' : 'Send Recovery Link'}
                  <Send size={14} />
                </button>
              </form>
            ) : (
              <div className="space-y-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Key size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-brand-dark text-base">Request Triggered Successfully</h3>
                  <p className="text-xs text-brand-slate leading-relaxed">
                    We have dispatched password recovery instructions to <span className="font-bold text-brand-dark">{email}</span>. Please check your inbox and spam folders.
                  </p>
                </div>

                {demoNote && (
                  <div className="p-3 bg-purple-50 rounded-2xl text-[11px] text-brand-purple text-left border border-brand-purple/10">
                    <p className="font-bold mb-1">🔧 Staging Demo Notes:</p>
                    <p className="text-[10px] leading-relaxed">{demoNote}</p>
                  </div>
                )}

                <button
                  onClick={() => navigateTo('login')}
                  className="w-full py-3 rounded-xl font-bold text-brand-purple bg-brand-purple/10 hover:bg-brand-purple hover:text-white transition-all text-xs"
                >
                  Return to Login
                </button>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
