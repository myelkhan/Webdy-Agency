import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PricingSection = () => {
  const premiumFeatures = [
    'Responsive Website Layout',
    'Modern Clean UI/UX Design',
    'Integrated Contact Forms',
    'SEO Friendly Sitemaps',
    'Mobile Device Optimization',
    'Social Media Linking',
    'Fluid Framer Animations',
    'Fast Asset Loading Speeds',
    'SSL Security Configuration',
    'Admin Dashboard Concepts'
  ];

  const premiumPlusFeatures = [
    'Everything included in PREMIUM plan',
    'Advanced Parallax Scroll Animations',
    'Bespoke Premium Custom UI/UX Design',
    'User Account Authentication System',
    'Secure Mongoose/MongoDB Database',
    'Custom Client Operations Dashboard',
    'Blog Management System Integration',
    'Secure External API Integrations',
    'High-End Hashing Security & Protection',
    'Lightning Performance Tuning',
    '24/7 Priority Support Channels',
    'Integrated Analytics Panels',
    'Dynamic Custom Admin Dashboard',
    'Dynamic Custom CRM Operations'
  ];

  const handleEnquire = (planName) => {
    toast(`Plan selected: "${planName}"! Redirecting to contact desk...`, {
      icon: '💼',
    });
    
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill fields if present
        const msgEl = document.getElementById('contact-message');
        const bTypeEl = document.getElementById('contact-business-type');
        if (bTypeEl) {
          bTypeEl.value = planName === 'PREMIUM PLUS' ? 'Custom Web Application' : 'Business Website';
        }
        if (msgEl) {
          msgEl.value = `Hello Webdy team! I am highly interested in inquiring about your "${planName}" development package. Please connect with me to discuss our digital roadmap.`;
        }
      }
    }, 50);
  };

  return (
    <section id="pricing" className="py-24 bg-brand-light relative overflow-hidden">
      {/* Decorative Neon Blurs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider">
            Premium Packages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
            Flexible Enterprise-Grade Service Plans
          </h2>
          <p className="text-sm md:text-base text-brand-slate">
            Select the digital development tier matching your scaling operations. Fully custom project budgets are available upon review.
          </p>
        </div>

        {/* Pricing Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Card 1: PREMIUM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex"
          >
            <GlassCard className="flex-1 flex flex-col justify-between p-8 md:p-10 border border-brand-dark/5 shadow-sm text-left">
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full inline-block">
                    Starter Suite
                  </span>
                  <h3 className="text-2xl font-extrabold text-brand-dark">PREMIUM</h3>
                  <p className="text-xs md:text-sm text-brand-slate">
                    Best for business brochures, startups, landing setups, and modern portfolios looking for clean aesthetic builds.
                  </p>
                </div>

                <span className="block h-px bg-brand-dark/5" />

                {/* Features List */}
                <ul className="space-y-4">
                  {premiumFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-xs md:text-sm text-brand-slate">
                      <div className="p-0.5 rounded-full bg-brand-purple/10 text-brand-purple mt-0.5 shrink-0">
                        <Check size={14} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleEnquire('PREMIUM')}
                className="mt-10 w-full py-4 rounded-full font-bold text-brand-dark border border-brand-dark/15 hover:border-brand-purple hover:text-brand-purple transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                Enquire Now
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
            </GlassCard>
          </motion.div>

          {/* Card 2: PREMIUM PLUS (Highlighted - Most Popular) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex"
          >
            <div className="flex-1 rounded-[2rem] p-[2px] bg-gradient-to-tr from-brand-purple to-brand-blue shadow-2xl relative flex">
              
              {/* Highlight Tag */}
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                <Star size={12} className="fill-white" />
                Most Popular Selection
              </span>

              <div className="flex-1 rounded-[1.9rem] bg-white p-8 md:p-10 text-left flex flex-col justify-between relative overflow-hidden">
                {/* Background light glow in highlighted card */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-purple/5 rounded-full blur-[40px] pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  {/* Header */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full inline-block">
                      Enterprise SaaS
                    </span>
                    <h3 className="text-2xl font-extrabold text-brand-dark flex items-center gap-2">
                      PREMIUM PLUS
                    </h3>
                    <p className="text-xs md:text-sm text-brand-slate">
                      Best for custom applications, portals, dynamic e-shops, client secure databases, and complex administrative interfaces.
                    </p>
                  </div>

                  <span className="block h-px bg-brand-dark/5" />

                  {/* Features List */}
                  <ul className="space-y-4">
                    {premiumPlusFeatures.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs md:text-sm text-brand-dark/95">
                        <div className="p-0.5 rounded-full bg-brand-purple text-white mt-0.5 shrink-0 shadow-sm">
                          <Check size={12} />
                        </div>
                        <span className={feat.startsWith('Everything') ? 'font-bold text-brand-purple' : ''}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleEnquire('PREMIUM PLUS')}
                  className="mt-10 w-full py-4 rounded-full font-bold text-white bg-gradient-to-r from-brand-purple to-brand-blue hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer relative z-10"
                >
                  Enquire Now
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default PricingSection;
