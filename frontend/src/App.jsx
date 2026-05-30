import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import WhyChooseUs from './components/sections/WhyChooseUs';
import PortfolioSection from './components/sections/PortfolioSection';
import ProcessSection from './components/sections/ProcessSection';
import PricingSection from './components/sections/PricingSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import FAQSection from './components/sections/FAQSection';
import ContactSection from './components/sections/ContactSection';
import LoginView from './components/auth/LoginView';
import SignUpView from './components/auth/SignUpView';
import ForgotPasswordView from './components/auth/ForgotPasswordView';
import ClientDashboard from './components/dashboard/ClientDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import { Toaster } from 'react-hot-toast';
import api from './utils/api';
import toast from 'react-hot-toast';

function App() {
  const [view, setView] = useState('home'); // home, login, signup, forgot-password, dashboard, admin
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Verify auth session on load
  useEffect(() => {
    const cachedUser = localStorage.getItem('webdy_user');
    const cachedToken = localStorage.getItem('webdy_token');

    if (cachedUser && cachedToken) {
      const parsed = JSON.parse(cachedUser);
      setUser(parsed);
      
      // Verification profile query
      api.get('/auth/profile')
        .then((res) => {
          // Sync profile details if anything changed
          const syncedUser = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
            mobile: res.data.mobile,
            address: res.data.address
          };
          setUser(syncedUser);
          localStorage.setItem('webdy_user', JSON.stringify(syncedUser));
        })
        .catch((err) => {
          console.warn('Session is expired or invalid. Logging out...', err);
          handleLogout();
        });
    }
  }, []);

  // Monitor page scroll to highlight active Navbar links
  useEffect(() => {
    if (view !== 'home') return;
    const handleScroll = () => {
      const sections = ['hero', 'services', 'why-choose-us', 'pricing', 'portfolio', 'testimonials', 'process', 'faq', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  // Handle dynamic routing
  const navigateTo = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('webdy_token');
    localStorage.removeItem('webdy_user');
    setUser(null);
    toast('Session logged out successfully.', {
      icon: '🔒',
    });
    navigateTo('home');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  // Dynamic View Switcher
  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginView onLoginSuccess={handleLoginSuccess} navigateTo={navigateTo} />;
      case 'signup':
        return <SignUpView onLoginSuccess={handleLoginSuccess} navigateTo={navigateTo} />;
      case 'forgot-password':
        return <ForgotPasswordView navigateTo={navigateTo} />;
      case 'dashboard':
        return user ? (
          <ClientDashboard user={user} navigateTo={navigateTo} />
        ) : (
          <LoginView onLoginSuccess={handleLoginSuccess} navigateTo={navigateTo} />
        );
      case 'admin':
        return user && user.role === 'admin' ? (
          <AdminDashboard user={user} navigateTo={navigateTo} />
        ) : (
          <HeroSection navigateTo={navigateTo} />
        );
      case 'home':
      default:
        return (
          <>
            <HeroSection navigateTo={navigateTo} />
            <ServicesSection />
            <WhyChooseUs />
            <PricingSection />
            <PortfolioSection />
            <TestimonialsSection />
            <ProcessSection />
            <FAQSection />
            <ContactSection user={user} />
          </>
        );
    }
  };

  return (
    <div className="App font-outfit min-h-screen text-slate-800 bg-white flex flex-col justify-between selection:bg-brand-purple/20 selection:text-brand-purple">
      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Navigation */}
      <Navbar 
        activeSection={activeSection} 
        user={user} 
        onLogout={handleLogout} 
        navigateTo={navigateTo} 
      />

      {/* Main Core View Area */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Footer */}
      <Footer navigateTo={navigateTo} />
    </div>
  );
}

export default App;
