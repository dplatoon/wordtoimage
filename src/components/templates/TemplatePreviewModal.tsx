
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Share, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

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
    // Assuming template has a prompt or we generate one from title/description
    const prompt = template.prompt || `${template.title}: ${template.description}`;
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Prompt copied!",
      description: "The template prompt has been copied to your clipboard.",
    });
  };

  const currentIndex = allTemplates.findIndex(t => t.id === template.id);
  const canNavigatePrev = currentIndex > 0;
  const canNavigateNext = currentIndex < allTemplates.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">{template.title}</h2>
              {template.isPro && (
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Pro Only
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {canNavigatePrev && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              {canNavigateNext && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Image */}
              <div className="relative bg-gray-100 flex items-center justify-center min-h-[400px]">
                <img
                  src={template.image}
                  alt={template.title}
                  className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
                )}
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col">
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Style
                    </h3>
                    <p className="text-lg">{template.style}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Description
                    </h3>
                    <p className="text-gray-700">{template.description}</p>
                  </div>

                  {template.tags && template.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {template.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="border-t pt-4 space-y-3">
                  <Button
                    onClick={() => onUse(template)}
                    className="w-full"
                    disabled={template.isPro}
                  >
                    {template.isPro ? 'Upgrade to Pro' : 'Use This Template'}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyPrompt}
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Prompt
                    </Button>
                    <Button variant="outline" size="sm">
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
