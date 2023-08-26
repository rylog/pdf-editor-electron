import { PDFFileData, PDFPageReference } from '@/shared/models';

const ipcEventSender = {
  registerPDF: (fileData: PDFFileData) => {
    window.electronAPI.registerPDF(fileData);
  },

  generatePDF: (pageReferences: PDFPageReference[]) => {
    window.electronAPI.generatePDF(pageReferences);
  },
};

export default ipcEventSender;
