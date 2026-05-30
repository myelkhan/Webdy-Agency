import React from 'react';

const GlassCard = ({ children, className = '', hoverGlow = true, onClick = null }) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-3xl p-6 md:p-8 transition-all duration-500 border border-white/30 ${
        hoverGlow
          ? 'hover:bg-white/90 hover:shadow-glass-hover hover:-translate-y-1.5'
          : 'shadow-glass'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
