
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageGenerationForm } from '@/components/hero/ImageGenerationForm';
import { ImagePreview } from '@/components/hero/ImagePreview';

export const LiveDemoSection = () => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section id="demo" className="py-16 md:py-24 bg-gradient-to-r from-ai-surface/50 to-ai-muted/50 backdrop-blur-sm">
      <div className="content-container">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-ai-accent/20 text-ai-accent border-ai-accent/30 px-4 py-2">
            <ImageIcon className="h-4 w-4 mr-2" />
            Live Demo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Try It <span className="text-gradient-neon">Right Now</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Experience the power of AI image generation instantly. 
            Enter your prompt and watch your ideas come to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ImageGenerationForm 
              onImageGenerated={setGeneratedImageUrl}
              onGeneratingChange={setIsGenerating}
              onError={setError}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ImagePreview 
              imageUrl={generatedImageUrl}
              isGenerating={isGenerating}
              error={error}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
