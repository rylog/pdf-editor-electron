import { PDFFileData, PDFPageReference } from '@/shared/models';
import { ipcMain } from 'electron';
import { PdfService } from '../pdfService';
import ipcEvents from './ipcEvents';

const pdfService = new PdfService();

export function setupIpcEventsHandler() {
  ipcMain.on(ipcEvents.GENERATE_PDF, (_, pageReferences: PDFPageReference[]) =>
    pdfService.generatePDF(pageReferences)
  );

  ipcMain.on(
    ipcEvents.REGISTER_PDF_FILES,
    (event, filesData: PDFFileData[]) => {
      pdfService.registerPDFFiles(filesData);
      event.sender.send(ipcEvents.REGISTER_PDF_FILES_COMPLETED);
    }
  );
}
