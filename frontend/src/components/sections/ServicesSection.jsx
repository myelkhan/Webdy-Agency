import React from 'react';
import { 
  Building2, 
  UserCheck, 
  ShoppingBag, 
  Layers, 
  Paintbrush, 
  RefreshCw, 
  Search, 
  Settings, 
  Zap, 
  Cpu 
} from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  const services = [
    {
      title: 'Business Website Development',
      icon: Building2,
      desc: 'High-performing enterprise sites crafted to establish credibility, secure brand placement, and drive consistent inbound corporate leads.',
      color: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      title: 'Portfolio Websites',
      icon: UserCheck,
      desc: 'Visual-forward showcase platforms built for creatives, consultants, and leaders looking to display their accomplishments elegantly.',
      color: 'from-purple-500/10 to-pink-500/10'
    },
    {
      title: 'E-Commerce Websites',
      icon: ShoppingBag,
      desc: 'Feature-rich digital storefronts optimized for maximum conversion rates, lightning-fast checkouts, and seamless payment gateways.',
      color: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      title: 'Landing Pages',
      icon: Layers,
      desc: 'Laser-focused, single-page capture platforms optimized to turn high-intent ad traffic into qualified leads and sales.',
      color: 'from-amber-500/10 to-orange-500/10'
    },
    {
      title: 'UI/UX Design',
      icon: Paintbrush,
      desc: 'Stunning user-centered wireframes, mockups, and prototypes crafted to make interactions intuitive and visually unforgettable.',
      color: 'from-rose-500/10 to-purple-500/10'
    },
    {
      title: 'Website Redesign',
      icon: RefreshCw,
      desc: 'Comprehensive visual and structural upgrades to modernize legacy websites, improve metrics, and align with new brand models.',
      color: 'from-cyan-500/10 to-blue-500/10'
    },
    {
      title: 'SEO Optimization',
      icon: Search,
      desc: 'Deep technical audits, keywords strategy, speed tuning, and indexing actions that propel your business to rank #1 on Google.',
      color: 'from-indigo-500/10 to-purple-500/10'
    },
    {
      title: 'Website Maintenance',
      icon: Settings,
      desc: '24/7 security scanning, server backups, plugin updates, content adjustments, and technical auditing for perfect system health.',
      color: 'from-teal-500/10 to-green-500/10'
    },
    {
      title: 'Speed Optimization',
      icon: Zap,
      desc: 'Comprehensive code minimization, image compressing, cache configuration, and CDN routing to drop load times under 1 second.',
      color: 'from-yellow-500/10 to-amber-500/10'
    },
    {
      title: 'Custom Web Applications',
      icon: Cpu,
      desc: 'Bespoke software platforms, SaaS structures, database applications, and full-stack systems built to automate your operations.',
      color: 'from-violet-500/10 to-indigo-500/10'
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-light relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider">
            Our Core Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
            Comprehensive Digital Solutions Built to Scale
          </h2>
          <p className="text-sm md:text-base text-brand-slate">
            We design, develop, optimize, and support digital products that outperform competition and empower businesses globally.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <GlassCard className="h-full flex flex-col items-start gap-5 relative overflow-hidden group">
                  {/* Color Glow Overlay */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr ${srv.color} rounded-bl-full opacity-40 group-hover:scale-125 transition-transform duration-700`} />
                  
                  {/* Icon Wrapper */}
                  <div className="p-3.5 rounded-2xl bg-white shadow-md text-brand-purple relative z-10 border border-brand-dark/5 transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-brand-purple group-hover:to-brand-blue group-hover:text-white group-hover:shadow-glow-purple">
                    <IconComponent size={22} />
                  </div>

                  {/* Text Contents */}
                  <div className="space-y-2.5 relative z-10 text-left">
                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-purple transition-colors duration-300">
                      {srv.title}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-slate leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
