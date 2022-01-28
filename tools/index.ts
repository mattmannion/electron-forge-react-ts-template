// @ts-ignore
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
//
import { app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    x: -100,
    y: -100,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDev) mainWindow.webContents.openDevTools({ mode: 'bottom' });
};

ipcMain.on('channel1', function (_e, args) {
  console.log(args);
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
