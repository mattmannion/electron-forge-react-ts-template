import type { Post } from 'db/db.types';
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { v4 } from 'uuid';

interface Data {
  posts: Post[];
}

const file = join(
  dirname(fileURLToPath(import.meta.url)),
  'database',
  'db.json'
);
export const db = new Low<Data>(new JSONFile<Data>(file));

// Read data from JSON file, this will set db.data content
export async function lowInit() {
  try {
    await db.read();

    // If the file exists it will be left alone
    if (db.data) return;

    // If file.json doesn't exist, db.data is created.
    db.data = db.data || {
      posts: [
        {
          id: v4(),
          title: 'first post',
          content: 'hello world',
        },
      ],
    };

    // Write db.data content to db.json
    await db.write();
  } catch (error) {
    console.log(<Error>error.message);
  }
}
