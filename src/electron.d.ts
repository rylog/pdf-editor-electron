import { PDFFileData, PDFPageReference } from './shared/models';

export interface IElectronAPI {
  registerPDFFiles: (filesData: PDFFileData[]) => Promise<void>;
  generatePDF: (pageReferences: PDFPageReference[]) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
