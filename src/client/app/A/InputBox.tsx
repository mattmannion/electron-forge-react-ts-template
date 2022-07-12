import type { Post } from 'db/db.types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ipcRenderer } from 'electron';
import { chan } from 'util/ipc.registry';

interface InputBox {
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
      }}
    >
      {error && touched ? <div>Required</div> : <div>&nbsp;</div>}
    </div>
  );
}

function submit(
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  title: string,
  content: string
) {
  ipcRenderer.send(chan.db.posts.insert.one.s, title, content);
  ipcRenderer.on(chan.db.posts.insert.one.r, (_e, data) => setPosts(data));
}

export function InputBox({ setPosts }: InputBox) {
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

    onSubmit: function ({ title, content }) {
      submit(setPosts, title, content);
      resetForm();
    },
  });

  return (
    <form className='center' onSubmit={handleSubmit}>
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
