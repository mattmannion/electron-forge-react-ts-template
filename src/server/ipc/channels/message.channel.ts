import { ipcMain } from 'electron';
import { chan } from 'util/ipc.registry';

// a reminder on how to receive data and send it back
ipcMain.on(chan.message.s, (e, a) => {
  console.log(a);

  e.sender.send(chan.message.r, a);
});
