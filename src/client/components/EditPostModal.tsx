import type { Post } from 'db/db.types';
import { useState } from 'react';
import { db } from 'db/lowdb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ipcRenderer } from 'electron';
import { chan } from 'util/ipc.registry';
import Modal from 'react-bootstrap/esm/Modal';

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

export function EditPostModal({ id, title, content }: Post) {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    resetForm,
    handleBlur,
  } = useFormik<Post>({
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
        await db.read();

        const { posts } = db.data;
        const edited_post = posts.filter((f) => f.id === id)[0];

        edited_post.title = title.trim();
        edited_post.content = content.trim();

        const previous_posts = posts.filter((f) => f.id !== id);

        previous_posts.push(edited_post);

        db.data.posts = previous_posts;

        await db.write();

        ipcRenderer.send(chan.db.posts.read.many.send);

        // resetForm();
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
