import { ipcRenderer } from 'electron';
import { channel_one } from 'util/ipc_registry';

export function A() {
  return (
    <div className='center'>
      <div>A</div>
      <button
        className='btn'
        onClick={() => {
          ipcRenderer.send(channel_one, 'it worked');
        }}
      >
        btn
      </button>
    </div>
  );
}
