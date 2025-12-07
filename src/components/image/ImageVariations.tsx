import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Download, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface ImageVariationsProps {
  sourceImage: string;
  prompt: string;
  onVariationGenerated?: (imageUrl: string) => void;
}

export const ImageVariations = ({
  sourceImage,
  prompt,
  onVariationGenerated
}: ImageVariationsProps) => {
  const [variations, setVariations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState([50]);

  const generateVariations = async () => {
    setLoading(true);
    
    // Simulate variation generation (to be connected to actual edge function)
    toast.info('Generating variations...', {
      description: 'This feature is being connected to the AI backend.'
    });

    // Placeholder - in real implementation, this would call the edge function
    setTimeout(() => {
      setLoading(false);
      toast.success('Variations feature coming soon!');
    }, 2000);
  };

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `variation_${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Variation downloaded!');
    } catch (error) {
      toast.error('Failed to download');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shuffle className="w-5 h-5 text-primary" />
          Image Variations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Source Image */}
        <div className="relative aspect-square max-w-xs mx-auto rounded-xl overflow-hidden bg-muted">
          <img
            src={sourceImage}
            alt="Source"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3 text-white text-sm font-medium">
            Source Image
          </div>
        </div>

        {/* Variation Strength */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Variation Strength
            </label>
            <span className="text-sm text-muted-foreground">{strength[0]}%</span>
          </div>
          <Slider
            value={strength}
            onValueChange={setStrength}
            max={100}
            min={10}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Subtle</span>
            <span>Dramatic</span>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateVariations}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate 4 Variations
            </>
          )}
        </Button>

        {/* Variations Grid */}
        {variations.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {variations.map((variation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
              >
                <img
                  src={variation}
                  alt={`Variation ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDownload(variation, index)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info */}
        <p className="text-xs text-muted-foreground text-center">
          Each variation uses 1 credit. Higher strength = more different from original.
        </p>
      </CardContent>
    </Card>
  );
};
