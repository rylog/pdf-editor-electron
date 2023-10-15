import 'reflect-metadata';
import { container } from 'tsyringe';
import IpcEventsHandler from './ipc/ipcEventsHandler';

const { app, BrowserWindow } = require('electron');
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
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 32,
      color: '#ffffff',
    },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:9000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  // Instantiate the IpcEventsHandler and set up IPC event handlers
  const ipcEventsHandler = container.resolve(IpcEventsHandler);
  ipcEventsHandler.setupIpcEventsHandler();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
