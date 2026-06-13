import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Wand2, Palette, ImageIcon } from 'lucide-react';

interface GenerationProgressProps {
  isGenerating: boolean;
  currentPrompt?: string;
}

/**
 * Honest, indeterminate generation indicator.
 *
 * The backend image model does not stream progress, so we deliberately avoid
 * a fake percentage bar. Instead we show an animated indeterminate sweep with
 * rotating status messages that reflect the real pipeline stages, plus a
 * polite live region for assistive tech.
 */
const stages = [
  { label: 'Understanding your prompt', icon: Wand2 },
  { label: 'Composing the scene', icon: Palette },
  { label: 'Painting the details', icon: Sparkles },
  { label: 'Rendering your image', icon: ImageIcon },
];

export function GenerationProgress({
  isGenerating,
  currentPrompt = '',
}: GenerationProgressProps) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setStageIndex(0);
      return;
    }
    // Advance through stage messages while we wait. These are illustrative of
    // the real pipeline, not a claim of measured progress.
    const id = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % stages.length);
    }, 2200);
    return () => clearInterval(id);
  }, [isGenerating]);

  if (!isGenerating) return null;

  const ActiveIcon = stages[stageIndex].icon;

  return (
    <Card className="glass-card border-primary/20">
      <CardContent className="p-6">
        <div
          className="space-y-5"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          {/* Heading + current prompt */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Creating your image
            </h3>
            {currentPrompt && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                “{currentPrompt}”
              </p>
            )}
          </div>

          {/* Indeterminate sweep bar */}
          <div
            className="relative h-2 w-full overflow-hidden rounded-full bg-secondary"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-primary via-neon-coral to-primary"
              animate={{ x: ['-100%', '350%'] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Rotating stage message */}
          <div className="flex items-center justify-center gap-2.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={stageIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <ActiveIcon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {stages[stageIndex].label}…
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            This usually takes just a few seconds.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
