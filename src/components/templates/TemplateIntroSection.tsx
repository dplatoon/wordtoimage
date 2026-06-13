
import { Info, Sparkles, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const TemplateIntroSection = () => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space">
          AI Template Library
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
          Browse our curated collection of AI templates – pre-designed styles and formats to jump-start your creations. 
          Click any template to load it into the generator with example settings, then customize to your liking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="border-border hover:border-primary/20 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Style Templates</h3>
            <p className="text-sm text-muted-foreground">
              Apply artistic styles like watercolor, oil painting, or digital art to your prompts
            </p>
          </CardContent>
        </Card>

        <Card className="border-border hover:border-primary/20 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Format Templates</h3>
            <p className="text-sm text-muted-foreground">
              Ready-made layouts for social media, presentations, and professional content
            </p>
          </CardContent>
        </Card>

        <Card className="border-border hover:border-primary/20 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">How to Use</h3>
            <p className="text-sm text-muted-foreground">
              Preview any template, then click "Use" to apply it with your own text and customizations
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
