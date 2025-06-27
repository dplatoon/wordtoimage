
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
    
    if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
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
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('outputFormat', outputFormat);
      formData.append('preserveFormatting', preserveFormatting.toString());
      
      setProgress(30);
      
      // Call Supabase Edge Function for conversion
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
        
        // Create download URL
        if (data.images.length > 1) {
          // Multiple images - create ZIP
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
        
        // Track conversion event
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
      <Card className="border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors">
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
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFile(null)}
                >
                  Change File
                </Button>
              </div>

              {/* Conversion Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <h3 className="font-medium">Conversion Settings</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Output Format</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="format"
                          value="jpg"
                          checked={outputFormat === 'jpg'}
                          onChange={(e) => setOutputFormat(e.target.value as 'jpg')}
                          className="text-green-600"
                        />
                        <span>JPG</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="format"
                          value="png"
                          checked={outputFormat === 'png'}
                          onChange={(e) => setOutputFormat(e.target.value as 'png')}
                          className="text-green-600"
                        />
                        <span>PNG</span>
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
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                className="w-full bg-green-600 hover:bg-green-700"
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
                    <h3 className="font-medium">
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
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Page ${index + 1}`}
                          className="w-full h-24 object-cover rounded border"
                        />
                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                          Page {index + 1}
                        </div>
                      </div>
                    ))}
                    {convertedImages.length > 6 && (
                      <div className="flex items-center justify-center bg-gray-100 rounded border h-24">
                        <span className="text-sm text-gray-600">
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
