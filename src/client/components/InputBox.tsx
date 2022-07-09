import type { Post } from 'db/db.types';
import { db } from 'db/lowdb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { v4 } from 'uuid';
import { ipcRenderer } from 'electron';
import { chan } from 'util/ipc.registry';

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
      }}
    >
      {error && touched ? <div>Required</div> : <div>&nbsp;</div>}
    </div>
  );
}

export function InputBox() {
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
      title: '',
      content: '',
    },

    validationSchema: yup.object({
      title: yup.string().required('Must enter a title'),
      content: yup.string().required('Must enter some content'),
    }),

    onSubmit: async function ({ title, content }) {
      try {
        await db.read();

        db.data.posts.push({
          id: v4(),
          title: title.trim(),
          content: content.trim(),
        });

        await db.write();
        ipcRenderer.send(chan.db.posts.read.many.send);

        resetForm();
      } catch (error) {
        console.log((error as Error).message);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className='center'>
      <div>New Post</div>
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
      <button className='btn' type='submit'>
        enter
      </button>
    </form>
  );
}
