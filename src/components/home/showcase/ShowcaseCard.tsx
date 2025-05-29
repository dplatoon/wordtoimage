
import { Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShowcaseItem {
  id: number;
  imageUrl: string;
  prompt: string;
  style: string;
  author: string;
  likes: number;
}

interface ShowcaseCardProps {
  item: ShowcaseItem;
  isHovered: boolean;
  altText: string;
}

export const ShowcaseCard = ({ item, isHovered, altText }: ShowcaseCardProps) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={item.imageUrl}
          alt={altText}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Overlay with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        />
        
        {/* Content overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-6 text-white"
        >
          <p className="text-sm font-medium mb-2 line-clamp-2">{item.prompt}</p>
          <div className="text-xs text-gray-300">Style: {item.style}</div>
        </motion.div>
      </div>
      
      {/* Card footer */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{item.author}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Heart className="h-4 w-4" />
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
