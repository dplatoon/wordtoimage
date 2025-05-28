
import { Sparkles, Palette, Image, Brush } from 'lucide-react';

export function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced gradient backgrounds */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-100/60 to-blue-100/60 rounded-full opacity-40 blur-3xl animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-100/60 to-indigo-100/60 rounded-full opacity-40 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full opacity-30 blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      
      {/* Subtle creative icons scattered around */}
      <Sparkles className="absolute top-20 right-20 h-6 w-6 text-violet-300/50 animate-pulse" style={{ animationDelay: '1s' }} />
      <Palette className="absolute bottom-32 left-20 h-8 w-8 text-blue-300/40 animate-pulse" style={{ animationDelay: '3s' }} />
      <Image className="absolute top-1/3 left-16 h-5 w-5 text-indigo-300/50 animate-pulse" style={{ animationDelay: '2s' }} />
      <Brush className="absolute bottom-1/4 right-16 h-6 w-6 text-purple-300/40 animate-pulse" style={{ animationDelay: '4s' }} />
      
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #8b5cf6 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>
    </div>
  );
}
