import type { Posts } from 'db/db.types';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { chan } from 'util/ipc.registry';

export function A() {
  const [message, setMessage] = useState<string>('loading');
  const [posts, setPosts] = useState<Posts[]>([
    { id: 0, title: '', content: 'loading...' },
  ]);

  useEffect(function () {
    ipcRenderer.send(chan.message.send);
    ipcRenderer.send(chan.db.posts.read.many.send);

    ipcRenderer.on(chan.message.receive, function (_e, data) {
      setMessage(data);
    });
    ipcRenderer.on(chan.db.posts.read.many.receive, function (_e, data) {
      setPosts(data);
    });

    return function () {
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
      <button className='btn' onClick={function () {}}>
        btn
      </button>
      <div style={{ textAlign: 'center', marginTop: '1em' }}>
        {posts.length > 0 &&
          posts.map(({ id, title, content }, i) => (
            <div key={id}>
              <div>
                {title} - {id}
              </div>
              <div>{content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
