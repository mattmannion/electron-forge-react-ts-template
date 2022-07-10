import { ipcMain } from 'electron';
import { chan } from 'util/ipc.registry';

ipcMain.on(chan.message.send, (e, a) => {
  console.log(a);
});
