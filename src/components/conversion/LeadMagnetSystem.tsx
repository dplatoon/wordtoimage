
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Download, Star, Gift, Clock, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';
import { toast } from 'sonner';

interface LeadMagnetProps {
  type: 'style_report' | 'pro_styles' | 'creation_pack' | 'tips_guide';
  trigger: 'quiz_complete' | 'multiple_generations' | 'time_spent' | 'feature_interest';
  onEmailSubmit: (email: string, magnetType: string) => void;
  onClose: () => void;
  userData?: {
    stylePreferences?: string[];
    generationCount?: number;
    timeSpent?: number;
  };
}

export const LeadMagnetSystem = ({ 
  type, 
  trigger, 
  onEmailSubmit, 
  onClose,
  userData = {} 
}: LeadMagnetProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes

  useEffect(() => {
    trackEvent({
      action: 'lead_magnet_shown',
      category: 'conversion',
      label: type,
      custom_parameters: { trigger, user_data: userData }
    });

    // Start countdown for limited time offers
    if (type === 'pro_styles' || type === 'creation_pack') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [type, trigger, userData]);

  const getMagnetData = () => {
    switch (type) {
      case 'style_report':
        return {
          title: 'Get Your Personal Style DNA Report',
          subtitle: 'Discover your unique design personality',
          description: 'Based on your quiz responses, get a detailed 12-page report with your style profile, color preferences, and personalized recommendations.',
          benefits: [
            'Your unique style personality type',
            'Personalized color palette recommendations',
            'Style tips from professional designers',
            'Custom prompt templates for your style'
          ],
          icon: <Star className="h-6 w-6 text-yellow-500" />,
          badge: 'Personalized',
          buttonText: 'Get My Free Style Report'
        };
      
      case 'pro_styles':
        return {
          title: 'Unlock 500+ Premium Styles',
          subtitle: 'Limited time: Free access for 24 hours',
          description: 'Get instant access to our entire premium style library, including trending styles, professional templates, and exclusive designer collections.',
          benefits: [
            '500+ premium AI art styles',
            'Weekly new style releases',
            'Professional designer collections',
            'Commercial usage rights'
          ],
          icon: <Gift className="h-6 w-6 text-purple-500" />,
          badge: 'Limited Time',
          buttonText: 'Unlock Premium Styles Now'
        };
      
      case 'creation_pack':
        return {
          title: 'Ultimate Creation Starter Pack',
          subtitle: 'Everything you need to create amazing AI art',
          description: '50 proven prompts, style guide, and pro tips that helped 10,000+ users create viral-worthy images.',
          benefits: [
            '50 viral-ready prompt templates',
            'Style combination guide',
            'Pro editing techniques',
            'Community access & feedback'
          ],
          icon: <Download className="h-6 w-6 text-blue-500" />,
          badge: 'Bestseller',
          buttonText: 'Download Free Pack'
        };
      
      case 'tips_guide':
        return {
          title: 'AI Art Mastery Guide',
          subtitle: 'From beginner to pro in 30 minutes',
          description: 'Learn the secrets that professional AI artists use to create stunning, consistent results every time.',
          benefits: [
            'Advanced prompting techniques',
            'Style consistency secrets',
            'Professional workflow tips',
            'Common mistakes to avoid'
          ],
          icon: <Mail className="h-6 w-6 text-green-500" />,
          badge: 'Expert Tips',
          buttonText: 'Get Pro Tips'
        };
      
      default:
        return null;
    }
  };

  const magnetData = getMagnetData();
  if (!magnetData) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      trackEvent({
        action: 'lead_magnet_submitted',
        category: 'conversion',
        label: type,
        custom_parameters: { trigger, email_domain: email.split('@')[1] }
      });

      await onEmailSubmit(email, type);
      
      toast.success('Success! Check your email for your free download.');
      setIsOpen(false);
      onClose();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      trackEvent({
        action: 'lead_magnet_error',
        category: 'conversion',
        label: type,
        custom_parameters: { error: error instanceof Error ? error.message : 'Unknown' }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    trackEvent({
      action: 'lead_magnet_closed',
      category: 'conversion',
      label: type,
      custom_parameters: { trigger, time_viewed: 300 - countdown }
    });
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {magnetData.title}
            </DialogTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {magnetData.badge}
            </Badge>
          </div>
          <p className="text-gray-600 font-medium">{magnetData.subtitle}</p>
        </DialogHeader>

        <Card className="border-none shadow-none bg-gradient-to-br from-gray-50 to-white">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 p-3 bg-white rounded-full w-fit shadow-sm">
                {magnetData.icon}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {magnetData.description}
              </p>

              {/* Limited time countdown */}
              {(type === 'pro_styles' || type === 'creation_pack') && countdown > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-center gap-2 text-red-700">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold">Expires in: {formatTime(countdown)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Benefits list */}
            <div className="space-y-2 mb-6">
              {magnetData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-center"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                {isSubmitting ? 'Sending...' : magnetData.buttonText}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-3">
              Free download. No spam. Unsubscribe anytime.
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
