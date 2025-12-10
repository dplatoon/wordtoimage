
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileUploader } from './shared/FileUploader';
import { ProgressBar } from './shared/ProgressBar';
import { DownloadButton } from './shared/DownloadButton';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Image, Settings } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export function WordToJPGConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [outputFormat, setOutputFormat] = useState<'jpg' | 'png'>('jpg');
  const [convertedImages, setConvertedImages] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const handleFileSelect = useCallback((selectedFile: File) => {
    const supportedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/rtf'
    ];
    
    if (!supportedTypes.includes(selectedFile.type)) {
      toast.error('Please select a Word document (.doc, .docx, or .rtf)');
      return;
    }
    
    if (selectedFile.size > 50 * 1024 * 1024) {
      toast.error('File size too large. Maximum 50MB allowed.');
      return;
    }
    
    setFile(selectedFile);
    setConvertedImages([]);
    setDownloadUrl('');
    toast.success('Word document loaded successfully!');
  }, []);

  const convertWordToJPG = async () => {
    if (!file) return;
    
    setIsConverting(true);
    setProgress(10);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('outputFormat', outputFormat);
      formData.append('preserveFormatting', preserveFormatting.toString());
      
      setProgress(30);
      
      const { data, error } = await supabase.functions.invoke('convert-word-to-image', {
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (error) {
        throw error;
      }
      
      setProgress(80);
      
      if (data?.images) {
        setConvertedImages(data.images);
        
        if (data.images.length > 1) {
          const JSZip = (await import('jszip')).default;
          const zip = new JSZip();
          
          data.images.forEach((imageUrl: string, index: number) => {
            const fileName = `page-${index + 1}.${outputFormat}`;
            zip.file(fileName, fetch(imageUrl).then(res => res.blob()));
          });
          
          const zipBlob = await zip.generateAsync({ type: 'blob' });
          const zipUrl = URL.createObjectURL(zipBlob);
          setDownloadUrl(zipUrl);
        } else {
          setDownloadUrl(data.images[0]);
        }
        
        setProgress(100);
        toast.success(`Successfully converted to ${data.images.length} ${outputFormat.toUpperCase()} image${data.images.length > 1 ? 's' : ''}!`);
        
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: "tool_used",
            tool_name: "Word-to-JPG",
            file_size: `${Math.round(file.size / 1024 / 1024)}MB`,
            output_format: outputFormat,
            preserve_formatting: preserveFormatting,
            pages_converted: data.images.length
          });
        }
      }
      
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('Failed to convert Word document. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = convertedImages.length > 1 
      ? `converted-document.zip` 
      : `converted-document.${outputFormat}`;
    document.body.appendChild(link);
    (link as HTMLAnchorElement).click();
    document.body.removeChild(link);
    
    toast.success('Download started!');
  };

  const handlePreserveFormattingChange = (checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      setPreserveFormatting(checked);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-8">
          {!file ? (
            <FileUploader
              onFileSelect={handleFileSelect}
              acceptedTypes={[
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/msword',
                'application/rtf'
              ]}
              maxSize={50 * 1024 * 1024}
              icon={<FileText className="w-12 h-12 text-green-500" />}
              title="Upload Word Document"
              description="Drag and drop your Word file here, or click to browse"
              supportText="Supports .doc, .docx, and .rtf files up to 50MB"
            />
          ) : (
            <div className="space-y-6">
              {/* File Info */}
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-500" />
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

              {/* Conversion Settings */}
              <div className="space-y-4 p-4 bg-secondary/30 rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-foreground">Conversion Settings</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Output Format</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="format"
                          value="jpg"
                          checked={outputFormat === 'jpg'}
                          onChange={(e) => setOutputFormat(e.target.value as 'jpg')}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-foreground">JPG</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="format"
                          value="png"
                          checked={outputFormat === 'png'}
                          onChange={(e) => setOutputFormat(e.target.value as 'png')}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-foreground">PNG</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="preserve-formatting"
                      checked={preserveFormatting}
                      onCheckedChange={handlePreserveFormattingChange}
                    />
                    <label
                      htmlFor="preserve-formatting"
                      className="text-sm font-medium leading-none cursor-pointer text-foreground"
                    >
                      Preserve formatting (fonts, tables, images)
                    </label>
                  </div>
                </div>
              </div>

              {/* Convert Button */}
              <Button
                onClick={convertWordToJPG}
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
                    <Image className="w-4 h-4 mr-2" />
                    Convert to {outputFormat.toUpperCase()}
                  </>
                )}
              </Button>

              {/* Progress */}
              {isConverting && (
                <ProgressBar 
                  progress={progress} 
                  label="Converting document to images..."
                />
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
                      filename={convertedImages.length > 1 ? 'converted-document.zip' : `converted-document.${outputFormat}`}
                      showCopyLink={true}
                      downloadUrl={downloadUrl}
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
