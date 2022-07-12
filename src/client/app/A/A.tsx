import type { Post } from 'db/db.types';
import { InputBox } from 'client/app/A/InputBox';
import { Posts } from 'client/app/A/Posts';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { chan, ipcListeners } from 'util/ipc.registry';

export function A() {
  const [message, setMessage] = useState<string>('loading');
  const [posts, setPosts] = useState<Post[]>([
    { id: '0', title: '', content: 'loading...' },
  ]);

  useEffect(() => {
    ipcRenderer.send(chan.message.s, 'A');
    ipcRenderer.send(chan.db.posts.read.many.s);

    ipcRenderer.on(chan.message.r, (_e, data) => setMessage(data));
    ipcRenderer.on(chan.db.posts.read.many.r, (_e, data) => setPosts(data));

    // ipc cleanup
    return () => {
      ipcListeners.removeAll();
    };
  }, []);

  return (
    <div className='center'>
      <div>{message}</div>
      <InputBox setPosts={setPosts} />
      <Posts
        setPosts={setPosts}
        posts={posts.sort((a, b) => (b.id > a.id ? 1 : -1))}
      />
    </div>
  );
}
