import React, { useState, useEffect } from 'react';
import { Layout, Send, Layers, FolderHeart, User, Calendar, RefreshCw, PlusCircle, Globe } from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const ClientDashboard = ({ user, navigateTo }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // New enquiry form state
  const [businessType, setBusinessType] = useState('Business Website');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get('/enquiries/my');
      setEnquiries(res.data);
    } catch (err) {
      console.error('Error fetching client enquiries:', err);
      toast.error('Failed to sync enquiries list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleCreateEnquiry = async (e) => {
    e.preventDefault();
    if (!message) {
      toast.error('Please describe your project requirements');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/enquiries', {
        name: user.name,
        email: user.email,
        phone: user.mobile || '+91 8279310322', // Fallback defaults
        businessType,
        message,
        userId: user.id
      });

      toast.success(res.data.message || '🎉 Project enquiry registered successfully!');
      setMessage('');
      
      // Auto refresh list
      fetchEnquiries();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error creating enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Received':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'In Discussion':
        return 'bg-purple-50 text-brand-purple border-purple-200';
      case 'Approved':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Completed':
        return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Rejected':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-light relative px-6 text-left">
      {/* Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-dark/5 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brand-purple text-xs font-bold uppercase tracking-wider">
              <Layout size={14} />
              Customer Dashboard
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">
              Welcome back, <span className="text-brand-purple">{user.name}</span>!
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchEnquiries}
              className="p-2.5 rounded-full bg-white border border-brand-dark/5 hover:border-brand-purple hover:text-brand-purple transition-all duration-300 shadow-sm cursor-pointer"
              title="Sync Data"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="px-5 py-2.5 text-xs font-bold text-brand-dark bg-white border border-brand-dark/10 hover:border-brand-purple hover:text-brand-purple rounded-full transition-all duration-300 shadow-sm"
            >
              Visit Agency Homepage
            </button>
          </div>
        </div>

        {/* Dashboard Grid split into Left/Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Submitted list & Profile details */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Live enquiry listing */}
            <GlassCard className="border border-brand-dark/5 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                  <FolderHeart size={18} className="text-brand-purple" />
                  Your Active Project Enquiries
                </h3>
                <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                  {enquiries.length} Submitted
                </span>
              </div>

              {loading ? (
                // Skeletons
                <div className="space-y-4 py-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : enquiries.length === 0 ? (
                // Beautiful customized empty state
                <div className="py-16 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <PlusCircle size={28} />
                  </div>
                  <div className="space-y-1.5 max-w-sm mx-auto">
                    <h4 className="font-bold text-brand-dark text-sm">No Active Enquiries Found</h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      You haven't requested any custom development sprints yet. Describe your parameters on the right to start building.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
                  {enquiries.map((enq) => (
                    <div
                      key={enq._id}
                      className="p-5 rounded-2xl border border-brand-dark/5 bg-white/50 hover:bg-white transition-all shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div className="space-y-2 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-brand-dark">{enq.businessType}</span>
                          <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${getStatusBadge(enq.status)}`}>
                            {enq.status}
                          </span>
                        </div>
                        <p className="text-xs text-brand-slate leading-relaxed line-clamp-2 max-w-lg">
                          "{enq.message}"
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] text-brand-slate shrink-0">
                        <Calendar size={12} />
                        <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            {/* Profile Overview Card */}
            <GlassCard className="border border-brand-dark/5 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                <User size={18} className="text-brand-purple" />
                Client Profile Metadata
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50">
                  <p className="font-bold text-brand-slate uppercase text-[9px] mb-0.5">Account Email</p>
                  <p className="font-bold text-brand-dark truncate">{user.email}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50">
                  <p className="font-bold text-brand-slate uppercase text-[9px] mb-0.5">Mobile Phone</p>
                  <p className="font-bold text-brand-dark">{user.mobile || 'Not set'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 col-span-1 sm:col-span-2">
                  <p className="font-bold text-brand-slate uppercase text-[9px] mb-0.5">Corporate Address</p>
                  <p className="font-bold text-brand-dark">{user.address || 'Not set'}</p>
                </div>
              </div>
            </GlassCard>

          </div>

          {/* Right Column: Embedded submit new project enquiry form */}
          <div className="lg:col-span-5">
            <GlassCard className="border border-brand-dark/5 p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-brand-dark mb-1 flex items-center gap-2">
                <PlusCircle size={18} className="text-brand-purple" />
                Launch New Development Sprint
              </h3>
              <p className="text-xs text-brand-slate mb-6">
                Define your project scope parameters. Our team will review the sprint timeline dynamically.
              </p>

              <form onSubmit={handleCreateEnquiry} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-dark">Business Category</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-brand-dark/10 bg-white focus:outline-none focus:border-brand-purple cursor-pointer font-semibold"
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

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-dark">Sprint Specifications</label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe sitemaps, API configurations, responsive grids, and structural budget limits..."
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-brand-dark/10 bg-white focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-purple to-brand-blue hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md text-xs mt-2"
                >
                  {submitting ? 'Registering Sprint...' : 'Submit Sprint Enquiry'}
                  <Send size={14} />
                </button>
              </form>
            </GlassCard>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ClientDashboard;
