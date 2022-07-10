import type { Post } from 'db/db.types';
import { EditPostModal } from 'client/components/EditPostModal';
import { DeletePostBtn } from 'client/components/DeletePostBtn';

interface Posts {
  posts: Post[];
}

export function Posts({ posts }: Posts) {
  return (
    <div style={{ textAlign: 'center', marginTop: '1em' }}>
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post.id} className='center'>
            <div>{post.title}</div>
            <div>{post.content}</div>
            <DeletePostBtn {...post} />
            <EditPostModal {...post} />
          </div>
        ))}
    </div>
  );
}
