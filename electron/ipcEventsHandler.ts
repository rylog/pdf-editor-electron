import { PDFFileData, PDFPageReference } from '@/shared/models';
import { ipcMain } from 'electron';
import ipcEvents from './ipc/ipcEvents';
import { PdfService } from './pdfService';

const pdfService = new PdfService();

export function setupIpcEventsHandler() {
  ipcMain.on(ipcEvents.GENERATE_PDF, (_, pageReferences: PDFPageReference[]) =>
    pdfService.generatePDF(pageReferences)
  );

  ipcMain.on(ipcEvents.REGISTER_PDF, (_, fileData: PDFFileData) =>
    pdfService.registerPDF(fileData)
  );
}
