import { PDFFileData, PDFPageReference } from '@/shared/models';
import { BrowserWindow, dialog } from 'electron';
import * as fs from 'fs';
import { PDFDocument, degrees } from 'pdf-lib';

export class PdfService {
  private pdfDocumentMap = new Map<number, PDFDocument>();

  async registerPDFFiles(filesData: PDFFileData[]): Promise<void> {
    for (const fileData of filesData) {
      const document = await PDFDocument.load(fileData.data);
      this.pdfDocumentMap.set(fileData.id, document);
    }
  }

  clearPDFFiles(): void {
    this.pdfDocumentMap.clear();
  }

  async generatePDF(window: BrowserWindow, pageReferences: PDFPageReference[]) {
    const pdfDoc = await PDFDocument.create();
    for (const { fileId, pageIndex, rotation } of pageReferences) {
      const sourceDocument = this.pdfDocumentMap.get(fileId);

      if (sourceDocument) {
        // Copy the page before adding it to the new PDF
        const copiedPage = await pdfDoc.copyPages(sourceDocument, [pageIndex]);
        copiedPage[0].setRotation(degrees(rotation));
        pdfDoc.addPage(copiedPage[0]);
      }
    }

    // Serialize the PDF document to ArrayBuffer
    const pdfBytes = await pdfDoc.save();

    // Show save dialog
    const dialogResult = await dialog.showSaveDialog(window, {
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
}
