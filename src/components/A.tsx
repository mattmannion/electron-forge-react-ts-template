import { ipcRenderer } from 'electron';

interface AProps {
  ipcR: any;
}

export function A() {
  return (
    <div className='center'>
      <div>A</div>
      <button
        className='btn'
        onClick={() => {
          ipcRenderer.send('channel1', 'it worked');
        }}
      >
        btn
      </button>
    </div>
  );
}
