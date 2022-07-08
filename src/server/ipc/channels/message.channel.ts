import { ipcMain } from 'electron';
import { channel } from 'util/ipc.registry';

ipcMain.on(channel.message.send, (e) => {
  e.sender.send(channel.message.receive, 'message m');
});
