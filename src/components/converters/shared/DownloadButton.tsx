
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface DownloadButtonProps {
  onDownload: () => void;
  filename: string;
  downloadUrl?: string;
  showCopyLink?: boolean;
}

export function DownloadButton({ 
  onDownload, 
  filename, 
  downloadUrl, 
  showCopyLink = false 
}: DownloadButtonProps) {
  const copyLinkToClipboard = async () => {
    if (!downloadUrl) return;
    
    try {
      await navigator.clipboard.writeText(downloadUrl);
      toast.success('Download link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={onDownload}
        className="bg-green-600 hover:bg-green-700"
      >
        <Download className="w-4 h-4 mr-2" />
        Download {filename}
      </Button>
      
      {showCopyLink && downloadUrl && (
        <Button
          onClick={copyLinkToClipboard}
          variant="outline"
          size="sm"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Link
        </Button>
      )}
    </div>
  );
}
