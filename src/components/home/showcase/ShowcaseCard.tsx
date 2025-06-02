
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { defaultFallbackImage } from '@/utils/imageUtils';

interface ShowcaseCardProps {
  item: {
    id: number;
    imageUrl: string;
    prompt: string;
    style: string;
    author: string;
    likes: number;
  };
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ShowcaseCard = ({ 
  item, 
  index, 
  isHovered,
  onMouseEnter,
  onMouseLeave 
}: ShowcaseCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log('Failed to load image:', item.imageUrl);
    setImageError(true);
  };

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative overflow-hidden rounded-xl aspect-square cursor-pointer group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.img
        src={imageError ? defaultFallbackImage : item.imageUrl}
        alt={item.prompt}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        onError={handleImageError}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-medium">{item.prompt}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm bg-purple-500 bg-opacity-40 rounded-full px-3 py-1 w-fit">
            {item.style}
          </span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-red-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-xs">{item.likes}</span>
          </div>
        </div>
        <div className="mt-2 text-sm opacity-80">by {item.author}</div>
        
        {isHovered && (
          <motion.div 
            className="absolute bottom-6 right-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            <Button 
              size="sm" 
              className="bg-white/30 backdrop-blur-sm text-white hover:bg-white/50"
              onClick={(e) => {
                e.stopPropagation();
                window.open(imageError ? defaultFallbackImage : item.imageUrl, '_blank');
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
