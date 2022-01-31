import { db } from 'db/lowdb';
import { ipcMain } from 'electron';
import { channel_db } from 'util/ipc_registry';

ipcMain.on(channel_db.send, async (e) => {
  async function readPosts() {
    await db.read();
    return db.data.posts;
  }
  e.sender.send(channel_db.receive, await readPosts());
});
