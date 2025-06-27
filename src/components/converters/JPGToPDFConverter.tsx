
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from './shared/ProgressBar';
import { FileText } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { ImageUploadArea } from './shared/ImageUploadArea';
import { PDFSettings } from './shared/PDFSettings';
import { ConversionResults } from './shared/ConversionResults';
import { PDFGenerationService } from '@/services/pdfGenerationService';

export function JPGToPDFConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pageSize, setPageSize] = useState('A4');
  const [orientation, setOrientation] = useState('portrait');
  const [imagesPerPage, setImagesPerPage] = useState('1');
  const [convertedPdf, setConvertedPdf] = useState<string>('');

  const handleFileSelect = useCallback((file: File) => {
    setFiles(prev => [...prev, file]);
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertImagesToPDF = async () => {
    if (files.length === 0) return;
    
    setIsConverting(true);
    setProgress(0);
    
    try {
      const pdfUrl = await PDFGenerationService.generatePDF(
        files,
        {
          pageSize,
          orientation: orientation as 'portrait' | 'landscape',
          imagesPerPage: parseInt(imagesPerPage)
        },
        setProgress
      );
      
      setConvertedPdf(pdfUrl);
      setProgress(100);
      toast.success(`Successfully created PDF with ${files.length} image${files.length > 1 ? 's' : ''}!`);
      
      // Track conversion event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "tool_used",
          tool_name: "JPG-to-PDF",
          files_processed: files.length,
          page_size: pageSize,
          orientation: orientation,
          images_per_page: imagesPerPage
        });
      }
      
    } catch (error) {
      console.error('PDF creation error:', error);
      toast.error('Failed to create PDF. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedPdf) return;
    
    const link = document.createElement('a');
    link.href = convertedPdf;
    link.download = 'images-combined.pdf';
    document.body.appendChild(link);
    (link as HTMLAnchorElement).click();
    document.body.removeChild(link);
    
    toast.success('Download started!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-dashed border-gray-300 hover:border-orange-500 transition-colors">
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* File Upload */}
            <ImageUploadArea
              files={files}
              onFileSelect={handleFileSelect}
              onRemoveFile={removeFile}
            />

            {files.length > 0 && (
              <>
                {/* PDF Settings */}
                <PDFSettings
                  pageSize={pageSize}
                  orientation={orientation}
                  imagesPerPage={imagesPerPage}
                  onPageSizeChange={setPageSize}
                  onOrientationChange={setOrientation}
                  onImagesPerPageChange={setImagesPerPage}
                />

                {/* Convert Button */}
                <Button
                  onClick={convertImagesToPDF}
                  disabled={isConverting}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  size="lg"
                >
                  {isConverting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating PDF...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Create PDF ({files.length} image{files.length > 1 ? 's' : ''})
                    </>
                  )}
                </Button>

                {/* Progress */}
                {isConverting && (
                  <ProgressBar 
                    progress={progress} 
                    label="Processing images and creating PDF..."
                  />
                )}

                {/* Results */}
                <ConversionResults
                  convertedPdf={convertedPdf}
                  filesCount={files.length}
                  pageSize={pageSize}
                  orientation={orientation}
                  imagesPerPage={imagesPerPage}
                  onDownload={handleDownload}
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
