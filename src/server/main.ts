/* @ts-ignore */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
/**************/
require('dotenv').config();
import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import isDev from 'electron-is-dev';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 720,
    width: 972,
    x: -6,
    y: 0,

    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'left' });

    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => {
        console.log(`Added Extension:  ${name}`);
      })
      .catch((err) => {
        console.log('An error occurred: ', err);
      });
  }
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
