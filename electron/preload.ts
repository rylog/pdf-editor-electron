import { IElectronAPI } from '@/electron';
import { PDFFileData, PDFPageReference } from '@/shared/models';
import ipcEvents from './ipc/ipcEvents';

const { contextBridge, ipcRenderer } = require('electron');

const electronAPI: IElectronAPI = {
  generatePDF: (pageReference: PDFPageReference[]) =>
    ipcRenderer.send(ipcEvents.GENERATE_PDF, pageReference),
  registerPDFFiles: (filesData: PDFFileData[]) =>
    ipcRenderer.send(ipcEvents.REGISTER_PDF_FILES, filesData),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
