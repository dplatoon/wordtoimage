import React from 'react';

interface ToolPageBackgroundProps {
  variant?: 'primary' | 'coral' | 'green' | 'cyan' | 'amber';
}

export const ToolPageBackground: React.FC<ToolPageBackgroundProps> = ({ variant = 'primary' }) => {
  const colorVariants = {
    primary: {
      gradient: 'from-background via-background to-primary/5',
      orb1: 'bg-primary/10',
      orb2: 'bg-neon-coral/10',
    },
    coral: {
      gradient: 'from-background via-background to-neon-coral/5',
      orb1: 'bg-neon-coral/10',
      orb2: 'bg-primary/10',
    },
    green: {
      gradient: 'from-background via-background to-green-500/5',
      orb1: 'bg-green-500/10',
      orb2: 'bg-primary/10',
    },
    cyan: {
      gradient: 'from-background via-background to-neon-cyan/5',
      orb1: 'bg-neon-cyan/10',
      orb2: 'bg-primary/10',
    },
    amber: {
      gradient: 'from-background via-background to-neon-amber/5',
      orb1: 'bg-neon-amber/10',
      orb2: 'bg-primary/10',
    },
  };

  const colors = colorVariants[variant];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
      
      {/* Cyber grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyber-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        </svg>
      </div>
      
      {/* Floating orbs */}
      <div className={`absolute top-1/4 -left-20 w-96 h-96 ${colors.orb1} rounded-full blur-3xl animate-pulse-glow`} />
      <div 
        className={`absolute bottom-1/4 -right-20 w-80 h-80 ${colors.orb2} rounded-full blur-3xl animate-pulse-glow`} 
        style={{ animationDelay: '1s' }} 
      />
      <div 
        className={`absolute top-2/3 left-1/4 w-64 h-64 ${colors.orb1} rounded-full blur-3xl animate-pulse-glow opacity-50`} 
        style={{ animationDelay: '2s' }} 
      />
      
      {/* Subtle floating particles */}
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float" />
      <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-neon-coral/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
};
