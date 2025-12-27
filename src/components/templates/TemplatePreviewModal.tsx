
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Copy, Share, Star, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface TemplatePreviewModalProps {
  template: any;
  allTemplates: any[];
  isOpen: boolean;
  onClose: () => void;
  onUse: (template: any) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const TemplatePreviewModal = ({
  template,
  allTemplates,
  isOpen,
  onClose,
  onUse,
  onNavigate
}: TemplatePreviewModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();

  if (!template) return null;

  const handleCopyPrompt = () => {
    const prompt = template.prompt || `${template.title}: ${template.description}`;
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Prompt copied!",
      description: "The template prompt has been copied to your clipboard.",
    });
  };

  const handleUseTemplate = () => {
    if (template.isPro) {
      toast({
        title: "Pro Template",
        description: "This template requires a Pro subscription. Upgrade to unlock all templates!",
        variant: "default",
      });
      return;
    }
    
    onUse(template);
    toast({
      title: "Template loaded!",
      description: "Now enter your own text to customize this template.",
    });
  };

  const currentIndex = allTemplates.findIndex(t => t.id === template.id);
  const canNavigatePrev = currentIndex > 0;
  const canNavigateNext = currentIndex < allTemplates.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 rounded-2xl border-brand-slate-200">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-brand-slate-200">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900 font-space">{template.title}</h2>
              <div className="flex gap-2">
                {template.isPro && (
                  <Badge className="bg-gradient-to-r from-brand-purple to-brand-navy text-white shadow-brand font-medium">
                    Pro Only
                  </Badge>
                )}
                {template.isNew && (
                  <Badge className="bg-green-500 text-white shadow-brand font-medium">
                    <Clock className="h-3 w-3 mr-1" />
                    New
                  </Badge>
                )}
                {template.isPopular && (
                  <Badge className="bg-primary text-white shadow-brand font-medium">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
                {template.difficulty && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      template.difficulty === 'Easy' && "border-green-200 text-green-700 bg-green-50",
                      template.difficulty === 'Medium' && "border-amber-200 text-amber-700 bg-amber-50",
                      template.difficulty === 'Advanced' && "border-red-200 text-red-700 bg-red-50"
                    )}
                  >
                    {template.difficulty}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {canNavigatePrev && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('prev')}
                  className="hover:bg-brand-slate-100 rounded-lg"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              {canNavigateNext && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('next')}
                  className="hover:bg-brand-slate-100 rounded-lg"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="hover:bg-brand-slate-100 rounded-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Image */}
              <div className="relative bg-brand-slate-50 flex items-center justify-center min-h-[400px]">
                <img
                  src={template.image}
                  alt={template.title}
                  className={cn(
                    "max-w-full max-h-full object-contain transition-opacity duration-300 rounded-xl shadow-subtle",
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  )}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-brand-slate-200 animate-pulse rounded-xl" />
                )}
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col">
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-brand-slate-500 uppercase tracking-wide mb-2">
                      Style
                    </h3>
                    <p className="text-lg font-medium text-gray-900">{template.style}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-brand-slate-500 uppercase tracking-wide mb-2">
                      Description
                    </h3>
                    <p className="text-brand-slate-700 leading-relaxed">{template.description}</p>
                  </div>

                  {template.usage && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-brand-slate-500 uppercase tracking-wide mb-2">
                        Best Used For
                      </h3>
                      <p className="text-brand-purple font-medium">{template.usage}</p>
                    </div>
                  )}

                  {template.prompt && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-brand-slate-500 uppercase tracking-wide mb-2">
                        Example Prompt
                      </h3>
                      <div className="bg-brand-slate-50 rounded-lg p-3 border border-brand-slate-200">
                        <p className="text-sm text-brand-slate-700 font-mono leading-relaxed">
                          "{template.prompt}"
                        </p>
                      </div>
                    </div>
                  )}

                  {template.tags && template.tags.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-brand-slate-500 uppercase tracking-wide mb-3">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {template.tags.map((tag: string, index: number) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="border-brand-slate-200 text-brand-slate-700 font-medium rounded-lg"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Usage Tips */}
                  <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">How to Use This Template</h4>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          Click "Use This Template" to load it into the generator. You can then enter your own text prompt 
                          and the template's style will be automatically applied. Feel free to modify the prompt to match your vision!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-brand-slate-200 pt-6 space-y-4">
                  <Button
                    onClick={handleUseTemplate}
                    className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold shadow-brand rounded-xl"
                    disabled={template.isPro}
                  >
                    {template.isPro ? 'Upgrade to Pro' : 'Use This Template'}
                  </Button>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyPrompt}
                      className="flex-1 border-brand-slate-200 hover:bg-brand-slate-50 font-medium rounded-xl"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Prompt
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-brand-slate-200 hover:bg-brand-slate-50 font-medium rounded-xl"
                    >
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
