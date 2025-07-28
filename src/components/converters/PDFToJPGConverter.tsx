
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { FileUploader } from './shared/FileUploader';
import { ProgressBar } from './shared/ProgressBar';
import { QualitySlider } from './shared/QualitySlider';
import { DownloadButton } from './shared/DownloadButton';
import { Upload, Download, Settings, FileText } from 'lucide-react';
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
    
    if (selectedFile.size > 100 * 1024 * 1024) { // 100MB limit
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
      // Dynamic import of PDF.js to reduce initial bundle size
      const pdfjsLib = await import('pdfjs-dist');
      
      // Use the correct worker path that's compatible with the installed version
      const pdfjsVersion = '4.4.168'; // Match the installed version
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const images: string[] = [];
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        setProgress((pageNum / pdf.numPages) * 90);
        
        const page = await pdf.getPage(pageNum);
        const scale = quality / 72; // Convert DPI to scale
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
      
      // Create ZIP file if multiple pages
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
      
      // Track conversion event
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
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
        <CardContent className="p-8">
          {!file ? (
            <FileUploader
              onFileSelect={handleFileSelect}
              acceptedTypes={['application/pdf']}
              maxSize={100 * 1024 * 1024}
              icon={<FileText className="w-12 h-12 text-blue-500" />}
              title="Upload PDF File"
              description="Drag and drop your PDF here, or click to browse"
              supportText="Supports PDF files up to 100MB"
            />
          ) : (
            <div className="space-y-6">
              {/* File Info */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-500" />
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

              {/* Quality Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <h3 className="font-medium">Quality Settings</h3>
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
                className="w-full bg-blue-600 hover:bg-blue-700"
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
                    <h3 className="font-medium">
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
