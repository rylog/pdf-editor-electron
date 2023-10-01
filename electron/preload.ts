import { IElectronAPI } from '@/electron';
import { PDFFileData, PDFPageReference } from '@/shared/models';
import ipcEvents from './ipc/ipcEvents';

const { contextBridge, ipcRenderer } = require('electron');

const sendAndWaitForResponse = <TRequest, TResponse>(
  eventType: string,
  requestData: TRequest,
  timeoutDuration = 5000
): Promise<TResponse> => {
  return new Promise<TResponse>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('IPC event timeout'));
      ipcRenderer.removeAllListeners(`${eventType}-completed`);
    }, timeoutDuration);

    ipcRenderer.once(`${eventType}-completed`, (_, response: TResponse) => {
      clearTimeout(timeout);
      resolve(response);
    });

    ipcRenderer.send(eventType, requestData);
  });
};

const registerPDFFiles = (filesData: PDFFileData[]) => {
  return sendAndWaitForResponse<PDFFileData[], void>(
    ipcEvents.REGISTER_PDF_FILES,
    filesData
  );
};

const electronAPI: IElectronAPI = {
  generatePDF: (pageReference: PDFPageReference[]) => {
    ipcRenderer.send(ipcEvents.GENERATE_PDF, pageReference);
  },
  registerPDFFiles,
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
