import 'reflect-metadata';
import { container } from 'tsyringe';
import IpcEventsHandler from './ipc/ipcEventsHandler';

const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const iconPath = path.join(__dirname, '../assets/fluid_256.png');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 667,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    show: false,
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:9000'
      : `file://${path.join(__dirname, 'index.html')}`
  );

  return mainWindow;
};

app.whenReady().then(() => {
  const mainWindow = createWindow();
  container.register<Electron.CrossProcessExports.BrowserWindow>(
    'BrowserWindow',
    { useValue: mainWindow }
  );
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
