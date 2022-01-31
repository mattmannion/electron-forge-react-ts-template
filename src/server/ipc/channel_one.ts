import { ipcMain } from 'electron';
import { channel_one, channel_two } from 'util/ipc_registry';

ipcMain.on(channel_one, (e) => {
<<<<<<< HEAD
  e.sender.send(channel_two, 'message m');
=======
  e.sender.send(channel_two, JSON.stringify({ a: 'one', b: 'two' }));
>>>>>>> 1a1f9fe2edfa5f850bf879c9a8a9eb11ecd47ed8
});
