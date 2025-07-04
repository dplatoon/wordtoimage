import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Share2, 
  Heart, 
  Download, 
  Copy, 
  Twitter, 
  Facebook, 
  Instagram,
  Globe,
  Lock,
  Tag,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/utils/analytics';

interface EnhancedImageSharingProps {
  imageUrl: string;
  prompt: string;
  style?: string;
  imageId: string;
  onClose?: () => void;
}

export const EnhancedImageSharing = ({ 
  imageUrl, 
  prompt, 
  style, 
  imageId, 
  onClose 
}: EnhancedImageSharingProps) => {
  const [description, setDescription] = useState(prompt);
  const [tags, setTags] = useState<string[]>(style ? [style] : []);
  const [tagInput, setTagInput] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [allowDownloads, setAllowDownloads] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 10) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleShareToCommunity = async () => {
    setIsSharing(true);
    try {
      const { data, error } = await supabase
        .from('image_generations')
        .update({
          is_public: isPublic,
          prompt: description,
          // Note: We'd need to add tags column to the database
        })
        .eq('id', imageId)
        .select();

      if (error) throw error;

      trackEvent({
        action: 'image_shared_to_community',
        category: 'social',
        label: 'community_share',
        custom_parameters: {
          image_id: imageId,
          is_public: isPublic,
          tags_count: tags.length
        }
      });

      toast.success('Image shared to community successfully!');
      onClose?.();
    } catch (error) {
      console.error('Error sharing to community:', error);
      toast.error('Failed to share to community');
    } finally {
      setIsSharing(false);
    }
  };

  const handleSocialShare = (platform: string) => {
    const shareText = `Check out my AI-generated artwork: ${description}`;
    const shareUrl = window.location.origin + `/gallery/${imageId}`;

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      instagram: shareUrl // Instagram doesn't support direct sharing URLs
    };

    if (platform === 'instagram') {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied! Open Instagram and paste in your story or post.');
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }

    trackEvent({
      action: 'image_shared_social',
      category: 'social',
      label: platform,
      custom_parameters: { image_id: imageId }
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/gallery/${imageId}`);
      toast.success('Link copied to clipboard!');
      
      trackEvent({
        action: 'share_link_copied',
        category: 'social',
        label: 'copy_link'
      });
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleDownloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-art-${imageId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      trackEvent({
        action: 'image_downloaded',
        category: 'engagement',
        label: 'download'
      });

      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  return (
    <div className="space-y-6">
      {/* Image Preview */}
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={imageUrl} 
          alt="Generated artwork" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-end p-4">
          <div className="text-white">
            <p className="text-sm font-medium">{prompt}</p>
            {style && (
              <Badge variant="secondary" className="mt-1">
                {style}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Description & Tags */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for your artwork..."
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex gap-2 mt-1 mb-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add tags..."
              className="flex-1"
            />
            <Button onClick={handleAddTag} size="sm">
              <Tag className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="cursor-pointer hover:bg-red-100"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Privacy & Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              <Label htmlFor="public">Make public in community gallery</Label>
            </div>
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <Label htmlFor="downloads">Allow downloads</Label>
            </div>
            <Switch
              id="downloads"
              checked={allowDownloads}
              onCheckedChange={setAllowDownloads}
            />
          </div>
        </CardContent>
      </Card>

      {/* Share Actions */}
      <div className="space-y-4">
        <Button 
          onClick={handleShareToCommunity}
          disabled={isSharing}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Users className="h-4 w-4 mr-2" />
          {isSharing ? 'Sharing...' : 'Share to Community'}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={() => handleSocialShare('twitter')}
            className="flex items-center gap-2"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleSocialShare('facebook')}
            className="flex items-center gap-2"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleSocialShare('instagram')}
            className="flex items-center gap-2"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleCopyLink}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy Link
          </Button>
        </div>

        <Button 
          variant="ghost" 
          onClick={handleDownloadImage}
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Image
        </Button>
      </div>
    </div>
  );
};