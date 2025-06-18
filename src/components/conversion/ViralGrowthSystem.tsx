
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Share2, 
  Twitter, 
  Facebook, 
  Instagram, 
  Copy, 
  Users, 
  Gift,
  Star,
  Trophy
} from 'lucide-react';
import { trackEvent } from '@/utils/analytics';
import { toast } from 'sonner';

interface ViralGrowthSystemProps {
  type: 'share_creation' | 'challenge_friend' | 'referral_program' | 'quiz_share';
  content: {
    imageUrl?: string;
    prompt?: string;
    quizResult?: any;
    customMessage?: string;
  };
  onShare: (platform: string, content: any) => void;
  onClose: () => void;
}

export const ViralGrowthSystem = ({ 
  type, 
  content, 
  onShare, 
  onClose 
}: ViralGrowthSystemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [friendEmail, setFriendEmail] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const getShareData = () => {
    switch (type) {
      case 'share_creation':
        return {
          title: 'Share Your AI Masterpiece',
          description: 'Show the world what you created with AI! Share your image and inspire others.',
          shareText: `🎨 I just created this amazing AI art! Check out what I made with just a text prompt: "${content.prompt?.slice(0, 100)}..."`,
          hashtags: ['AIArt', 'CreativeAI', 'DigitalArt', 'WordToImage'],
          platforms: ['twitter', 'facebook', 'instagram', 'copy']
        };
      
      case 'challenge_friend':
        return {
          title: 'Challenge a Friend',
          description: 'Think your friend can create something even cooler? Send them a challenge!',
          shareText: `🔥 I just created amazing AI art and I challenge you to do better! Can you beat this creation?`,
          hashtags: ['AIArtChallenge', 'CreativeChallenge', 'AIArt'],
          platforms: ['twitter', 'facebook', 'email']
        };
      
      case 'quiz_share':
        return {
          title: 'Share Your Style DNA',
          description: 'Let your friends discover their design personality too!',
          shareText: `🧬 I just discovered my Style DNA! I'm a ${content.quizResult?.primaryStyle} creator. What's your style personality?`,
          hashtags: ['StyleDNA', 'DesignPersonality', 'CreativeType'],
          platforms: ['twitter', 'facebook', 'instagram', 'copy']
        };
      
      case 'referral_program':
        return {
          title: 'Earn Free Pro Features',
          description: 'Invite friends and unlock premium features for free!',
          shareText: `🎁 Join me on WordToImage - the best AI art generator! Use my link and we both get free Pro features.`,
          hashtags: ['AIArt', 'FreeTrial', 'WordToImage'],
          platforms: ['twitter', 'facebook', 'email', 'copy']
        };
      
      default:
        return null;
    }
  };

  const shareData = getShareData();
  if (!shareData) return null;

  const handlePlatformShare = (platform: string) => {
    const baseUrl = window.location.origin;
    const shareUrl = type === 'referral_program' 
      ? `${baseUrl}?ref=user123` // In real app, use actual user ID
      : baseUrl;

    const shareContent = {
      text: shareData.shareText,
      url: shareUrl,
      hashtags: shareData.hashtags,
      image: content.imageUrl,
      prompt: content.prompt
    };

    trackEvent({
      action: 'viral_share',
      category: 'growth',
      label: platform,
      custom_parameters: { 
        share_type: type,
        content_type: content.imageUrl ? 'image' : 'text'
      }
    });

    switch (platform) {
      case 'twitter':
        const twitterText = `${shareContent.text} ${shareContent.hashtags.map(h => `#${h}`).join(' ')}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareContent.url)}`;
        window.open(twitterUrl, '_blank');
        break;
      
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareContent.url)}&quote=${encodeURIComponent(shareContent.text)}`;
        window.open(facebookUrl, '_blank');
        break;
      
      case 'instagram':
        // Instagram doesn't have direct sharing URL, so copy to clipboard
        navigator.clipboard.writeText(`${shareContent.text}\n\n${shareContent.url}`);
        toast.success('Content copied! Paste it in your Instagram story or post.');
        break;
      
      case 'copy':
        navigator.clipboard.writeText(`${shareContent.text}\n\n${shareContent.url}`);
        toast.success('Link copied to clipboard!');
        break;
      
      case 'email':
        const emailSubject = type === 'challenge_friend' 
          ? 'I challenge you to create better AI art!'
          : 'Check out this amazing AI art tool!';
        const emailBody = `${shareContent.text}\n\n${customMessage}\n\nTry it here: ${shareContent.url}`;
        const emailUrl = `mailto:${friendEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = emailUrl;
        break;
    }

    onShare(platform, shareContent);
  };

  const getReferralBenefits = () => {
    return [
      { icon: <Gift className="h-5 w-5" />, text: "Free Pro trial for 7 days" },
      { icon: <Star className="h-5 w-5" />, text: "Unlock 50 bonus generations" },
      { icon: <Trophy className="h-5 w-5" />, text: "Early access to new features" }
    ];
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Share2 className="h-5 w-5 text-purple-600" />
            {shareData.title}
          </DialogTitle>
          <p className="text-gray-600">{shareData.description}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image preview for share_creation */}
          {type === 'share_creation' && content.imageUrl && (
            <Card>
              <CardContent className="p-4">
                <img 
                  src={content.imageUrl} 
                  alt="Generated artwork"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2 italic">
                  "{content.prompt}"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quiz result preview */}
          {type === 'quiz_share' && content.quizResult && (
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-4 text-center">
                <Badge className="mb-2" variant="secondary">
                  Style DNA Result
                </Badge>
                <h3 className="font-bold text-lg text-purple-800">
                  {content.quizResult.primaryStyle} Creator
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {content.quizResult.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Referral benefits */}
          {type === 'referral_program' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What you both get:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getReferralBenefits().map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-purple-600">{benefit.icon}</div>
                    <span className="text-sm">{benefit.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Email input for challenge_friend */}
          {type === 'challenge_friend' && (
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Friend's email address"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
              />
              <Input
                placeholder="Add a personal message (optional)"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
            </div>
          )}

          {/* Share buttons */}
          <div className="grid grid-cols-2 gap-3">
            {shareData.platforms.includes('twitter') && (
              <Button
                variant="outline"
                onClick={() => handlePlatformShare('twitter')}
                className="flex items-center gap-2"
              >
                <Twitter className="h-4 w-4 text-blue-400" />
                Twitter
              </Button>
            )}
            
            {shareData.platforms.includes('facebook') && (
              <Button
                variant="outline"
                onClick={() => handlePlatformShare('facebook')}
                className="flex items-center gap-2"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook
              </Button>
            )}
            
            {shareData.platforms.includes('instagram') && (
              <Button
                variant="outline"
                onClick={() => handlePlatformShare('instagram')}
                className="flex items-center gap-2"
              >
                <Instagram className="h-4 w-4 text-pink-500" />
                Instagram
              </Button>
            )}
            
            {shareData.platforms.includes('copy') && (
              <Button
                variant="outline"
                onClick={() => handlePlatformShare('copy')}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Link
              </Button>
            )}
            
            {shareData.platforms.includes('email') && (
              <Button
                onClick={() => handlePlatformShare('email')}
                disabled={type === 'challenge_friend' && !friendEmail}
                className="col-span-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Users className="h-4 w-4 mr-2" />
                {type === 'challenge_friend' ? 'Send Challenge' : 'Share via Email'}
              </Button>
            )}
          </div>

          <Button variant="ghost" onClick={onClose} className="w-full">
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
