import React, { useEffect, useState, useRef } from 'react';
import { 
  Zap, 
  Monitor, 
  Search, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  TrendingUp, 
  Layers 
} from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion, useInView } from 'framer-motion';

// Stateful Animated Counter component for high-end feel
const AnimatedCounter = ({ value, suffix = '', duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    if (incrementTime < 10) incrementTime = 10; // Throttle min interval

    let timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-extrabold tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Fast Loading Websites',
      desc: 'Optimized from core assets for speeds that retain visitors, boost sales, and lower bounce rates.',
      icon: Zap,
      accent: 'text-amber-500 bg-amber-50'
    },
    {
      title: 'Fully Responsive Design',
      desc: 'Flawless presentation and perfect interactivity across mobiles, tablets, laptops, and 4K displays.',
      icon: Monitor,
      accent: 'text-blue-500 bg-blue-50'
    },
    {
      title: 'SEO Friendly Structure',
      desc: 'Engineered with proper schema markups, clean tags, and layout paths for instant indexing on Google.',
      icon: Search,
      accent: 'text-emerald-500 bg-emerald-50'
    },
    {
      title: 'Premium UI/UX Quality',
      desc: 'Harmonious custom styling, outfits fonts, responsive grids, and framer animations that build trust.',
      icon: Layers,
      accent: 'text-purple-500 bg-purple-50'
    },
    {
      title: 'Secure Development',
      desc: 'Rigorous SSL protocols, server configurations, secure forms, and complete protection from breaches.',
      icon: ShieldCheck,
      accent: 'text-red-500 bg-red-50'
    },
    {
      title: 'Modern Technologies',
      desc: 'Powered by industry leaders: React, Node, Express, MongoDB, Tailwind, and cutting edge engines.',
      icon: Cpu,
      accent: 'text-cyan-500 bg-cyan-50'
    },
    {
      title: '24/7 Priority Support',
      desc: 'Constant monitoring, fast updates, and active engineer response lines to secure operations.',
      icon: Clock,
      accent: 'text-pink-500 bg-pink-50'
    },
    {
      title: 'Scalable Architecture',
      desc: 'Written in clean modular structures, ready to absorb traffic growth and adapt to feature upgrades.',
      icon: TrendingUp,
      accent: 'text-indigo-500 bg-indigo-50'
    }
  ];

  const stats = [
    { number: '150', label: 'Launch Successes', suffix: '+' },
    { number: '99', label: 'Speed Index Score', suffix: '%' },
    { number: '100', label: 'Satisfied Clients', suffix: '%' },
    { number: '24', label: 'Live Server Support', suffix: '/7' }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-white relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider">
            Webdy Advantages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
            Engineered for Digital Performance and Business Growth
          </h2>
          <p className="text-sm md:text-base text-brand-slate">
            We don't just build sites; we build speed-optimized, premium marketing engines that drive scalable enterprise conversions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <GlassCard className="h-full flex flex-col justify-between items-start gap-6 border border-brand-dark/5 p-6 hover:shadow-lg">
                  <div className="space-y-4 text-left">
                    {/* Feature Icon */}
                    <div className={`p-3 rounded-2xl inline-block ${feat.accent} border border-brand-dark/5 shadow-sm`}>
                      <IconComponent size={20} />
                    </div>
                    {/* Content */}
                    <h3 className="text-base md:text-lg font-bold text-brand-dark">{feat.title}</h3>
                    <p className="text-xs md:text-sm text-brand-slate leading-relaxed">{feat.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Metrics/Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-purple to-brand-blue text-white shadow-2xl relative overflow-hidden">
          {/* Subtle lighting lines inside stats */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[60px]" />
          
          {stats.map((stat, idx) => (
            <div key={stat.label} className="text-center space-y-1 relative z-10">
              <p className="text-4xl md:text-5xl lg:text-6xl font-black">
                <AnimatedCounter value={stat.number} suffix={stat.suffix} />
              </p>
              <p className="text-xs md:text-sm font-medium opacity-80 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
