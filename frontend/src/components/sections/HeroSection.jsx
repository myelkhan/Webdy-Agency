import React, { useEffect, useRef } from 'react';
import { Rocket, Code, Lightbulb, Zap, Star, Shield, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = ({ navigateTo }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const particleCount = 40;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#7c3aed';
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw network lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleServicesClick = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStartedClick = () => {
    navigateTo('signup');
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-white">
      {/* Dynamic Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Modern Neon Blurs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none animate-spin-slow" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20 w-full">
        
        {/* Left Headline Column */}
        <div className="lg:col-span-7 text-left space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider"
          >
            <Star size={12} className="fill-brand-purple" />
            Voted #1 Development Agency
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight tracking-tight text-brand-dark"
          >
            Build <span className="text-gradient-purple-blue">Stunning Websites</span> That Convert Visitors Into Customers
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-brand-slate max-w-xl leading-relaxed"
          >
            Webdy creates modern, fast, responsive, and visually stunning websites for businesses that want to grow online. Partner with us for a premium digital upgrade.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <button
              onClick={handleGetStartedClick}
              className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-brand-purple to-brand-blue hover:shadow-glow-purple transition-all duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
            >
              Get Started
              <Rocket size={18} />
            </button>
            <button
              onClick={handleServicesClick}
              className="px-8 py-4 rounded-full font-bold text-brand-dark border border-brand-dark/10 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-brand-purple transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              View Services
              <Play size={14} className="fill-brand-dark" />
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="pt-6 flex flex-wrap gap-6 border-t border-brand-dark/5"
          >
            <div className="flex items-center gap-2 text-xs text-brand-slate font-semibold">
              <Shield size={16} className="text-brand-purple" />
              <span>SSL Secure Code</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-slate font-semibold">
              <Zap size={16} className="text-brand-purple" />
              <span>99+ PageSpeed Score</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-slate font-semibold">
              <Star size={16} className="text-brand-purple fill-brand-purple" />
              <span>5.0 Client Rating</span>
            </div>
          </motion.div>
        </div>

        {/* Right Graphic Mockup Column */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Animated Floating Badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute top-8 -left-8 p-3 rounded-2xl glass-card flex items-center gap-2.5 z-30 shadow-md pointer-events-none"
          >
            <div className="p-2 bg-purple-100 rounded-xl text-brand-purple">
              <Code size={18} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-brand-slate uppercase font-extrabold tracking-wider">Clean Code</p>
              <p className="text-xs font-bold text-brand-dark">Tailwind & React</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute bottom-10 -right-4 p-3 rounded-2xl glass-card flex items-center gap-2.5 z-30 shadow-md pointer-events-none"
          >
            <div className="p-2 bg-cyan-100 rounded-xl text-brand-cyan">
              <Rocket size={18} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-brand-slate uppercase font-extrabold tracking-wider">Deployment</p>
              <p className="text-xs font-bold text-brand-dark">Launch Ready</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-2 p-2.5 rounded-2xl glass-card flex items-center gap-2 z-30 shadow-sm pointer-events-none"
          >
            <div className="p-1.5 bg-yellow-100 rounded-xl text-yellow-500">
              <Lightbulb size={16} />
            </div>
            <span className="text-[11px] font-bold text-brand-dark">Ultra UI/UX Design</span>
          </motion.div>

          {/* Premium Device Viewport (Laptop Mockup) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[440px] aspect-[4/3] rounded-3xl p-3 bg-gradient-to-tr from-brand-purple/10 to-brand-blue/10 border border-brand-purple/20 shadow-2xl relative"
          >
            {/* Inner viewport screen */}
            <div className="w-full h-full rounded-2xl bg-brand-dark overflow-hidden flex flex-col shadow-inner relative border border-white/10">
              {/* Top window tabs bar */}
              <div className="h-7 bg-slate-900 border-b border-brand-dark/20 flex items-center justify-between px-4">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono select-none">webdy.js</span>
                <span className="w-6" />
              </div>
              
              {/* Simulated Code Panel */}
              <div className="flex-1 p-4 font-mono text-[10px] md:text-xs text-left text-slate-300 leading-relaxed overflow-hidden">
                <p className="text-pink-400 font-semibold"><span className="text-blue-400">import</span> React, &#123; useState &#125; <span className="text-blue-400">from</span> <span className="text-green-400">'react'</span>;</p>
                <p className="text-slate-500">// Initialize Webdy Modern Experience</p>
                <p className="text-purple-400"><span className="text-blue-400">const</span> <span className="text-yellow-400">WebdyAgency</span> = () =&gt; &#123;</p>
                <p className="pl-4"><span className="text-blue-400">const</span> [growth, setGrowth] = <span className="text-yellow-400">useState</span>(<span className="text-green-400">"10x"</span>);</p>
                <p className="pl-4 text-purple-400"><span className="text-blue-400">return</span> (</p>
                <p className="pl-8 text-blue-400">&lt;<span className="text-orange-400">BrandContainer</span>&gt;</p>
                <p className="pl-12 text-slate-400">&lt;<span className="text-orange-400">Header</span>&gt;Stunning UI&lt;/<span className="text-orange-400">Header</span>&gt;</p>
                <p className="pl-12 text-slate-400">&lt;<span className="text-orange-400">Stats</span> multiplier=&#123;growth&#125; /&gt;</p>
                <p className="pl-8 text-blue-400">&lt;/<span className="text-orange-400">BrandContainer</span>&gt;</p>
                <p className="pl-4 text-purple-400">);</p>
                <p className="text-purple-400">&#125;;</p>
                
                {/* Visual interface mockup widget */}
                <div className="mt-4 p-2.5 rounded-xl bg-white text-brand-dark font-sans flex items-center justify-between shadow-lg">
                  <div className="space-y-1">
                    <div className="w-16 h-1.5 rounded bg-brand-purple" />
                    <div className="w-12 h-1 rounded bg-slate-200" />
                  </div>
                  <div className="px-3 py-1 text-[8px] font-bold text-white rounded bg-brand-blue">Interactive UI</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
