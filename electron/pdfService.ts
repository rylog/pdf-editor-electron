import { PDFFileData, PDFPageReference } from '@/shared/models';
import { dialog } from 'electron';
import * as fs from 'fs';
import { PDFDocument } from 'pdf-lib';

export class PdfService {
  private pdfDocumentMap = new Map<number, PDFDocument>();

  async generatePDF(pageReferences: PDFPageReference[]) {
    const pdfDoc = await PDFDocument.create();
    for (const { fileId, pageIndex } of pageReferences) {
      const sourceDocument = this.pdfDocumentMap.get(fileId);

      if (sourceDocument) {
        // Copy the page before adding it to the new PDF
        const copiedPage = await pdfDoc.copyPages(sourceDocument, [pageIndex]);
        pdfDoc.addPage(copiedPage[0]);
      }
    }
    console.log('here');
    // Serialize the PDF document to ArrayBuffer
    const pdfBytes = await pdfDoc.save();

    // Show save dialog
    const dialogResult = await dialog.showSaveDialog({
      defaultPath: 'output.pdf', // Default file name and path
      filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
    });

    // Save the PDF to the chosen location
    if (!dialogResult.canceled) {
      const filePath = dialogResult.filePath;
      try {
        if (filePath != null) {
          await fs.promises.writeFile(filePath, pdfBytes);
        }
      } catch (error) {
        console.error('Error saving PDF:', error);
      }
    }
  }

  async registerPDF(fileData: PDFFileData): Promise<void> {
    const document = await PDFDocument.load(fileData.data);
    this.pdfDocumentMap.set(fileData.id, document);
  }
}
