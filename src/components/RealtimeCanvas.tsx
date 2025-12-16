import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Image as ImageIcon, Wand2 } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { VoiceInput } from '@/components/VoiceInput';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface RealtimeCanvasProps {
  onImageGenerated?: (url: string, prompt: string) => void;
  className?: string;
}

export const RealtimeCanvas: React.FC<RealtimeCanvasProps> = ({
  onImageGenerated,
  className,
}) => {
  const [prompt, setPrompt] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [isGeneratingFinal, setIsGeneratingFinal] = useState(false);
  const [previewProgress, setPreviewProgress] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const debouncedPrompt = useDebounce(prompt, 1500);

  // Generate low-quality preview as user types
  const generatePreview = useCallback(async (promptText: string) => {
    if (!promptText.trim() || promptText.length < 10) {
      setPreviewUrl(null);
      return;
    }

    setIsGeneratingPreview(true);
    setPreviewProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setPreviewProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      // Use a quick preview generation (lower quality, faster)
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: {
          prompt: promptText,
          style: 'auto',
          resolution: '512x512', // Lower res for preview
          isPreview: true,
        },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setPreviewUrl(data.imageUrl);
        setPreviewProgress(100);
      }
    } catch (error) {
      console.error('Preview generation error:', error);
      // Don't show error toast for previews
    } finally {
      clearInterval(progressInterval);
      setIsGeneratingPreview(false);
    }
  }, []);

  // Trigger preview on debounced prompt change
  useEffect(() => {
    if (debouncedPrompt && user) {
      generatePreview(debouncedPrompt);
    }
  }, [debouncedPrompt, user, generatePreview]);

  // Generate full-quality final image
  const generateFinalImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Empty prompt',
        description: 'Please enter a description for your image.',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to generate images.',
        variant: 'destructive',
      });
      return;
    }

    setIsGeneratingFinal(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: {
          prompt,
          style: 'auto',
          resolution: '1024x1024',
          isPreview: false,
        },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setPreviewUrl(data.imageUrl);
        onImageGenerated?.(data.imageUrl, prompt);
        toast({
          title: 'Image generated!',
          description: 'Your high-quality image is ready.',
        });
      }
    } catch (error: any) {
      console.error('Final generation error:', error);
      toast({
        title: 'Generation failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingFinal(false);
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setPrompt(text);
  };

  const handleEnhancedPrompt = (text: string) => {
    setPrompt(text);
  };

  return (
    <Card className={cn('glass-card overflow-hidden', className)}>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Input Section */}
          <div className="p-6 border-r border-border/30">
            <div className="flex items-center gap-2 mb-4">
              <Wand2 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Real-Time Preview</h3>
            </div>

            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your image... (preview generates as you type)"
                className="min-h-[150px] resize-none pr-12 bg-background/50"
                maxLength={500}
              />
              <div className="absolute right-2 top-2">
                <VoiceInput
                  onTranscript={handleVoiceTranscript}
                  onEnhancedPrompt={handleEnhancedPrompt}
                  enhancePrompt={true}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>{prompt.length}/500 characters</span>
              {isGeneratingPreview && (
                <span className="flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Generating preview...
                </span>
              )}
            </div>

            <Button
              onClick={generateFinalImage}
              disabled={isGeneratingFinal || !prompt.trim() || !user}
              className="w-full mt-4"
              variant="neon"
            >
              {isGeneratingFinal ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating HD Image...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate High-Quality Image
                </>
              )}
            </Button>

            {!user && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Sign in to generate images
              </p>
            )}
          </div>

          {/* Preview Section */}
          <div className="p-6 bg-background/30">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Preview</h3>
            </div>

            <div className="relative aspect-square rounded-lg overflow-hidden bg-background/50 border border-border/30">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mb-2 opacity-30" />
                  <p className="text-sm">Start typing to see preview</p>
                </div>
              )}

              {/* Progress overlay */}
              {isGeneratingPreview && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                  <div className="w-32 h-1 bg-border/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-200"
                      style={{ width: `${previewProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Generating preview...
                  </p>
                </div>
              )}

              {/* Final generation overlay */}
              {isGeneratingFinal && (
                <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center">
                  <div className="relative">
                    <Sparkles className="h-12 w-12 text-primary animate-pulse" />
                    <div className="absolute inset-0 animate-ping">
                      <Sparkles className="h-12 w-12 text-primary/50" />
                    </div>
                  </div>
                  <p className="text-sm text-foreground mt-4 font-medium">
                    Creating your masterpiece...
                  </p>
                </div>
              )}
            </div>

            {previewUrl && !isGeneratingPreview && !isGeneratingFinal && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                This is a low-res preview. Click generate for HD quality.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeCanvas;
