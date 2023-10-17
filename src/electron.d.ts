import { PDFFileData, PDFPageReference } from './shared/models';

export interface IElectronAPI {
  registerPDFFiles: (filesData: PDFFileData[]) => Promise<void>;
  generatePDF: (pageReferences: PDFPageReference[]) => void;
  changeTheme: (theme: string) => void;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
