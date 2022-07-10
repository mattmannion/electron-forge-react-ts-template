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

ipcMain.on(chan.db.posts.delete.one.send, async (e, del_id) => {
  await db.read();

  db.data.posts = db.data.posts.filter(({ id }) => id !== del_id);

  await db.write();

  e.sender.send(chan.db.posts.delete.one.receive, db.data.posts);
});
