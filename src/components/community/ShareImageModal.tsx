import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Share2, Users, Eye, Heart } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ShareImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  prompt: string;
  imageId?: string;
}

export const ShareImageModal = ({ isOpen, onClose, imageUrl, prompt, imageId }: ShareImageModalProps) => {
  const { user } = useAuth();
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!user) {
      toast.error('Please sign in to share images');
      return;
    }

    setLoading(true);
    try {
      if (imageId) {
        // Update existing image
        const { error } = await supabase
          .from('image_generations')
          .update({ is_public: isPublic })
          .eq('id', imageId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new public image entry (for images without database entries)
        const { error } = await supabase
          .from('image_generations')
          .insert({
            image_url: imageUrl,
            prompt,
            user_id: user.id,
            is_public: isPublic,
            plan: 'free'
          });

        if (error) throw error;
      }

      toast.success(isPublic ? 'Image shared to community!' : 'Image made private');
      onClose();
    } catch (error) {
      console.error('Error sharing image:', error);
      toast.error('Failed to update sharing settings');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/community-gallery`);
    toast.success('Community gallery link copied!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share to Community
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Preview */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={prompt}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white text-sm font-medium line-clamp-2">
                {prompt}
              </p>
            </div>
          </div>

          {/* Sharing Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="public-toggle" className="text-sm font-medium">
                  Share to Community Gallery
                </Label>
                <p className="text-xs text-gray-500">
                  Make this image visible to other users
                </p>
              </div>
              <Switch
                id="public-toggle"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>

            {isPublic && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Community Benefits
                  </span>
                </div>
                <div className="space-y-1 text-xs text-blue-700">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>Get views and exposure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>Receive likes from the community</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge className="h-3 w-3" />
                    <span>Chance to be featured</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleShare}
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Updating...' : isPublic ? 'Share to Community' : 'Keep Private'}
            </Button>
            <Button
              variant="outline"
              onClick={handleCopyLink}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Copy Gallery Link
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            You can change these settings anytime from your dashboard
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};