import { PDFFileData, PDFPageReference } from './shared/models';

export interface IElectronAPI {
  clearPDFFiles: () => void;
  registerPDFFiles: (filesData: PDFFileData[]) => Promise<void>;
  generatePDF: (pageReferences: PDFPageReference[]) => void;
  getTheme: () => Promise<string>;
  changeTheme: (theme: string) => void;
  show: () => void;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
