import type { Post } from 'db/db.types';
import { EditPostModal } from 'client/components/EditPostModal';
import { DeletePostBtn } from 'client/components/DeletePostBtn';

interface Posts {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export function Posts({ posts, setPosts }: Posts) {
  return (
    <div style={{ textAlign: 'center', marginTop: '1em' }}>
      {posts.length > 0 &&
        posts.map((post) => (
          <div
            key={post.id}
            className='center'
            style={{ border: '1px white solid' }}
          >
            <div>{post.title}</div>
            <div>{post.content}</div>
            <DeletePostBtn setPosts={setPosts} {...post} />
            <EditPostModal setPosts={setPosts} {...post} />
          </div>
        ))}
    </div>
  );
}
