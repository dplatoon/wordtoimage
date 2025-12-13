
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PDFSettingsProps {
  pageSize: string;
  orientation: string;
  imagesPerPage: string;
  onPageSizeChange: (value: string) => void;
  onOrientationChange: (value: string) => void;
  onImagesPerPageChange: (value: string) => void;
}

export function PDFSettings({
  pageSize,
  orientation,
  imagesPerPage,
  onPageSizeChange,
  onOrientationChange,
  onImagesPerPageChange
}: PDFSettingsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4 p-4 bg-secondary/30 rounded-xl border border-border">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Page Size</label>
        <Select value={pageSize} onValueChange={onPageSizeChange}>
          <SelectTrigger className="bg-background/50">
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
        <label className="text-sm font-medium text-foreground">Orientation</label>
        <Select value={orientation} onValueChange={onOrientationChange}>
          <SelectTrigger className="bg-background/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portrait">Portrait</SelectItem>
            <SelectItem value="landscape">Landscape</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Images per Page</label>
        <Select value={imagesPerPage} onValueChange={onImagesPerPageChange}>
          <SelectTrigger className="bg-background/50">
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
  );
}
