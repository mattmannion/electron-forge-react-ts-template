import type { Post } from 'db/db.types';
import { db } from 'db/lowdb';
import { ipcRenderer } from 'electron';
import { useState } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import { chan } from 'util/ipc.registry';

async function delete_post(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  del_id: string
) {
  e.preventDefault();

  await db.read();

  db.data.posts = db.data.posts.filter(({ id }) => id !== del_id);

  await db.write();

  ipcRenderer.send(chan.db.posts.read.many.send);
}

export function DeletePostBtn({ id, title, content }: Post) {
  const [show, setShow] = useState(false);

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
              onClick={(e) => delete_post(e, id)}
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
