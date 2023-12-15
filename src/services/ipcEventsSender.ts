import { IElectronAPI } from '@/electron';
import { PDFFileData, PDFPageReference } from '@/shared/models';

const ipcEventSender: IElectronAPI = {
  registerPDFFiles: (filesData: PDFFileData[]): Promise<void> => {
    return window.electronAPI.registerPDFFiles(filesData);
  },

  clearPDFFiles: (): void => {
    window.electronAPI.clearPDFFiles();
  },

  generatePDF: (pageReferences: PDFPageReference[]): void => {
    window.electronAPI.generatePDF(pageReferences);
  },

  changeTheme: (theme: string): void => {
    window.electronAPI.changeTheme(theme);
  },

  show: (): void => {
    window.electronAPI.show();
  },

  minimize: (): void => {
    window.electronAPI.minimize();
  },

  maximize: (): void => {
    window.electronAPI.maximize();
  },

  close: (): void => {
    window.electronAPI.close();
  },
  getTheme: (): Promise<string> => {
    return window.electronAPI.getTheme();
  },
};

export default ipcEventSender;
