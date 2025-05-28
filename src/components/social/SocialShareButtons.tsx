
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Link2 } from 'lucide-react';
import { toast } from 'sonner';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  showCopyLink?: boolean;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'WordToImage - AI Image Generator',
  description = 'Create stunning AI-generated images from text prompts',
  className = '',
  showCopyLink = true,
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {navigator.share && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      )}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="text-blue-500 hover:bg-blue-50"
      >
        Twitter
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="text-blue-600 hover:bg-blue-50"
      >
        Facebook
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="text-blue-700 hover:bg-blue-50"
      >
        LinkedIn
      </Button>
      
      {showCopyLink && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="flex items-center gap-2"
        >
          <Link2 className="h-4 w-4" />
          Copy
        </Button>
      )}
    </div>
  );
};
