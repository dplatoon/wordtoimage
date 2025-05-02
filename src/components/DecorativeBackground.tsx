
import React from 'react';

export const DecorativeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Decorative circles */}
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 left-[10%] w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 right-[20%] w-60 h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Abstract patterns */}
      <div className="absolute top-1/4 left-[15%] w-24 h-24 border-2 border-blue-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-1/3 right-[10%] w-32 h-32 border-2 border-purple-200 rounded-full opacity-30"></div>
      <div className="absolute top-1/2 left-[25%] w-16 h-16 bg-yellow-100 rounded opacity-30"></div>
      
      {/* Dots pattern */}
      <div className="hidden lg:block absolute bottom-20 left-20 grid grid-cols-5 gap-2">
        {Array(25).fill(null).map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-blue-300 opacity-20"></div>
        ))}
      </div>
    </div>
  );
};
