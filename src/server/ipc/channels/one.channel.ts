import { ipcMain } from 'electron';
import { channel_one, channel_two } from 'util/ipc_registry';

ipcMain.on(channel_one, (e) => {
  e.sender.send(channel_two, 'message m');
});
