import { PDFFileData, PDFPageReference } from './shared/models';

export interface IElectronAPI {
  registerPDF: (fileData: PDFFileData) => Promise<void>;
  generatePDF: (pageReferences: PDFPageReference[]) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
