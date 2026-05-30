import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  FolderSync, 
  Users, 
  CheckCircle, 
  MessageSquare, 
  Trash2, 
  Check, 
  RefreshCw, 
  ChevronRight, 
  Mail, 
  Phone,
  Star
} from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const AdminDashboard = ({ user, navigateTo }) => {
  const [activeTab, setActiveTab] = useState('enquiries'); // enquiries, reviews
  const [enquiries, setEnquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Parallel requests
      const [enqRes, revRes] = await Promise.all([
        api.get('/enquiries'),
        api.get('/reviews/admin')
      ]);

      setEnquiries(enqRes.data);
      setReviews(revRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      toast.error('Failed to sync system metrics. Ensure token is authorized.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (enquiryId, newStatus) => {
    try {
      const res = await api.put(`/enquiries/${enquiryId}/status`, { status: newStatus });
      toast.success(res.data.message || 'Status synced successfully!');
      
      // Auto-update locally to avoid fully loading spinners
      setEnquiries((prev) =>
        prev.map((e) => (e._id === enquiryId ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleApproveReview = async (reviewId) => {
    try {
      const res = await api.put(`/reviews/${reviewId}/approve`);
      toast.success(res.data.message || 'Review is now live on homepage!');
      
      // Update local state
      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, status: 'approved' } : r))
      );
    } catch (err) {
      toast.error('Failed to approve review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to permanently delete this testimonial?')) return;
    try {
      await api.delete(`/reviews/${reviewId}`);
      toast.success('Testimonial deleted successfully');
      
      // Remove from local state
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  // Metrics calculation
  const totalEnquiries = enquiries.length;
  const pendingEnquiries = enquiries.filter(e => e.status === 'Received' || e.status === 'Under Review').length;
  const completedProjects = enquiries.filter(e => e.status === 'Completed').length;
  const totalReviews = reviews.length;
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-light relative px-6 text-left">
      {/* Dynamic blurs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-dark/5 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brand-purple text-xs font-bold uppercase tracking-wider">
              <ShieldAlert size={14} />
              HQ Administrative Console
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">
              Webdy Operations Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 rounded-full bg-white border border-brand-dark/5 hover:border-brand-purple hover:text-brand-purple transition-all duration-300 shadow-sm cursor-pointer"
              title="Sync Data Logs"
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

        {/* Analytical Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="p-6 border border-brand-dark/5 shadow-sm hover:shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-brand-slate tracking-wider">Total Enquiries</p>
              <p className="text-3xl font-extrabold text-brand-dark">{totalEnquiries}</p>
            </div>
            <div className="p-3 bg-blue-50 text-brand-blue rounded-xl">
              <FolderSync size={20} />
            </div>
          </GlassCard>

          <GlassCard className="p-6 border border-brand-dark/5 shadow-sm hover:shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-brand-slate tracking-wider">Pending Audits</p>
              <p className="text-3xl font-extrabold text-brand-purple">{pendingEnquiries}</p>
            </div>
            <div className="p-3 bg-purple-50 text-brand-purple rounded-xl">
              <ShieldAlert size={20} />
            </div>
          </GlassCard>

          <GlassCard className="p-6 border border-brand-dark/5 shadow-sm hover:shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-brand-slate tracking-wider">Completed Projects</p>
              <p className="text-3xl font-extrabold text-emerald-600">{completedProjects}</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle size={20} />
            </div>
          </GlassCard>

          <GlassCard className="p-6 border border-brand-dark/5 shadow-sm hover:shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-brand-slate tracking-wider">Pending Reviews</p>
              <p className="text-3xl font-extrabold text-amber-600">{pendingReviews}</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
              <MessageSquare size={20} />
            </div>
          </GlassCard>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-brand-dark/5">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-6 py-3.5 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === 'enquiries'
                ? 'border-brand-purple text-brand-purple'
                : 'border-transparent text-brand-slate hover:text-brand-dark'
            }`}
          >
            Enquiry Submissions Manager ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3.5 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-brand-purple text-brand-purple'
                : 'border-transparent text-brand-slate hover:text-brand-dark'
            }`}
          >
            Client Reviews Moderator ({reviews.length})
          </button>
        </div>

        {/* Active Tab View Panel */}
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <RefreshCw size={24} className="animate-spin text-brand-purple mx-auto" />
            <p className="text-xs text-brand-slate">Fetching synchronized cloud database log records...</p>
          </div>
        ) : activeTab === 'enquiries' ? (
          /* Enquiries Manager */
          <GlassCard className="border border-brand-dark/5 p-6 shadow-sm overflow-hidden">
            {enquiries.length === 0 ? (
              <div className="py-16 text-center text-brand-slate text-sm">No client enquiries found in system records.</div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-brand-dark/5 text-brand-slate font-extrabold uppercase tracking-wider text-[10px] pb-4">
                      <th className="pb-4">Client Detail</th>
                      <th className="pb-4">Business Category</th>
                      <th className="pb-4">Specifications Message</th>
                      <th className="pb-4">Submission Date</th>
                      <th className="pb-4">Sprints Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq._id} className="border-b border-brand-dark/5 hover:bg-slate-50/50 transition-colors">
                        {/* Client details */}
                        <td className="py-4 pr-4">
                          <div className="space-y-1">
                            <p className="font-bold text-brand-dark text-sm">{enq.name}</p>
                            <div className="space-y-0.5 text-[10px] text-brand-slate">
                              <span className="flex items-center gap-1"><Mail size={10} />{enq.email}</span>
                              <span className="flex items-center gap-1"><Phone size={10} />{enq.phone}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 pr-4 font-bold text-brand-dark">{enq.businessType}</td>

                        {/* Message */}
                        <td className="py-4 pr-4 max-w-sm text-brand-slate leading-relaxed">
                          <p className="line-clamp-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                            "{enq.message}"
                          </p>
                        </td>

                        {/* Date */}
                        <td className="py-4 pr-4 text-brand-slate">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>

                        {/* Status updating actions */}
                        <td className="py-4">
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg border border-brand-dark/10 bg-white cursor-pointer font-bold text-brand-dark text-[11px]"
                          >
                            <option value="Received">Received</option>
                            <option value="Under Review">Under Review</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        ) : (
          /* Dynamic Reviews ModerationDesk */
          <GlassCard className="border border-brand-dark/5 p-6 shadow-sm">
            {reviews.length === 0 ? (
              <div className="py-16 text-center text-brand-slate text-sm">No user reviews submitted in database catalog.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="p-5 rounded-2xl border border-brand-dark/5 bg-white/50 hover:bg-white transition-all shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2 text-left">
                      {/* Name/Address */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="font-extrabold text-brand-dark text-sm">{rev.name}</h4>
                          <p className="text-[10px] text-brand-slate">{rev.address || 'Delhi, IN'}</p>
                        </div>
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            rev.status === 'approved'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                              : 'bg-amber-50 text-amber-600 border-amber-200'
                          }`}
                        >
                          {rev.status}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5 text-amber-400">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={12} className="fill-amber-400" />
                        ))}
                      </div>

                      {/* Comment text */}
                      <p className="text-xs text-brand-slate leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                        "{rev.text}"
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between border-t border-brand-dark/5 pt-3">
                      <span className="text-[10px] text-brand-slate">{rev.email}</span>

                      <div className="flex items-center gap-2">
                        {rev.status === 'pending' && (
                          <button
                            onClick={() => handleApproveReview(rev._id)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all cursor-pointer border border-emerald-200"
                            title="Approve Live Testimonial"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReview(rev._id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all cursor-pointer border border-red-200"
                          title="Permanently Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
