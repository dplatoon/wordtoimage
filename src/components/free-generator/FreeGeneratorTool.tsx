
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Download, Share, Wand2 } from 'lucide-react';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { ImageSEO } from '@/components/seo/ImageSEO';
import { toast } from '@/components/ui/sonner';

interface FreeGeneratorToolProps {
  onImageGenerated: (url: string, prompt: string, style?: string) => void;
}

const styleOptions = [
  { value: 'photorealistic', label: 'Photorealistic', description: 'Lifelike, detailed photography style' },
  { value: 'anime', label: 'Anime', description: 'Japanese animation art style' },
  { value: 'painting', label: 'Digital Painting', description: 'Artistic painted look' },
  { value: 'pixel-art', label: 'Pixel Art', description: 'Retro 8-bit gaming style' },
  { value: 'watercolor', label: 'Watercolor', description: 'Soft, flowing watercolor painting' },
  { value: 'oil-painting', label: 'Oil Painting', description: 'Classic fine art style' }
];

export const FreeGeneratorTool = ({ onImageGenerated }: FreeGeneratorToolProps) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('photorealistic');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { generateImageFromPrompt } = useImageGeneration({
    onImageGenerated: (url) => {
      setGeneratedImage(url);
      onImageGenerated(url, prompt, selectedStyle);
      toast.success("Image generated successfully!", {
        description: "Your AI artwork is ready to download and share."
      });
    },
    onGeneratingChange: setIsGenerating,
    onError: (error) => {
      console.error('Generation error:', error);
    }
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your image");
      return;
    }
    
    if (prompt.trim().length < 10) {
      toast.error("Please provide more details", {
        description: "Add more descriptive elements for better results"
      });
      return;
    }

    const stylePrefix = selectedStyle !== 'photorealistic' ? `${selectedStyle} style, ` : '';
    const finalPrompt = `${stylePrefix}${prompt}`;
    
    await generateImageFromPrompt(finalPrompt, '', false);
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Image downloaded!", {
        description: "Your AI artwork has been saved to your device."
      });
    }
  };

  const handleShare = async () => {
    if (generatedImage && navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my AI-generated artwork!',
          text: `Created with WordToImage: "${prompt}"`,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <section id="generator-tool" className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Free AI Image Generator Tool
          </h2>
          <p className="text-xl text-muted-foreground">
            Describe your vision and watch AI create it instantly
          </p>
        </div>

        <Card className="shadow-glass border-primary/20 bg-card/30 backdrop-blur-xl">
          <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center text-2xl">
              <Wand2 className="mr-3 h-6 w-6" />
              Create Your AI Masterpiece
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            {/* Prompt Input */}
            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-lg font-semibold text-foreground">
                Describe your image
              </Label>
              <Textarea
                id="prompt"
                placeholder="e.g., 'cyberpunk cat wearing sunglasses in neon city'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] text-lg"
                disabled={isGenerating}
              />
              <p className="text-sm text-muted-foreground">
                Be descriptive! Include details about style, mood, colors, and setting.
              </p>
            </div>

            {/* Style Selector */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-foreground">Art Style</Label>
              <Select value={selectedStyle} onValueChange={setSelectedStyle} disabled={isGenerating}>
                <SelectTrigger className="text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {styleOptions.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      <div>
                        <div className="font-medium">{style.label}</div>
                        <div className="text-sm text-muted-foreground">{style.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              variant="neon"
              className="w-full py-4 text-lg shadow-neon hover:shadow-neon-lg transform hover:scale-105 transition-all duration-200"
            >
              {isGenerating ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-3 h-5 w-5 border-b-2 border-current rounded-full" />
                  Creating Your Masterpiece...
                </span>
              ) : (
                <span className="flex items-center">
                  <Sparkles className="mr-3 h-5 w-5" />
                  Generate Image (100% Free!)
                </span>
              )}
            </Button>

            {/* Result Display */}
            {generatedImage && (
              <div className="mt-8 space-y-4">
                <div className="relative rounded-lg overflow-hidden shadow-glass">
                  <ImageSEO
                    src={generatedImage}
                    alt={`AI generated ${selectedStyle} image: ${prompt}`}
                    className="w-full h-auto max-h-96 object-contain bg-card"
                    structuredData={{
                      caption: prompt,
                      creator: "WordToImage Free AI Generator",
                      keywords: [selectedStyle, 'AI generated', 'free'],
                      contentUrl: generatedImage,
                      creditText: "Created with WordToImage"
                    }}
                  />
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleDownload}
                    variant="glass"
                    className="flex items-center"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="glass"
                    className="flex items-center"
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
