import { PDFFileData, PDFPageReference } from '@/shared/models';

const ipcEventSender = {
  registerPDFFiles: (filesData: PDFFileData[]) => {
    return window.electronAPI.registerPDFFiles(filesData);
  },

  generatePDF: (pageReferences: PDFPageReference[]) => {
    window.electronAPI.generatePDF(pageReferences);
  },

  changeTheme: (theme: string) => {
    window.electronAPI.changeTheme(theme);
  },

  minimize: () => {
    window.electronAPI.minimize();
  },

  maximize: () => {
    window.electronAPI.maximize();
  },

  close: () => {
    window.electronAPI.close();
  },
};

export default ipcEventSender;
