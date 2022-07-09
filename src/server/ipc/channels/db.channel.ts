import { db } from 'db/lowdb';
import { ipcMain } from 'electron';
import { chan } from 'util/ipc.registry';

ipcMain.on(chan.db.posts.read.many.send, async (e) => {
  async function readPosts() {
    await db.read();
    return db.data.posts;
  }
  e.sender.send(chan.db.posts.read.many.receive, await readPosts());
});
