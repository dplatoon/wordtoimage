import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Instagram, Twitter, Facebook, Youtube, Monitor } from 'lucide-react';

export interface SocialFormat {
  id: string;
  platform: string;
  formatName: string;
  width: number;
  height: number;
  aspectRatio: string;
  description: string;
}

const SOCIAL_FORMATS: SocialFormat[] = [
  // Instagram
  { id: 'ig-post', platform: 'instagram', formatName: 'Post', width: 1080, height: 1080, aspectRatio: '1:1', description: 'Square feed post' },
  { id: 'ig-story', platform: 'instagram', formatName: 'Story', width: 1080, height: 1920, aspectRatio: '9:16', description: 'Full-screen story' },
  { id: 'ig-reel', platform: 'instagram', formatName: 'Reel Cover', width: 1080, height: 1920, aspectRatio: '9:16', description: 'Vertical reel thumbnail' },
  { id: 'ig-landscape', platform: 'instagram', formatName: 'Landscape', width: 1080, height: 566, aspectRatio: '1.91:1', description: 'Horizontal post' },
  
  // TikTok
  { id: 'tt-video', platform: 'tiktok', formatName: 'Video', width: 1080, height: 1920, aspectRatio: '9:16', description: 'Full-screen video' },
  { id: 'tt-thumb', platform: 'tiktok', formatName: 'Thumbnail', width: 1080, height: 1920, aspectRatio: '9:16', description: 'Video thumbnail' },
  
  // Twitter/X
  { id: 'tw-post', platform: 'twitter', formatName: 'Post', width: 1200, height: 675, aspectRatio: '16:9', description: 'Tweet image' },
  { id: 'tw-header', platform: 'twitter', formatName: 'Header', width: 1500, height: 500, aspectRatio: '3:1', description: 'Profile header' },
  
  // Facebook
  { id: 'fb-post', platform: 'facebook', formatName: 'Post', width: 1200, height: 630, aspectRatio: '1.91:1', description: 'Feed post' },
  { id: 'fb-cover', platform: 'facebook', formatName: 'Cover', width: 820, height: 312, aspectRatio: '2.63:1', description: 'Page cover' },
  { id: 'fb-story', platform: 'facebook', formatName: 'Story', width: 1080, height: 1920, aspectRatio: '9:16', description: 'Full-screen story' },
  
  // YouTube
  { id: 'yt-thumb', platform: 'youtube', formatName: 'Thumbnail', width: 1280, height: 720, aspectRatio: '16:9', description: 'Video thumbnail' },
  { id: 'yt-banner', platform: 'youtube', formatName: 'Banner', width: 2560, height: 1440, aspectRatio: '16:9', description: 'Channel banner' },
  
  // General
  { id: 'gen-hd', platform: 'general', formatName: 'HD', width: 1920, height: 1080, aspectRatio: '16:9', description: 'Standard HD' },
  { id: 'gen-4k', platform: 'general', formatName: '4K', width: 3840, height: 2160, aspectRatio: '16:9', description: 'Ultra HD' },
  { id: 'gen-square', platform: 'general', formatName: 'Square', width: 1024, height: 1024, aspectRatio: '1:1', description: 'Square format' },
];

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'tiktok', label: 'TikTok', icon: Monitor },
  { id: 'twitter', label: 'Twitter/X', icon: Twitter },
  { id: 'facebook', label: 'Facebook', icon: Facebook },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'general', label: 'General', icon: Monitor },
];

interface FormatSelectorProps {
  selectedFormat: SocialFormat | null;
  onFormatSelect: (format: SocialFormat) => void;
  className?: string;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  selectedFormat,
  onFormatSelect,
  className,
}) => {
  const [activePlatform, setActivePlatform] = useState('instagram');

  const platformFormats = SOCIAL_FORMATS.filter(f => f.platform === activePlatform);

  return (
    <Card className={cn('glass-card', className)}>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Social Media Format</h3>
        
        <Tabs value={activePlatform} onValueChange={setActivePlatform}>
          <TabsList className="grid grid-cols-6 gap-1 bg-background/50 p-1" aria-label="Social media platforms">
            {PLATFORMS.map((platform) => (
              <TabsTrigger
                key={platform.id}
                value={platform.id}
                aria-label={platform.label}
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-2 py-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <platform.icon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{platform.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {PLATFORMS.map((platform) => (
            <TabsContent key={platform.id} value={platform.id} className="mt-3">
              <div className="grid grid-cols-2 gap-2">
                {SOCIAL_FORMATS.filter(f => f.platform === platform.id).map((format) => (
                  <button
                    key={format.id}
                    onClick={() => onFormatSelect(format)}
                    aria-pressed={selectedFormat?.id === format.id}
                    aria-label={`${format.formatName} format, ${format.aspectRatio} ratio, ${format.width} by ${format.height} pixels`}
                    className={cn(
                      'p-3 rounded-lg border text-left transition-all duration-200',
                      'hover:border-primary/50 hover:bg-primary/5',
                      'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      selectedFormat?.id === format.id
                        ? 'border-primary bg-primary/10 shadow-neon'
                        : 'border-border/50 bg-background/30'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-foreground">
                        {format.formatName}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {format.aspectRatio}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{format.description}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1" aria-hidden="true">
                      {format.width} × {format.height}
                    </p>
                  </button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedFormat && (
          <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-foreground">
              Selected: <span className="font-medium">{selectedFormat.formatName}</span>
              <span className="text-muted-foreground ml-2">
                ({selectedFormat.width} × {selectedFormat.height})
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormatSelector;
