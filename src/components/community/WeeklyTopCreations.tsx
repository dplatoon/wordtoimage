
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp } from 'lucide-react';
import { InternalLink } from '@/components/seo/InternalLink';
import { Button } from '@/components/ui/button';

interface Inspiration {
  id: string;
  title: string;
  image: string;
  prompt: string;
  style: string;
}

// Curated showcase of example outputs — not real user submissions
const INSPIRATIONS: Inspiration[] = [
  {
    id: '1',
    title: 'Ethereal Digital Landscapes',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format',
    prompt: 'Surreal floating islands with bioluminescent waterfalls, ethereal mist, cinematic lighting',
    style: 'Fantasy Realism'
  },
  {
    id: '2',
    title: 'Cyberpunk Neon Dreams',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format',
    prompt: 'Futuristic cityscape with neon lights, rain-soaked streets, cyberpunk aesthetic',
    style: 'Cyberpunk'
  },
  {
    id: '3',
    title: 'Abstract Color Symphony',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format',
    prompt: 'Abstract geometric patterns, vibrant color gradients, modern art style',
    style: 'Abstract Modern'
  }
];

export const WeeklyTopCreations = () => {
  return (
    <section className="mb-12" aria-labelledby="inspiration-heading">
      <Card className="glass-card border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-primary mr-3" aria-hidden="true" />
            <CardTitle id="inspiration-heading" className="text-3xl font-bold text-foreground">
              Style Inspiration
            </CardTitle>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Example images to spark your creativity. Describe a scene like one of these and see what the AI generates for you.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {INSPIRATIONS.map((item) => (
              <Card key={item.id} className="glass-card hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-foreground line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                      <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                      {item.style}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    <strong>Try this prompt:</strong> {item.prompt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Ready to create your own? Jump into the generator and describe what you'd like to see.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="neon" asChild>
                <InternalLink to="/text-to-image">
                  Start Creating
                </InternalLink>
              </Button>
              <Button variant="outline" asChild>
                <InternalLink to="/prompt-guide">
                  Learn Prompting
                </InternalLink>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
