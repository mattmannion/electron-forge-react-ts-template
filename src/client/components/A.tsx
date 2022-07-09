import ssb from 'client/components/btns.module';
import ssp from 'client/components/position.module';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { channel } from 'util/ipc.registry';

export function A() {
  const [message, setMessage] = useState<string>('hi');
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(function () {
    ipcRenderer.on(channel.message.receive, function (_e, data) {
      setMessage(data);
    });
    ipcRenderer.on(channel.db.receive, function (_e, data) {
      console.log(data);
      setPosts(data);
    });
    return function () {
      ipcRenderer.removeAllListeners(channel.message.send);
      ipcRenderer.removeAllListeners(channel.message.receive);
      ipcRenderer.removeAllListeners(channel.db.send);
      ipcRenderer.removeAllListeners(channel.db.receive);
    };
  }, []);

  return (
    <div className={ssp.center}>
      <div>A</div>
      <button
        className={ssb.btn}
        onClick={function () {
          ipcRenderer.send(channel.message.send);
          ipcRenderer.send(channel.db.send);
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
