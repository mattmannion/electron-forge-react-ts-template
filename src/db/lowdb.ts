import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'database', 'db.json');

interface Data {
  posts: string[];
}

export const db = new Low<Data>(new JSONFile<Data>(file));

// Read data from JSON file, this will set db.data content
export async function lowInit() {
  try {
    await db.read();
    // If file.json doesn't exist, db.data will be null
    // Set default data
    db.data = db.data || { posts: [] }; // Node < v15.x

    // You can also use this syntax if you prefer
    const { posts } = db.data;
    posts.push('hello world');

    // Write db.data content to db.json
    await db.write();
  } catch (error) {
    console.log(error);
  }
}
