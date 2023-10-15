import { PDFFileData, PDFPageReference } from '@/shared/models';
import { ipcMain } from 'electron';
import { container, singleton } from 'tsyringe';
import ipcEvents from './ipcEvents';
import { PdfService } from '../pdfService';

// Using TSyringe to inject PdfService
@singleton()
class IpcEventsHandler {
  constructor(private pdfService: PdfService) {
    this.pdfService = container.resolve(PdfService);
  }

  public setupIpcEventsHandler() {
    ipcMain.on(
      ipcEvents.GENERATE_PDF,
      (_, pageReferences: PDFPageReference[]) =>
        this.pdfService.generatePDF(pageReferences)
    );

    ipcMain.on(
      ipcEvents.REGISTER_PDF_FILES,
      (event, filesData: PDFFileData[]) => {
        this.pdfService.registerPDFFiles(filesData);
        event.sender.send(ipcEvents.REGISTER_PDF_FILES_COMPLETED);
      }
    );
  }
}

export default IpcEventsHandler;
