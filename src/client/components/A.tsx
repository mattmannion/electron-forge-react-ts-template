import { ipcRenderer } from 'electron';

export function A() {
  return (
    <div className='center'>
      <div>A</div>
      <button
        className='btn'
        onClick={() => {
          ipcRenderer.send('channel1');
        }}
      >
        btn
      </button>
    </div>
  );
}
