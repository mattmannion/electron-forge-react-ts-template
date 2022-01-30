import { ipcMain } from 'electron';
import { channel_one } from 'util/ipc_registry';

ipcMain.on(channel_one, (_e, args) => {
  console.log(args);
});
