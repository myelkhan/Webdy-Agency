import React, { useState } from 'react';
import { ExternalLink, Sparkles, Filter } from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const PortfolioSection = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web App', 'E-Commerce', 'UI/UX', 'Landing Page'];

  const projects = [
    {
      title: 'Apex Analytics SaaS',
      category: 'Web App',
      gradient: 'from-blue-600 to-cyan-500',
      desc: 'Real-time corporate metrics tracking system featuring data synchronization, dynamic chart suites, and role permissions.',
      link: '#'
    },
    {
      title: 'Aura Premium Shop',
      category: 'E-Commerce',
      gradient: 'from-purple-600 to-pink-500',
      desc: 'Sleek luxury fashion storefront engineered for lightning load speeds, dynamic filters, and one-tap checkout operations.',
      link: '#'
    },
    {
      title: 'Helix Studio',
      category: 'Landing Page',
      gradient: 'from-amber-500 to-orange-600',
      desc: 'Laser-focused single-page marketing system that drove a 34% increase in premium subscription conversions.',
      link: '#'
    },
    {
      title: 'Nova Crypt Platform',
      category: 'UI/UX',
      gradient: 'from-emerald-500 to-teal-600',
      desc: 'Stunning decentralized asset tracker interface incorporating glassmorphism layouts and light-speed user path flows.',
      link: '#'
    },
    {
      title: 'Equinox Logistics App',
      category: 'Web App',
      gradient: 'from-indigo-600 to-blue-500',
      desc: 'Full-scale supply chain logistics tracking system incorporating geographical markers and real-time dispatcher grids.',
      link: '#'
    },
    {
      title: 'Zenith Creator Space',
      category: 'Landing Page',
      gradient: 'from-rose-500 to-purple-600',
      desc: 'Animated, high-retention landing platform built for international creators, complete with seamless membership integrations.',
      link: '#'
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleLivePreview = (projectTitle) => {
    toast(`🚀 Launching live staging preview for "${projectTitle}"! Enjoy the speed.`, {
      icon: '✨',
      style: {
        borderRadius: '999px',
        background: '#0f172a',
        color: '#fff',
      }
    });
  };

  return (
    <section id="portfolio" className="py-24 bg-brand-light relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left max-w-xl space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider">
              Selected Creations
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
              Award-Winning Client Case Studies
            </h2>
            <p className="text-sm md:text-base text-brand-slate">
              Explore how we convert conceptual client mockups into high-speed, secure, production-ready marketing assets.
            </p>
          </div>

          {/* Category Filter Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full border transition-all duration-300 ${
                  filter === cat
                    ? 'bg-brand-purple text-white border-brand-purple shadow-glow-purple'
                    : 'bg-white text-brand-dark border-brand-dark/10 hover:border-brand-purple hover:text-brand-purple'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => (
              <motion.div
                layout
                key={proj.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="h-full flex flex-col p-4 group select-none">
                  {/* Styled Gradient Visual Panel */}
                  <div className={`w-full aspect-[16/10] rounded-2xl bg-gradient-to-tr ${proj.gradient} mb-6 flex items-center justify-center relative overflow-hidden shadow-inner group-hover:shadow-glow-blue transition-all duration-500`}>
                    {/* Decorative Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                    
                    {/* Centered Sparkle Overlay */}
                    <Sparkles className="text-white/20 w-16 h-16 group-hover:scale-125 group-hover:text-white/40 transition-all duration-700" />
                    
                    {/* Interactive Preview Overlay Banner */}
                    <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                      <button
                        onClick={() => handleLivePreview(proj.title)}
                        className="px-5 py-2.5 rounded-full font-bold text-xs bg-white text-brand-dark hover:bg-brand-purple hover:text-white shadow-lg flex items-center gap-1.5 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
                      >
                        Live Demo
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2 px-2 text-left flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-extrabold text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-2.5 py-0.5 rounded-full inline-block mb-2">
                        {proj.category}
                      </span>
                      <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-purple transition-colors duration-300">
                        {proj.title}
                      </h3>
                      <p className="text-xs md:text-sm text-brand-slate leading-relaxed mt-2.5">
                        {proj.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => handleLivePreview(proj.title)}
                      className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-purple hover:text-brand-indigo self-start transition-all"
                    >
                      Explore Case Study
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default PortfolioSection;
