import { PDFFileData, PDFPageReference } from '@/shared/models';
import ipcEvents from './ipcEvents';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  generatePDF: (pageReference: PDFPageReference[]) =>
    ipcRenderer.send(ipcEvents.GENERATE_PDF, pageReference),
  registerPDF: (fileData: PDFFileData) =>
    ipcRenderer.send(ipcEvents.REGISTER_PDF, fileData),
});
