import { setupIpcEventsHandler } from './ipcEventsHandler';
import { PdfService } from './pdfService';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    // autoHideMenuBar: true,
    // titleBarStyle: 'hidden',
    // titleBarOverlay: {
    //   height: 32,
    //   color: '#ffffff',
    // },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:9000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );
};

const pdfService = new PdfService();

app.whenReady().then(() => {
  createWindow();
  setupIpcEventsHandler();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
