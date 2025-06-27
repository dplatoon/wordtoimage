
import { jsPDF } from 'jspdf';

export interface PDFOptions {
  pageSize: string;
  orientation: 'portrait' | 'landscape';
  imagesPerPage: number;
}

export class PDFGenerationService {
  private static getPageDimensions(pageSize: string): [number, number] {
    const pageSizes: Record<string, [number, number]> = {
      'A4': [210, 297],
      'A3': [297, 420],
      'Letter': [216, 279],
      'Legal': [216, 356]
    };
    return pageSizes[pageSize] || pageSizes['A4'];
  }

  static async generatePDF(files: File[], options: PDFOptions, onProgress: (progress: number) => void): Promise<string> {
    const { pageSize, orientation, imagesPerPage } = options;
    const [width, height] = this.getPageDimensions(pageSize);
    const pageWidth = orientation === 'landscape' ? height : width;
    const pageHeight = orientation === 'landscape' ? width : height;

    // Create jsPDF instance with proper constructor arguments
    const doc = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: [pageWidth, pageHeight]
    });

    const imagesPerPageNum = parseInt(imagesPerPage.toString());
    const margin = 10;
    const availableWidth = pageWidth - (2 * margin);
    const availableHeight = pageHeight - (2 * margin);

    let currentPage = 0;
    let imagesOnCurrentPage = 0;

    for (let i = 0; i < files.length; i++) {
      onProgress((i / files.length) * 90);

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
    return URL.createObjectURL(pdfBlob);
  }
}
