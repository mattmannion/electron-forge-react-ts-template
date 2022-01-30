import install, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import isDev from 'electron-is-dev';

import { app, BrowserWindow } from 'electron';
import { win_cfg } from 'util/window';

// registers main weback bundles??
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

if (require('electron-squirrel-startup')) {
  app.quit();
}

export function createWindow() {
  const mainWindow = new BrowserWindow({
    ...win_cfg({ height: 600, width: 800 }),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // I guess this loads webpack bundles??
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Allows this block of code to be disabled in prod
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'left' });

    install(REACT_DEVELOPER_TOOLS)
      .then((name) => {
        console.log(`Added Extension:  ${name}`);
      })
      .catch((err) => {
        console.log('An error occurred: ', err);
      });
  }
}

/**
 * All IPC calls are collected below.
 * This import is needed here for proper
 * execution of IPC in the main process.
 */

import 'server/ipc/IPC_MAIN';

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
