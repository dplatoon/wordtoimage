
export const AIThemeBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* AI Neural Network Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="absolute inset-0">
          <defs>
            <pattern id="neuralPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-brand-navy" opacity="0.3" />
              <circle cx="80" cy="40" r="1.5" fill="currentColor" className="text-brand-purple" opacity="0.2" />
              <circle cx="50" cy="70" r="2.5" fill="currentColor" className="text-brand-teal" opacity="0.25" />
              <line x1="20" y1="20" x2="80" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-brand-navy" opacity="0.1" />
              <line x1="80" y1="40" x2="50" y2="70" stroke="currentColor" strokeWidth="0.5" className="text-brand-purple" opacity="0.1" />
              <line x1="50" y1="70" x2="20" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-brand-teal" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neuralPattern)" />
        </svg>
      </div>

      {/* Animated Gradient Orbs - Using CSS animations */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-brand-navy/10 to-brand-purple/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-brand-teal/10 to-brand-coral/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating AI Particles - Using CSS animations */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-brand-teal rounded-full opacity-40 animate-pulse"
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i * 10)}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i}s`
          }}
        />
      ))}
    </div>
  );
};
