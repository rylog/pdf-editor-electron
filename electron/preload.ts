import { IElectronAPI } from '@/electron';
import { PDFFileData, PDFPageReference } from '@/shared/models';
import ipcEvents from './ipc/ipcEvents';

const { contextBridge, ipcRenderer } = require('electron');

const registerPDFFiles = (filesData: PDFFileData[]) => {
  return ipcRenderer.invoke(ipcEvents.REGISTER_PDF_FILES, filesData);
};

const electronAPI: IElectronAPI = {
  clearPDFFiles: () => {
    ipcRenderer.send(ipcEvents.CLEAR_PDF_FILES);
  },
  generatePDF: (pageReference: PDFPageReference[]) => {
    ipcRenderer.send(ipcEvents.GENERATE_PDF, pageReference);
  },
  registerPDFFiles,
  changeTheme: (theme: string) => {
    ipcRenderer.send(ipcEvents.CHANGE_THEME, theme);
  },
  minimize: () => {
    ipcRenderer.send(ipcEvents.MINIMIZE);
  },
  maximize: () => {
    ipcRenderer.send(ipcEvents.MAXIMIZE);
  },
  close: () => {
    ipcRenderer.send(ipcEvents.CLOSE);
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
