
import React from 'react';
import { Link } from 'react-router-dom';

export const OptimizedHeader = () => {
  return (
    <header className="bg-white fixed w-full z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo with fixed size to prevent layout shift */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/cd042a6d-b714-4ea7-928f-a2e5b6bbb855.png"
            alt="WordToImage Logo"
            width="144" 
            height="32"
            className="h-8 md:h-10 lg:h-12 object-contain"
            loading="eager" 
            decoding="async"
          />
          <span className="sr-only">WordToImage</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/features" className="hover:text-indigo-600">Features</Link>
          <Link to="/pricing" className="hover:text-indigo-600">Pricing</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth" className="text-gray-700 hover:text-indigo-600 font-medium">Sign In</Link>
          <Link 
            to="/text-to-image"
            className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition"
          >
            <span>Try AI Generator</span>
            <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};
