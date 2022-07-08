import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { channel_db, channel_one, channel_two } from 'util/ipc_registry';

export function A() {
  const [message, setMessage] = useState<string>('hi');
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(function () {
    ipcRenderer.on(channel_two, (_e, data) => {
      setMessage(data);
    });
    ipcRenderer.on(channel_db.receive, (_e, data) => {
      console.log(data);
      setPosts(data);
    });
    return function () {
      ipcRenderer.removeAllListeners(channel_one);
      ipcRenderer.removeAllListeners(channel_two);
      ipcRenderer.removeAllListeners(channel_db.send);
      ipcRenderer.removeAllListeners(channel_db.receive);
    };
  }, []);

  return (
    <div className='center'>
      <div>A</div>
      <button
        className='btn'
        onClick={() => {
          ipcRenderer.send(channel_one);
          ipcRenderer.send(channel_db.send);
        }}
      >
        btn
      </button>
      <br />
      <div>{message}</div>
      <ul>
        {posts.length > 0
          ? posts.map((post, i) => <li key={i}>{post}</li>)
          : null}
      </ul>
    </div>
  );
}
