
import React from 'react';
import { FileText } from 'lucide-react';
import { DownloadButton } from './DownloadButton';

interface ConversionResultsProps {
  convertedPdf: string;
  filesCount: number;
  pageSize: string;
  orientation: string;
  imagesPerPage: string;
  onDownload: () => void;
}

export function ConversionResults({
  convertedPdf,
  filesCount,
  pageSize,
  orientation,
  imagesPerPage,
  onDownload
}: ConversionResultsProps) {
  if (!convertedPdf) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2 text-foreground">
          <FileText className="w-5 h-5 text-primary" />
          PDF Created Successfully!
        </h3>
        <DownloadButton
          onDownload={onDownload}
          filename="images-combined.pdf"
        />
      </div>
      
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
        <p className="text-primary text-sm">
          Successfully combined {filesCount} image{filesCount > 1 ? 's' : ''} into a PDF document.
          Page size: {pageSize} ({orientation}), {imagesPerPage} image{parseInt(imagesPerPage) > 1 ? 's' : ''} per page.
        </p>
      </div>
    </div>
  );
}
