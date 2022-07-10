import { InputBox } from 'client/components/InputBox';
import { Posts } from 'client/components/Posts';
import type { Post } from 'db/db.types';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { chan } from 'util/ipc.registry';

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
      <Posts posts={posts.sort((a, b) => (b.id > a.id ? 1 : -1))} />
    </div>
  );
}
