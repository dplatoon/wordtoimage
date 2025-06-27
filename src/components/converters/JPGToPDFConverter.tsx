
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUploader } from './shared/FileUploader';
import { ProgressBar } from './shared/ProgressBar';
import { DownloadButton } from './shared/DownloadButton';
import { Image, FileText, Layers } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export function JPGToPDFConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pageSize, setPageSize] = useState('A4');
  const [orientation, setOrientation] = useState('portrait');
  const [imagesPerPage, setImagesPerPage] = useState('1');
  const [convertedPdf, setConvertedPdf] = useState<string>('');

  const handleFileSelect = useCallback((file: File) => {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    
    if (!supportedTypes.includes(file.type)) {
      toast.error('Please select an image file (JPG, PNG, WEBP, or GIF)');
      return;
    }
    
    if (files.length >= 20) {
      toast.error('Maximum 20 images allowed in batch mode');
      return;
    }
    
    setFiles(prev => [...prev, file]);
    toast.success('Image added successfully!');
  }, [files.length]);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const reorderFiles = (fromIndex: number, toIndex: number) => {
    const newFiles = [...files];
    const [removed] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, removed);
    setFiles(newFiles);
  };

  const convertImagesToPDF = async () => {
    if (files.length === 0) return;
    
    setIsConverting(true);
    setProgress(0);
    
    try {
      const jsPDF = (await import('jspdf')).default;
      
      // Page dimensions based on size and orientation
      const pageSizes: Record<string, [number, number]> = {
        'A4': [210, 297],
        'A3': [297, 420],
        'Letter': [216, 279],
        'Legal': [216, 356]
      };
      
      const [width, height] = pageSizes[pageSize] || pageSizes['A4'];
      const pageWidth = orientation === 'landscape' ? height : width;
      const pageHeight = orientation === 'landscape' ? width : height;
      
      const doc = new jsPDF({
        orientation: orientation as 'portrait' | 'landscape',
        unit: 'mm',
        format: [pageWidth, pageHeight]
      });
      
      const imagesPerPageNum = parseInt(imagesPerPage);
      const margin = 10;
      const availableWidth = pageWidth - (2 * margin);
      const availableHeight = pageHeight - (2 * margin);
      
      let currentPage = 0;
      let imagesOnCurrentPage = 0;
      
      for (let i = 0; i < files.length; i++) {
        setProgress((i / files.length) * 90);
        
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        
        // Create image element to get dimensions
        const img = new Image();
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = imageUrl;
        });
        
        // Calculate image position and size
        let imgWidth, imgHeight, xPos, yPos;
        
        if (imagesPerPageNum === 1) {
          // Single image per page - fit to page
          const aspectRatio = img.width / img.height;
          const pageAspectRatio = availableWidth / availableHeight;
          
          if (aspectRatio > pageAspectRatio) {
            imgWidth = availableWidth;
            imgHeight = availableWidth / aspectRatio;
          } else {
            imgHeight = availableHeight;
            imgWidth = availableHeight * aspectRatio;
          }
          
          xPos = margin + (availableWidth - imgWidth) / 2;
          yPos = margin + (availableHeight - imgHeight) / 2;
        } else {
          // Multiple images per page - grid layout
          const cols = imagesPerPageNum === 2 ? 2 : Math.ceil(Math.sqrt(imagesPerPageNum));
          const rows = Math.ceil(imagesPerPageNum / cols);
          
          const cellWidth = availableWidth / cols;
          const cellHeight = availableHeight / rows;
          
          const col = imagesOnCurrentPage % cols;
          const row = Math.floor(imagesOnCurrentPage / cols);
          
          xPos = margin + col * cellWidth;
          yPos = margin + row * cellHeight;
          
          const aspectRatio = img.width / img.height;
          const cellAspectRatio = cellWidth / cellHeight;
          
          if (aspectRatio > cellAspectRatio) {
            imgWidth = cellWidth * 0.9;
            imgHeight = (cellWidth * 0.9) / aspectRatio;
          } else {
            imgHeight = cellHeight * 0.9;
            imgWidth = (cellHeight * 0.9) * aspectRatio;
          }
          
          xPos += (cellWidth - imgWidth) / 2;
          yPos += (cellHeight - imgHeight) / 2;
        }
        
        // Add new page if needed
        if (i > 0 && imagesOnCurrentPage === 0) {
          doc.addPage();
          currentPage++;
        }
        
        // Add image to PDF
        doc.addImage(img, 'JPEG', xPos, yPos, imgWidth, imgHeight);
        
        imagesOnCurrentPage++;
        if (imagesOnCurrentPage >= imagesPerPageNum) {
          imagesOnCurrentPage = 0;
        }
        
        URL.revokeObjectURL(imageUrl);
      }
      
      // Generate PDF blob
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
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
    link.click();
    document.body.removeChild(link);
    
    toast.success('Download started!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-dashed border-gray-300 hover:border-orange-500 transition-colors">
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* File Upload or Add More */}
            <div className="space-y-4">
              {files.length === 0 ? (
                <FileUploader
                  onFileSelect={handleFileSelect}
                  acceptedTypes={['image/jpeg', 'image/png', 'image/webp', 'image/gif']}
                  maxSize={10 * 1024 * 1024}
                  icon={<Layers className="w-12 h-12 text-orange-500" />}
                  title="Upload Images for PDF"
                  description="Drag and drop images here, or click to browse"
                  supportText="Supports JPG, PNG, WEBP, GIF up to 10MB each (max 20 files)"
                />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Images to Combine ({files.length}/20)</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.querySelector('input[type="file"]')?.click()}
                      disabled={files.length >= 20}
                    >
                      Add More Images
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
                    {files.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Image ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                          {index + 1}
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {files.length > 0 && (
              <>
                {/* PDF Settings */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Page Size</label>
                    <Select value={pageSize} onValueChange={setPageSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A4">A4</SelectItem>
                        <SelectItem value="A3">A3</SelectItem>
                        <SelectItem value="Letter">Letter</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Orientation</label>
                    <Select value={orientation} onValueChange={setOrientation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Images per Page</label>
                    <Select value={imagesPerPage} onValueChange={setImagesPerPage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 image per page</SelectItem>
                        <SelectItem value="2">2 images per page</SelectItem>
                        <SelectItem value="4">4 images per page</SelectItem>
                        <SelectItem value="6">6 images per page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

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
                {convertedPdf && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium flex items-center gap-2">
                        <FileText className="w-5 h-5 text-orange-500" />
                        PDF Created Successfully!
                      </h3>
                      <DownloadButton
                        onDownload={handleDownload}
                        filename="images-combined.pdf"
                      />
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 text-sm">
                        Successfully combined {files.length} image{files.length > 1 ? 's' : ''} into a PDF document.
                        Page size: {pageSize} ({orientation}), {imagesPerPage} image{parseInt(imagesPerPage) > 1 ? 's' : ''} per page.
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
