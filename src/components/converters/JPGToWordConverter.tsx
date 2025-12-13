
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUploader } from './shared/FileUploader';
import { ProgressBar } from './shared/ProgressBar';
import { DownloadButton } from './shared/DownloadButton';
import { Image, FileText, Eye, X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export function JPGToWordConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState('en');
  const [outputType, setOutputType] = useState<'word' | 'pdf'>('word');
  const [convertedFiles, setConvertedFiles] = useState<string[]>([]);

  const handleFileSelect = useCallback((file: File) => {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff'];
    
    if (!supportedTypes.includes(file.type)) {
      toast.error('Please select an image file (JPG, PNG, WEBP, or TIFF)');
      return;
    }
    
    setFiles(prev => [...prev, file]);
    toast.success('Image added successfully!');
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertImagesToText = async () => {
    if (files.length === 0) return;
    
    setIsConverting(true);
    setProgress(0);
    
    try {
      setProgress(20);
      
      const Tesseract = await import('tesseract.js');
      const results: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(20 + (i / files.length) * 60);
        
        const { data: { text } } = await Tesseract.recognize(
          file,
          language,
          {
            logger: m => {
              if (m.status === 'recognizing text') {
                const fileProgress = 20 + (i / files.length) * 60 + (m.progress * 60 / files.length);
                setProgress(fileProgress);
              }
            }
          }
        );
        
        results.push(text);
      }
      
      if (outputType === 'word') {
        const docContent = results.join('\n\n--- Page Break ---\n\n');
        const blob = new Blob([docContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        setConvertedFiles([url]);
      } else {
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF();
        
        results.forEach((text, index) => {
          if (index > 0) doc.addPage();
          const lines = doc.splitTextToSize(text, 180);
          doc.text(lines, 15, 20);
        });
        
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        setConvertedFiles([url]);
      }
      
      setProgress(100);
      toast.success(`Successfully extracted text from ${files.length} image${files.length > 1 ? 's' : ''}!`);
      
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "tool_used",
          tool_name: "JPG-to-Word",
          files_processed: files.length,
          output_type: outputType,
          language: language
        });
      }
      
    } catch (error) {
      console.error('OCR error:', error);
      toast.error('Failed to extract text from images. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedFiles.length === 0) return;
    
    const link = document.createElement('a');
    link.href = convertedFiles[0];
    link.download = outputType === 'word' ? 'extracted-text.txt' : 'extracted-text.pdf';
    document.body.appendChild(link);
    (link as HTMLAnchorElement).click();
    document.body.removeChild(link);
    
    toast.success('Download started!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* File Upload Area */}
            {files.length === 0 ? (
              <FileUploader
                onFileSelect={handleFileSelect}
                acceptedTypes={['image/jpeg', 'image/png', 'image/webp', 'image/tiff']}
                maxSize={10 * 1024 * 1024}
                icon={<Image className="w-12 h-12 text-primary" />}
                title="Upload Images with Text"
                description="Drag and drop images here, or click to browse"
                supportText="Supports JPG, PNG, WEBP, TIFF up to 10MB each"
              />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">Uploaded Images ({files.length})</h3>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                  >
                    Add More Images
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-48 overflow-y-auto">
                  {files.map((file, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden border border-border">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {files.length > 0 && (
              <>
                {/* OCR Settings */}
                <div className="grid md:grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-xl border border-border">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Output Format</label>
                    <Select value={outputType} onValueChange={(value: 'word' | 'pdf') => setOutputType(value)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="word">Editable Word Document</SelectItem>
                        <SelectItem value="pdf">Flattened PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Convert Button */}
                <Button
                  onClick={convertImagesToText}
                  disabled={isConverting}
                  variant="neon"
                  className="w-full"
                  size="lg"
                >
                  {isConverting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Extracting Text...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Extract Text ({files.length} image{files.length > 1 ? 's' : ''})
                    </>
                  )}
                </Button>

                {/* Progress */}
                {isConverting && (
                  <ProgressBar 
                    progress={progress} 
                    label="Processing images with OCR..."
                  />
                )}

                {/* Results */}
                {convertedFiles.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium flex items-center gap-2 text-foreground">
                        <FileText className="w-5 h-5 text-primary" />
                        Text Extraction Complete!
                      </h3>
                      <DownloadButton
                        onDownload={handleDownload}
                        filename={outputType === 'word' ? 'extracted-text.txt' : 'extracted-text.pdf'}
                      />
                    </div>
                    
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                      <p className="text-primary text-sm">
                        Successfully extracted text from {files.length} image{files.length > 1 ? 's' : ''} using OCR technology.
                        {outputType === 'word' 
                          ? ' You can now edit the text in any word processor.' 
                          : ' The text has been formatted into a PDF document.'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
