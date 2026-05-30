import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = ({ activeSection, user, onLogout, navigateTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'why-choose-us', label: 'Why Us' },
    { id: 'pricing', label: 'Pricing Plans' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'process', label: 'Process' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    navigateTo('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 glass-card shadow-lg bg-white/80 dark:bg-brand-dark/80 border-b border-white/20'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleLinkClick('hero')}
        >
          <span className="text-3xl font-extrabold text-gradient-purple-blue tracking-tight select-none">
            Webdy
          </span>
          <span className="w-2 h-2 rounded-full bg-brand-electric animate-ping" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 hover:text-brand-purple cursor-pointer ${
                    activeSection === link.id
                      ? 'text-brand-purple'
                      : 'text-brand-dark/70 hover:opacity-100'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <span className="w-px h-6 bg-brand-dark/10" />

          {/* Auth CTA Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateTo(user.role === 'admin' ? 'admin' : 'dashboard')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-full bg-gradient-to-r from-brand-purple to-brand-blue hover:shadow-glow-purple transition-all duration-300"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </button>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 text-brand-dark/60 hover:text-red-500 rounded-full hover:bg-red-50 transition-all duration-300"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigateTo('login')}
                  className="text-sm font-bold text-brand-dark/80 hover:text-brand-purple transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => navigateTo('signup')}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-brand-dark hover:bg-brand-purple rounded-full transition-all duration-300 shadow-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Burger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-brand-dark hover:text-brand-purple transition-all"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-brand-dark/5 shadow-2xl py-6 px-8 flex flex-col gap-6 animate-fade-in-down">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left w-full py-2 text-base font-bold text-brand-dark/80 hover:text-brand-purple transition-all"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          
          <span className="w-full h-px bg-brand-dark/5" />

          {/* Mobile Auth CTAs */}
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo(user.role === 'admin' ? 'admin' : 'dashboard');
                  }}
                  className="w-full py-3 flex items-center justify-center gap-2 font-bold text-white bg-gradient-to-r from-brand-purple to-brand-blue rounded-full shadow-md"
                >
                  <LayoutDashboard size={18} />
                  Dashboard Portal
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-3 flex items-center justify-center gap-2 font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-full"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('login');
                  }}
                  className="w-full py-3 font-bold text-brand-dark border border-brand-dark/10 rounded-full"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('signup');
                  }}
                  className="w-full py-3 font-bold text-white bg-brand-purple hover:bg-brand-indigo rounded-full shadow-md"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
