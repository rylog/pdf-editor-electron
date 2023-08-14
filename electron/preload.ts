import { PDFFileData, PDFPageReference } from '@/shared/models';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  registerPDF: (fileData: PDFFileData) =>
    ipcRenderer.send('register-pdf', fileData),
  generatePDF: (pageReference: PDFPageReference[]) =>
    ipcRenderer.send('generate-pdf', pageReference),
});
