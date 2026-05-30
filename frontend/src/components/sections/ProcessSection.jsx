import React from 'react';
import { 
  Compass, 
  Map, 
  Layers, 
  Code, 
  ShieldAlert, 
  PartyPopper 
} from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion } from 'framer-motion';

const ProcessSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Consultation',
      desc: 'We kick-off with a collaborative session to discover your business goals, target demographics, functional requirements, and brand preferences.',
      icon: Compass,
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      step: '02',
      title: 'Planning',
      desc: 'Our strategy team outlines a granular roadmap, structures sitemaps, aligns wireframes, and compiles complete technology stack selections.',
      icon: Map,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      step: '03',
      title: 'Design',
      desc: 'We craft stunning, responsive, high-fidelity UI designs with custom electric gradients, modern outfits fonts, and glassmorphic micro-mockups.',
      icon: Layers,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      step: '04',
      title: 'Development',
      desc: 'Our elite engineering team builds your product using clean, modular React components, custom Tailwind utility tags, and robust database layers.',
      icon: Code,
      gradient: 'from-pink-500 to-red-500'
    },
    {
      step: '05',
      title: 'Testing',
      desc: 'We run deep audit scripts to check cross-device compatibility, accessibility requirements, security vulnerability checks, and drop load times under 1 second.',
      icon: ShieldAlert,
      gradient: 'from-red-500 to-amber-500'
    },
    {
      step: '06',
      title: 'Launch',
      desc: 'We execute complete server configurations, launch domains, configure hosting ready files, and provide custom analytics/admin operations.',
      icon: PartyPopper,
      gradient: 'from-amber-500 to-emerald-500'
    }
  ];

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider">
            Our Strategy
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
            Our 6-Step Digital Product Workflow
          </h2>
          <p className="text-sm md:text-base text-brand-slate">
            We follow a rigorous engineering, architectural, and design model to deliver flawless web products on time, every time.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {/* Subtle grid connectors (rendered on desktop screens) */}
          <div className="hidden lg:block absolute inset-y-12 left-1/3 right-1/3 border-t border-brand-dark/5 pointer-events-none" />

          {steps.map((st, idx) => {
            const IconComponent = st.icon;
            return (
              <motion.div
                key={st.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <GlassCard className="h-full flex flex-col justify-between items-start gap-8 relative group p-8">
                  {/* Step Tag */}
                  <div className="flex justify-between items-center w-full">
                    <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-brand-purple/25 to-brand-blue/25">
                      {st.step}
                    </span>
                    {/* Floating Icon inside gradients */}
                    <div className={`p-3 rounded-2xl bg-gradient-to-tr ${st.gradient} text-white shadow-md relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <IconComponent size={20} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-3 text-left">
                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-purple transition-colors duration-300">
                      {st.title}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-slate leading-relaxed">
                      {st.desc}
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

export default ProcessSection;
