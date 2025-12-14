
import { useEffect } from 'react';

export const CursorTrail = () => {
  useEffect(() => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    const points: { x: number; y: number; alpha: number; dx: number; dy: number; }[] = [];
    const TRAIL_LENGTH = 20;
    const POINT_LIFE = 40;
    
    const addPoint = (x: number, y: number) => {
      points.push({ x, y, alpha: 1, dx: 0, dy: 0 });
      if (points.length > TRAIL_LENGTH) points.shift();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      addPoint(clientX, clientY);
      
      // Clear existing points safely
      while (trail.firstChild) {
        trail.removeChild(trail.firstChild);
      }
      
      // Create DOM elements safely to prevent XSS
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const size = Math.max(1, (i / points.length) * 10);
        const alpha = (i / points.length) * 0.3;
        
        const div = document.createElement('div');
        div.className = 'point';
        div.style.left = `${point.x}px`;
        div.style.top = `${point.y}px`;
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        div.style.opacity = String(alpha);
        trail.appendChild(div);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add the required CSS
    const style = document.createElement('style');
    style.textContent = `
      .cursor-trail {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
      }
      .cursor-trail .point {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(45deg, #4f46e5, #8b5cf6);
        transform: translate(-50%, -50%);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(trail);
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};
