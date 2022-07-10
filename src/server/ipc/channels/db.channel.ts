import { db } from 'db/lowdb';
import { ipcMain } from 'electron';
import { chan } from 'util/ipc.registry';

ipcMain.on(chan.db.posts.read.many.send, async (e) => {
  async function readPosts() {
    await db.read();
    return db.data.posts;
  }
  try {
    e.sender.send(chan.db.posts.read.many.receive, await readPosts());
  } catch (error) {
    console.log((<Error>error).message);
  }
});

ipcMain.on(chan.db.posts.delete.one.send, async (e, del_id) => {
  try {
    await db.read();

    db.data.posts = db.data.posts.filter(({ id }) => id !== del_id);

    await db.write();

    e.sender.send(chan.db.posts.delete.one.receive, db.data.posts);
  } catch (error) {
    console.log((<Error>error).message);
  }
});

ipcMain.on(chan.db.posts.edit.one.send, async (e, id, title, content) => {
  try {
    await db.read();

    const { posts } = db.data;
    const edited_post = posts.filter((f) => f.id === id)[0];

    edited_post.title = title.trim();
    edited_post.content = content.trim();

    const previous_posts = posts.filter((f) => f.id !== id);

    previous_posts.push(edited_post);

    db.data.posts = previous_posts;

    await db.write();

    e.sender.send(chan.db.posts.edit.one.receive, db.data.posts);
  } catch (error) {
    console.log((<Error>error).message);
  }
});
