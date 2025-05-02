
import { Download, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageActionsProps {
  isVisible: boolean;
  onDownload: () => void;
  onShare: () => void;
  onFavoriteToggle: () => void;
  favorite: boolean;
}

export const ImageActions = ({ 
  isVisible,
  onDownload, 
  onShare, 
  onFavoriteToggle, 
  favorite 
}: ImageActionsProps) => {
  return (
    <div className={`absolute bottom-2 right-2 flex space-x-1 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Button
        size="icon"
        variant="secondary"
        className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow"
        onClick={onDownload}
        title="Download"
      >
        <Download className="h-4 w-4 text-gray-700" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow"
        onClick={onShare}
        title="Share"
      >
        <Share2 className="h-4 w-4 text-gray-700" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className={`h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow ${
          favorite ? 'text-red-500' : 'text-gray-700'
        }`}
        onClick={onFavoriteToggle}
        title="Favorite"
      >
        <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500' : ''}`} />
      </Button>
    </div>
  );
};
