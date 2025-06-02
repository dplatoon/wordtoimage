
import React from 'react';
import { Link } from 'react-router-dom';

export const OptimizedHero = () => {
  return (
    <section id="hero" className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-8 pb-12 sm:pt-12 sm:pb-20 min-h-[600px]">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
          <span className="block">Transform Text into</span>
          <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Stunning Images
          </span>
          <span className="block mt-2 text-xl sm:text-2xl md:text-3xl font-medium text-cyan-300">with AI</span>
        </h1>
        
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Create beautiful AI-generated visuals from simple text descriptions.
          <span className="block mt-2 text-cyan-300 font-medium">
            No design skills required • Professional quality • Lightning fast
          </span>
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/text-to-image"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-cyan-500 hover:bg-pink-500 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Start Creating Now
            <svg className="h-5 w-5 md:h-6 md:w-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1" />
            </svg>
          </Link>
          
          <Link 
            to="/examples"
            className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg transform hover:scale-105 transition-all duration-300"
          >
            See Examples
            <svg className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </Link>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-cyan-300">
          <span className="flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>Free to try
          </span>
          <span className="flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>No credit card required
          </span>
          <span className="flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>Professional quality
          </span>
        </div>
      </div>
    </section>
  );
};
