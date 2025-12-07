import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Download, Heart, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Generation {
  id: string;
  prompt: string;
  image_url: string;
  style: string | null;
  created_at: string;
}

interface GenerationHistoryProps {
  userId: string;
}

export const GenerationHistory = ({ userId }: GenerationHistoryProps) => {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchGenerations();
  }, [userId]);

  const fetchGenerations = async () => {
    try {
      const { data, error } = await supabase
        .from('generations')
        .select('id, prompt, image_url, style, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) throw error;
      setGenerations(data || []);
    } catch (error) {
      console.error('Error fetching generations:', error);
      toast.error('Failed to load generation history');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Image downloaded!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Generations</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {generations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No generations yet. Start creating!</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {generations.map((gen, index) => (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
              >
                <img
                  src={gen.image_url}
                  alt={gen.prompt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs line-clamp-2 mb-2">{gen.prompt}</p>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-7 w-7"
                        onClick={() => handleDownload(gen.image_url, gen.prompt)}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-7 w-7"
                      >
                        <Heart className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {generations.map((gen, index) => (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <img
                  src={gen.image_url}
                  alt={gen.prompt}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-1">{gen.prompt}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(gen.created_at).toLocaleDateString()}
                    {gen.style && ` • ${gen.style}`}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => handleDownload(gen.image_url, gen.prompt)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
