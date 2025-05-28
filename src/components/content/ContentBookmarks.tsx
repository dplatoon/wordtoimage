
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';

interface ContentBookmarksProps {
  contentId: string;
  contentType: string;
  title: string;
  url?: string;
}

export const ContentBookmarks: React.FC<ContentBookmarksProps> = ({
  contentId,
  contentType,
  title,
  url = window.location.href,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if content is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('wordtoimage_bookmarks') || '[]');
    setIsBookmarked(bookmarks.some((bookmark: any) => bookmark.id === contentId));
  }, [contentId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('wordtoimage_bookmarks') || '[]');
    
    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter((bookmark: any) => bookmark.id !== contentId);
      localStorage.setItem('wordtoimage_bookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      toast.success('Removed from bookmarks');
      
      trackEvent({
        action: 'content_unbookmarked',
        category: 'engagement',
        label: contentType,
        custom_parameters: { content_id: contentId },
      });
    } else {
      // Add bookmark
      const newBookmark = {
        id: contentId,
        type: contentType,
        title,
        url,
        dateAdded: new Date().toISOString(),
      };
      bookmarks.push(newBookmark);
      localStorage.setItem('wordtoimage_bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast.success('Added to bookmarks');
      
      trackEvent({
        action: 'content_bookmarked',
        category: 'engagement',
        label: contentType,
        custom_parameters: { content_id: contentId },
      });
    }
  };

  return (
    <Button
      variant={isBookmarked ? 'default' : 'outline'}
      size="sm"
      onClick={toggleBookmark}
      className="flex items-center gap-2"
    >
      <Bookmark 
        className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} 
      />
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </Button>
  );
};
