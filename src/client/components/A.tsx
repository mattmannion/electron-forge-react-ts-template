import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { channel_one, channel_two } from 'util/ipc_registry';

export function A() {
  const [message, setMessage] = useState<string>('hi');

  useEffect(function () {
    ipcRenderer.on(channel_two, (_e, args) => {
      setMessage(args);
    });
  }, []);

  return (
    <div className='center'>
      <div>A</div>
      <button
        className='btn'
        onClick={() => {
          ipcRenderer.send(channel_one);
        }}
      >
        btn
      </button>
      <div>{message}</div>
    </div>
  );
}
