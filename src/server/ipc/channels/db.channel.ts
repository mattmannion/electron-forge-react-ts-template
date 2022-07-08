import { db } from 'db/lowdb';
import { ipcMain } from 'electron';
import { channel } from 'util/ipc.registry';

ipcMain.on(channel.db.send, async (e) => {
  async function readPosts() {
    await db.read();
    return db.data.posts;
  }
  e.sender.send(channel.db.receive, await readPosts());
});
