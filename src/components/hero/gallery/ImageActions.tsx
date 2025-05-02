
import { Download, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageActionsProps {
  onDownload: () => void;
  onShare: () => void;
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

export const ImageActions = ({ 
  onDownload, 
  onShare, 
  onFavoriteToggle, 
  isFavorite 
}: ImageActionsProps) => {
  return (
    <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100">
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
          isFavorite ? 'text-red-500' : 'text-gray-700'
        }`}
        onClick={onFavoriteToggle}
        title="Favorite"
      >
        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
      </Button>
    </div>
  );
};
