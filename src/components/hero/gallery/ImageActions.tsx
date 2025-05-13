
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
    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex justify-between items-center transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Button
        variant="default"
        size="sm"
        className="bg-white/95 hover:bg-white text-gray-800 shadow-md"
        onClick={onDownload}
      >
        <Download className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Download</span>
      </Button>
      
      <div className="flex space-x-2">
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow"
          onClick={onShare}
          title="Share"
        >
          <Share2 className="h-4 w-4 text-gray-700" />
        </Button>
        
        <Button
          size="icon"
          variant="secondary"
          className={`h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow ${
            favorite ? 'text-red-500' : 'text-gray-700'
          }`}
          onClick={onFavoriteToggle}
          title="Favorite"
        >
          <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500' : ''}`} />
        </Button>
      </div>
    </div>
  );
};
