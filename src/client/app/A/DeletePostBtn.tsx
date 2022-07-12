import type { Post } from 'db/db.types';
import { ipcRenderer } from 'electron';
import { useState } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import { chan } from 'util/ipc.registry';

interface DeletePostBtn extends Post {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

function delete_post(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  handleClose: () => void,
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  del_id: string
) {
  e.preventDefault();

  ipcRenderer.send(chan.db.posts.delete.one.s, del_id);
  ipcRenderer.on(chan.db.posts.delete.one.r, (e, data) => setPosts(data));

  handleClose();
}

export function DeletePostBtn({ id, setPosts }: DeletePostBtn) {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        style={{
          cursor: 'pointer',
          width: 'min-content',
          backgroundColor: 'red',
        }}
        onClick={handleShow}
        className='btn'
      >
        Delete
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ color: 'black' }}>Delete this Post?</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}
          >
            <button
              style={{
                cursor: 'pointer',
                width: 'min-content',
                backgroundColor: 'green',
              }}
              onClick={(e) => delete_post(e, handleClose, setPosts, id)}
              className='btn'
            >
              yes
            </button>
            <button
              style={{
                cursor: 'pointer',
                width: 'min-content',
                backgroundColor: 'red',
              }}
              onClick={handleClose}
              className='btn'
            >
              no
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
