import { InputBox } from 'client/components/InputBox';
import type { Post } from 'db/db.types';
import { db } from 'db/lowdb';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { chan } from 'util/ipc.registry';

async function delete_post(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  del_id: string
) {
  e.preventDefault();

  await db.read();

  db.data.posts = db.data.posts.filter(({ id }) => id !== del_id);

  await db.write();

  ipcRenderer.send(chan.db.posts.read.many.send);
}

export function A() {
  const [message, setMessage] = useState<string>('loading');
  const [posts, setPosts] = useState<Post[]>([
    { id: '0', title: '', content: 'loading...' },
  ]);

  useEffect(() => {
    ipcRenderer.send(chan.message.send);
    ipcRenderer.send(chan.db.posts.read.many.send);

    ipcRenderer.on(chan.message.receive, (_e, data) => setMessage(data));
    ipcRenderer.on(chan.db.posts.read.many.receive, (_e, data) =>
      setPosts(data)
    );

    return () => {
      ipcRenderer.removeAllListeners(chan.message.send);
      ipcRenderer.removeAllListeners(chan.message.receive);
      ipcRenderer.removeAllListeners(chan.db.posts.read.many.send);
      ipcRenderer.removeAllListeners(chan.db.posts.read.many.receive);
    };
  }, []);

  return (
    <div className='center'>
      <div>A</div>
      <br />
      <div>{message}</div>
      <br />
      <InputBox />
      <div style={{ textAlign: 'center', marginTop: '1em' }}>
        {posts.length > 0 &&
          posts.map(({ id, title, content }) => (
            <div key={id} className='center'>
              <div>{title}</div>
              <div>{content}</div>
              <div
                style={{ cursor: 'pointer', width: 'min-content' }}
                onClick={(e) => delete_post(e, id)}
              >
                x
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
