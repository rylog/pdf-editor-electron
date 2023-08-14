import { PDFFileData, PDFPageReference } from '@/shared/models';
import { dialog } from 'electron';

export class PdfService {
  private pdfArrayBuffersMap = new Map<number, ArrayBuffer>();

  getPdfArrayBuffers(fileId: number): ArrayBuffer | undefined {
    return this.pdfArrayBuffersMap.get(fileId);
  }

  async generatePDF(pageReferences: PDFPageReference[]) {
    console.log(pageReferences);
    const dialogResult = await dialog.showSaveDialog({
      defaultPath: 'output.pdf', // Default file name and path
      filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
    });

    if (!dialogResult.canceled) {
      const filePath = dialogResult.filePath;
    }
  }

  registerPDF(fileData: PDFFileData): void {
    this.pdfArrayBuffersMap.set(fileData.id, fileData.data);
  }
}
