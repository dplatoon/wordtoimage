
import { Button } from '@/components/ui/button';

interface GalleryHeaderProps {
  title: string;
  imageCount: number;
  onViewAllClick?: () => void;
}

export const GalleryHeader = ({ title, imageCount, onViewAllClick }: GalleryHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      {imageCount > 4 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-blue-600 hover:text-blue-800"
          onClick={onViewAllClick}
        >
          View All
        </Button>
      )}
    </div>
  );
};
