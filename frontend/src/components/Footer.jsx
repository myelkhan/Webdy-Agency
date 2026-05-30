import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Heart, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Footer = ({ navigateTo }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('🎉 Welcome to the Webdy elite newsletter list!');
    setEmail('');
  };

  const handleLinkClick = (id) => {
    navigateTo('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <footer className="relative bg-brand-dark text-white pt-20 pb-8 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
        {/* Brand Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick('hero')}>
            <span className="text-3xl font-extrabold text-gradient-purple-blue tracking-tight">Webdy</span>
            <span className="w-2 h-2 rounded-full bg-brand-electric animate-ping" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Webdy creates modern, fast, responsive, and visually stunning websites that build businesses. We turn visitors into high-value customers.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/webdy.agency/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 rounded-full hover:bg-gradient-to-tr hover:from-pink-500 hover:to-violet-600 transition-all duration-300 group"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a
              href="https://wa.me/918279310322"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 rounded-full hover:bg-green-500 transition-all duration-300 group"
            >
              <MessageCircle size={18} className="group-hover:scale-110" />
            </a>
            <a
              href="mailto:webdyagency@gmail.com"
              className="p-2 bg-white/5 rounded-full hover:bg-brand-blue transition-all duration-300 group"
            >
              <Mail size={18} className="group-hover:scale-110" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-brand-electric">Quick Links</h3>
          <ul className="space-y-3">
            {['hero', 'services', 'pricing', 'portfolio', 'testimonials', 'faq'].map((link) => (
              <li key={link}>
                <button
                  onClick={() => handleLinkClick(link)}
                  className="text-gray-400 hover:text-white text-sm transition-colors text-left capitalize"
                >
                  {link === 'hero' ? 'Home' : link.replace(/-/g, ' ')}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Showcase */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-brand-electric">Our Core Services</h3>
          <ul className="space-y-3">
            {[
              'Business Website Development',
              'Portfolio Websites',
              'E-Commerce Websites',
              'Landing Pages',
              'UI/UX Design',
              'Custom Web Applications'
            ].map((srv) => (
              <li key={srv}>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="text-gray-400 hover:text-white text-sm transition-colors text-left"
                >
                  {srv}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-3 text-brand-electric">Subscribe</h3>
            <p className="text-gray-400 text-xs mb-4">
              Get the latest web design insights and high-tech strategies.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-brand-purple text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-1 p-2 bg-brand-purple hover:bg-brand-violet hover:shadow-glow-purple rounded-full text-white transition-all duration-300"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <MapPin size={14} className="text-brand-purple" />
              <span>Delhi, IN</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <Mail size={14} className="text-brand-purple" />
              <span>webdyagency@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <Phone size={14} className="text-brand-purple" />
              <span>+91 8279310322</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} Webdy Digital Agency. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Made with <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" /> in Delhi, India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
