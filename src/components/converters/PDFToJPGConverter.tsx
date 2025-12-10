
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileUploader } from './shared/FileUploader';
import { ProgressBar } from './shared/ProgressBar';
import { QualitySlider } from './shared/QualitySlider';
import { DownloadButton } from './shared/DownloadButton';
import { Upload, Settings, FileText } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export function PDFToJPGConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(300);
  const [convertedImages, setConvertedImages] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }
    
    if (selectedFile.size > 100 * 1024 * 1024) {
      toast.error('File size too large. Maximum 100MB allowed.');
      return;
    }
    
    setFile(selectedFile);
    setConvertedImages([]);
    setDownloadUrl('');
    toast.success('PDF file loaded successfully!');
  }, []);

  const convertPDFToJPG = async () => {
    if (!file) return;
    
    setIsConverting(true);
    setProgress(0);
    
    try {
      const pdfjsLib = await import('pdfjs-dist');
      const pdfjsVersion = '4.4.168';
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const images: string[] = [];
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        setProgress((pageNum / pdf.numPages) * 90);
        
        const page = await pdf.getPage(pageNum);
        const scale = quality / 72;
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        if (context) {
          await page.render({
            canvasContext: context,
            viewport: viewport,
            canvas: canvas
          }).promise;
          
          const imageDataUrl = canvas.toDataURL('image/jpeg', 0.95);
          images.push(imageDataUrl);
        }
      }
      
      setConvertedImages(images);
      
      if (images.length > 1) {
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        
        images.forEach((imageData, index) => {
          const base64Data = imageData.split(',')[1];
          zip.file(`page-${index + 1}.jpg`, base64Data, { base64: true });
        });
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipUrl = URL.createObjectURL(zipBlob);
        setDownloadUrl(zipUrl);
      } else {
        setDownloadUrl(images[0]);
      }
      
      setProgress(100);
      toast.success(`Successfully converted ${images.length} page${images.length > 1 ? 's' : ''} to JPG!`);
      
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "tool_used",
          tool_name: "PDF-to-JPG",
          file_size: `${Math.round(file.size / 1024 / 1024)}MB`,
          output_quality: `${quality}dpi`,
          pages_converted: images.length
        });
      }
      
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('Failed to convert PDF. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = convertedImages.length > 1 
      ? `converted-pages.zip` 
      : `converted-page.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Download started!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-8">
          {!file ? (
            <FileUploader
              onFileSelect={handleFileSelect}
              acceptedTypes={['application/pdf']}
              maxSize={100 * 1024 * 1024}
              icon={<FileText className="w-12 h-12 text-primary" />}
              title="Upload PDF File"
              description="Drag and drop your PDF here, or click to browse"
              supportText="Supports PDF files up to 100MB"
            />
          ) : (
            <div className="space-y-6">
              {/* File Info */}
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setFile(null)}
                >
                  Change File
                </Button>
              </div>

              {/* Quality Settings */}
              <div className="space-y-4 p-4 bg-secondary/30 rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-foreground">Quality Settings</h3>
                </div>
                <QualitySlider
                  quality={quality}
                  onQualityChange={(value) => setQuality(value[0])}
                />
              </div>

              {/* Convert Button */}
              <Button
                onClick={convertPDFToJPG}
                disabled={isConverting}
                variant="neon"
                className="w-full"
                size="lg"
              >
                {isConverting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Convert to JPG
                  </>
                )}
              </Button>

              {/* Progress */}
              {isConverting && (
                <ProgressBar progress={progress} />
              )}

              {/* Results */}
              {convertedImages.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">
                      Conversion Complete! ({convertedImages.length} image{convertedImages.length > 1 ? 's' : ''})
                    </h3>
                    <DownloadButton
                      onDownload={handleDownload}
                      filename={convertedImages.length > 1 ? 'converted-pages.zip' : 'converted-page.jpg'}
                    />
                  </div>
                  
                  {/* Preview */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                    {convertedImages.slice(0, 6).map((image, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden border border-border">
                        <img
                          src={image}
                          alt={`Page ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute bottom-1 left-1 bg-background/80 text-foreground text-xs px-2 py-0.5 rounded">
                          Page {index + 1}
                        </div>
                      </div>
                    ))}
                    {convertedImages.length > 6 && (
                      <div className="flex items-center justify-center bg-secondary/50 rounded-lg border border-border h-24">
                        <span className="text-sm text-muted-foreground">
                          +{convertedImages.length - 6} more
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
