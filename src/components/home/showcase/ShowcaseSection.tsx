
import React, { useState } from 'react';
import { ShowcaseGrid } from './ShowcaseGrid';
import { ShowcaseHeader } from './ShowcaseHeader';
import { ShowcaseMobileCarousel } from './ShowcaseMobileCarousel';
import { useIsMobile } from '@/hooks/use-mobile';

export const ShowcaseSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const showcaseItems = [
    {
      id: 1,
      imageUrl: "/lovable-uploads/ac5f5c36-57ec-4d3a-bc16-9417429df2f5.png",
      prompt: "A futuristic cyberpunk city street with neon signs and holographic displays, rain-soaked pavement reflecting colorful lights",
      style: "Cyberpunk",
      author: "AI Artist",
      likes: 1247
    },
    {
      id: 2,
      imageUrl: "/lovable-uploads/de5bb020-5171-43d5-ad88-09fdcbfeb83c.png",
      prompt: "Mystical fantasy forest with ancient trees, magical blue moonlight, and ethereal atmosphere with glowing elements",
      style: "Fantasy Art",
      author: "Creative Studio",
      likes: 892
    },
    {
      id: 3,
      imageUrl: "/lovable-uploads/f2c75793-3403-43ad-8f94-917cc71fde95.png",
      prompt: "Abstract geometric composition with vibrant colors, overlapping shapes, and dynamic angular patterns in red, blue, and orange",
      style: "Abstract Digital",
      author: "Digital Creator",
      likes: 756
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader />
        
        {isMobile ? (
          <ShowcaseMobileCarousel 
            items={showcaseItems}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ) : (
          <ShowcaseGrid 
            items={showcaseItems}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        )}
      </div>
    </section>
  );
};
