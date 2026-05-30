import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import GlassCard from '../GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: 'What technologies does Webdy use?',
      a: 'We build our frontend products using React, Next.js, and Tailwind CSS. The backend operations run on Node.js/Express with secure MongoDB databases for flawless speed and safety.'
    },
    {
      q: 'How long does a website take to build?',
      a: 'Landing pages and simple portfolios take about 3-5 days. Complex business portfolios take 1-2 weeks, while custom SaaS databases or full-scale web applications take 3-4 weeks.'
    },
    {
      q: 'Will my website be mobile-friendly and responsive?',
      a: 'Yes, 100%. Every single project we build is fully engineered to be responsive and highly interactive across all mobile, tablet, laptop, and large-screen display ratios.'
    },
    {
      q: 'How do you ensure high speeds and loading performances?',
      a: 'We run complete code optimization, minimize structural packages, compress design graphics to WebP formats, load cache parameters, and hook the application onto Vercel/CDN gateways.'
    },
    {
      q: 'Can I manage content and updates myself?',
      a: 'Absolutely. We build custom admin dashboard interfaces (included in Premium Plus) so you can edit pages, moderate submissions, write blogs, and track live analytical metrics.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-brand-light relative overflow-hidden">
      {/* Subtle blurs */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider">
            Common Inquiries
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base text-brand-slate">
            Have questions about budgets, roadmaps, security, or technologies? We have answers.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div
                  onClick={() => toggleFAQ(idx)}
                  className={`glass-card rounded-2xl p-6 transition-all duration-300 border cursor-pointer select-none border-brand-dark/5 hover:border-brand-purple/30 ${
                    isOpen ? 'bg-white shadow-md' : 'hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <HelpCircle size={18} className="text-brand-purple shrink-0" />
                      <h3 className="text-sm md:text-base font-bold text-brand-dark text-left">
                        {faq.q}
                      </h3>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-brand-slate transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-brand-purple' : ''
                      }`}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-brand-dark/5 mt-4 text-xs md:text-sm text-brand-slate text-left leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
