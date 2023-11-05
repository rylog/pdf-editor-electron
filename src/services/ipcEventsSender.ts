import { PDFFileData, PDFPageReference } from '@/shared/models';

const ipcEventSender = {
  registerPDFFiles: (filesData: PDFFileData[]): Promise<void> => {
    return window.electronAPI.registerPDFFiles(filesData);
  },

  generatePDF: (pageReferences: PDFPageReference[]): void => {
    window.electronAPI.generatePDF(pageReferences);
  },

  changeTheme: (theme: string): void => {
    window.electronAPI.changeTheme(theme);
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
};

export default ipcEventSender;
