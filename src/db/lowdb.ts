import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

interface Data {
  posts: string[];
}

export const db = new Low<Data>(
  new JSONFile<Data>(
    join(dirname(fileURLToPath(import.meta.url)), 'database', 'db.json')
  )
);

// Read data from JSON file, this will set db.data content
export async function lowInit() {
  try {
    await db.read();
    // If file.json doesn't exist, db.data will be null
    db.data = db.data || { posts: [] };

    const { posts } = db.data;
    posts.push('hello world');

    // Write db.data content to db.json
    await db.write();
  } catch (error) {
    console.log(error);
  }
}
