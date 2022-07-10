import type { Post } from 'db/db.types';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ipcRenderer } from 'electron';
import { chan } from 'util/ipc.registry';
import Modal from 'react-bootstrap/esm/Modal';

interface EditPostModal extends Post {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

interface FormError {
  error: string | undefined;
  touched: boolean | undefined;
}

function Error({ error, touched }: FormError) {
  return (
    <div
      className='contact__error'
      style={{
        textAlign: 'center',
        color: 'black',
      }}
    >
      {error && touched ? <div>Required</div> : <div>&nbsp;</div>}
    </div>
  );
}

function submit(
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  id: string,
  title: string,
  content: string
) {
  ipcRenderer.send(chan.db.posts.edit.one.send, id, title, content);
  ipcRenderer.on(chan.db.posts.edit.one.receive, (e, data) => setPosts(data));
}

export function EditPostModal({ setPosts, id, title, content }: EditPostModal) {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik<Post>({
      initialValues: {
        title,
        content,
      },

      validationSchema: yup.object({
        title: yup.string().required('Must enter a title'),
        content: yup.string().required('Must enter some content'),
      }),

      onSubmit: async function ({ title, content }) {
        try {
          submit(setPosts, id, title, content);
        } catch (error) {
          console.log((error as Error).message);
        }
      },
    });

  return (
    <>
      <button onClick={handleShow} className='btn'>
        edit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ color: 'black' }}>Edit Post</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='center' onSubmit={handleSubmit}>
            <br />
            <div
              style={{
                width: '350px',
              }}
            >
              <input
                name='title'
                placeholder='title'
                type='text'
                style={{ textAlign: 'center', fontSize: '1em', width: '100%' }}
                onChange={handleChange}
                value={values.title}
                onBlur={handleBlur}
              />
              <Error error={errors.title} touched={touched.title} />
            </div>
            <div
              style={{
                width: '350px',
              }}
            >
              <textarea
                name='content'
                placeholder='content'
                style={{
                  textAlign: 'center',
                  fontSize: '1em',
                  width: '100%',
                  height: '100px',
                }}
                onChange={handleChange}
                value={values.content}
                onBlur={handleBlur}
              />
              <Error error={errors.content} touched={touched.content} />
            </div>
            <button className='btn' type='submit' onClick={handleClose}>
              enter
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
