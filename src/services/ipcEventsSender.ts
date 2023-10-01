import { PDFFileData, PDFPageReference } from '@/shared/models';

const ipcEventSender = {
  registerPDFFiles: (filesData: PDFFileData[]) => {
    return window.electronAPI.registerPDFFiles(filesData);
  },

  generatePDF: (pageReferences: PDFPageReference[]) => {
    window.electronAPI.generatePDF(pageReferences);
  },
};

export default ipcEventSender;
