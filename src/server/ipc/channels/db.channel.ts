import { ipcMain } from 'electron';
import { db } from 'db/lowdb';
import { v4 } from 'uuid';
import { chan } from 'util/ipc.registry';
import { CatchError } from 'util/util';

ipcMain.on(chan.db.posts.read.many.send, async (e) => {
  try {
    await db.read();
    e.sender.send(chan.db.posts.read.many.receive, db.data.posts);
  } catch (error) {
    CatchError(error);
  }
});

ipcMain.on(chan.db.posts.delete.one.send, async (e, del_id) => {
  try {
    await db.read();

    db.data.posts = db.data.posts.filter(({ id }) => id !== del_id);

    await db.write();

    e.sender.send(chan.db.posts.delete.one.receive, db.data.posts);
  } catch (error) {
    CatchError(error);
  }
});

ipcMain.on(chan.db.posts.edit.one.send, async (e, id, title, content) => {
  try {
    await db.read();

    const { posts } = db.data;

    // finds the target post to edit
    const edited_post = posts.filter((f) => f.id === id)[0];

    edited_post.title = title.trim();
    edited_post.content = content.trim();

    // collects the previous posts minus the edited post
    const previous_posts = posts.filter((f) => f.id !== id);

    // adds the edited post to the previous posts
    previous_posts.push(edited_post);

    // overrides the posts to reflect the new changes
    db.data.posts = previous_posts;

    await db.write();

    e.sender.send(chan.db.posts.edit.one.receive, db.data.posts);
  } catch (error) {
    CatchError(error);
  }
});

ipcMain.on(chan.db.posts.insert.one.send, async (e, title, content) => {
  try {
    await db.read();

    db.data.posts.push({
      id: v4(),
      title: title.trim(),
      content: content.trim(),
    });

    await db.write();

    e.sender.send(chan.db.posts.insert.one.receive, db.data.posts);
  } catch (error) {
    CatchError(error);
  }
});
