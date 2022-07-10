import { InputBox } from 'client/app/A/InputBox';
import { Posts } from 'client/app/A/Posts';
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
    ipcRenderer.send(chan.message.send, 'a message from react');
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
      ipcRenderer.removeAllListeners(chan.db.posts.delete.one.send);
      ipcRenderer.removeAllListeners(chan.db.posts.delete.one.receive);
    };
  }, []);

  return (
    <div className='center'>
      <div>A</div>
      <br />
      {/* <div>{message}</div> */}
      <button
        className='btn'
        onClick={() => {
          ipcRenderer.send(chan.message.send, 'a message from react');
        }}
      >
        send something
      </button>
      <br />
      <InputBox setPosts={setPosts} />
      <Posts
        setPosts={setPosts}
        posts={posts.sort((a, b) => (b.id > a.id ? 1 : -1))}
      />
    </div>
  );
}
