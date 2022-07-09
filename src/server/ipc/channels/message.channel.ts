import { ipcMain } from 'electron';
import { chan } from 'util/ipc.registry';

ipcMain.on(chan.message.send, (e) => {
  e.sender.send(chan.message.receive, 'ipc working');
});
