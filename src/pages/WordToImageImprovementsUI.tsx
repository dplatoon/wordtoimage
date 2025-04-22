
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SettingsModal } from '@/components/word-to-image/SettingsModal';
import { PromptInput } from '@/components/word-to-image/PromptInput';
import { IntensitySlider } from '@/components/word-to-image/IntensitySlider';
import { ImageGallery } from '@/components/word-to-image/ImageGallery';
import { EditImageModal } from '@/components/word-to-image/EditImageModal';
import { supabase } from '@/integrations/supabase/client';

export default function WordToImageImprovementsUI() {
  const [prompt, setPrompt] = useState('');
  const [history] = useState<string[]>([]);
  const [suggestions] = useState<string[]>([
    'Futuristic cityscape at dusk, watercolor style',
    'Surreal desert landscape with neon lights',
    'Portrait of a cyberpunk character, cinematic lighting'
  ]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [styleIntensity, setStyleIntensity] = useState(50);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setImages([]);
    setProgress(0);

    try {
      const { data, error } = await supabase.functions.invoke('generate-runware-image', {
        body: { prompt }
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setImages([{ url: data.imageUrl }]);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const openEditor = (imgUrl: string) => {
    setSelectedImage(imgUrl);
    setEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setSettingsModalOpen(true)}
        >
          Settings
        </Button>
      </div>

      <PromptInput
        prompt={prompt}
        onPromptChange={setPrompt}
        suggestions={suggestions}
      />

      <IntensitySlider
        value={styleIntensity}
        onChange={setStyleIntensity}
      />

      {loading && (
        <motion.div
          className="h-1 bg-blue-500 mb-4 rounded"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        />
      )}

      <Button onClick={handleGenerate} disabled={loading} className="mb-6">
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate'}
      </Button>

      <ImageGallery
        images={images}
        onEdit={openEditor}
        loading={loading}
      />

      <EditImageModal
        imageUrl={selectedImage}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />

      <SettingsModal
        open={settingsModalOpen}
        onOpenChange={setSettingsModalOpen}
      />
    </div>
  );
}
