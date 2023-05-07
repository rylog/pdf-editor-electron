const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  savePDF: (blob: Blob) => ipcRenderer.send('save-PDF', blob),
});
