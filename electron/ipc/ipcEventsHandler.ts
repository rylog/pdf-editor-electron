import { PDFFileData, PDFPageReference } from '@/shared/models';
import { BrowserWindow, ipcMain, nativeTheme } from 'electron';
import settings from 'electron-settings';
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

  getThemeMode = async () => {
    if (await settings.has('theme')) {
      return settings.get('theme');
    }
    return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
  };

  public setupIpcEventsHandler() {
    ipcMain.handle(
      ipcEvents.REGISTER_PDF_FILES,
      (_, filesData: PDFFileData[]) => {
        this.pdfService.registerPDFFiles(filesData);
        return;
      }
    );

    ipcMain.on(
      ipcEvents.GENERATE_PDF,
      (_, pageReferences: PDFPageReference[]) =>
        this.pdfService.generatePDF(this.mainWindow, pageReferences)
    );

    ipcMain.on(ipcEvents.CLEAR_PDF_FILES, () =>
      this.pdfService.clearPDFFiles()
    );

    ipcMain.handle(ipcEvents.GET_THEME, async () => {
      return this.getThemeMode();
    });

    ipcMain.on(ipcEvents.CHANGE_THEME, (_, theme: 'light' | 'dark') => {
      settings.set('theme', theme);
    });

    //window events
    ipcMain.on(ipcEvents.SHOW, () => {
      this.mainWindow.show();
    });
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
