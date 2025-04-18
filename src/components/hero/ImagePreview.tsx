
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Image, Download, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ImagePreviewProps {
  imageUrl: string;
  isGenerating: boolean;
  error: string | null;
}

export const ImagePreview = ({ imageUrl, isGenerating, error }: ImagePreviewProps) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `runware-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success('Image downloaded successfully!');
  };

  return (
    <div className="h-[350px] md:h-[400px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
      {isGenerating ? (
        <div className="text-center px-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Generating your custom graphic...</p>
        </div>
      ) : error ? (
        <Alert variant="destructive" className="w-full max-w-md mx-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Image Generation Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : imageUrl ? (
        <div className="relative w-full h-full group">
          <img 
            src={imageUrl} 
            alt="Generated social media graphic" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center px-8">
          <Image className="h-10 w-10 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Enter a prompt and generate your custom social media graphic with Runware AI</p>
        </div>
      )}
    </div>
  );
};
