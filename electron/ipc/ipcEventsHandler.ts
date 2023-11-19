import { PDFFileData, PDFPageReference } from '@/shared/models';
import { BrowserWindow, ipcMain } from 'electron';
import { container, inject, singleton } from 'tsyringe';
import { PdfService } from '../pdfService';
import ipcEvents from './ipcEvents';

// Using TSyringe to inject PdfService
@singleton()
class IpcEventsHandler {
  constructor(
    private pdfService: PdfService,
    @inject('BrowserWindow')
    private mainWindow: BrowserWindow
  ) {
    this.pdfService = container.resolve(PdfService);
  }

  public setupIpcEventsHandler() {
    ipcMain.on(
      ipcEvents.GENERATE_PDF,
      (_, pageReferences: PDFPageReference[]) =>
        this.pdfService.generatePDF(this.mainWindow, pageReferences)
    );

    ipcMain.on(
      ipcEvents.REGISTER_PDF_FILES,
      (event, filesData: PDFFileData[]) => {
        this.pdfService.registerPDFFiles(filesData);
        event.sender.send(ipcEvents.REGISTER_PDF_FILES_COMPLETED);
      }
    );
    ipcMain.on(ipcEvents.MINIMIZE, () => {
      this.mainWindow.minimize();
    });
    ipcMain.on(ipcEvents.MAXIMIZE, () => {
      if (this.mainWindow.isMaximized()) {
        this.mainWindow.unmaximize();
      } else {
        this.mainWindow.maximize();
      }
    });
    ipcMain.on(ipcEvents.CLOSE, () => {
      this.mainWindow.close();
    });
  }
}

export default IpcEventsHandler;
