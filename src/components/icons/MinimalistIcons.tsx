
import React from 'react';

interface IconProps {
  className?: string;
}

export const Speed = ({ className = "" }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m8 14.5 4-9 4 9" />
    <path d="M8.8 16.5h6.4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const Quality = ({ className = "" }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2v4" />
    <path d="m4.93 4.93 2.83 2.83" />
    <path d="M2 12h4" />
    <path d="m4.93 19.07 2.83-2.83" />
    <path d="M12 18v4" />
    <path d="m19.07 19.07-2.83-2.83" />
    <path d="M18 12h4" />
    <path d="m19.07 4.93-2.83 2.83" />
    <circle cx="12" cy="12" r="5" />
  </svg>
);

export const EaseOfUse = ({ className = "" }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
