/* create.js - implement function that creates new file fresh.txt with content
   "I am fresh and young" inside of the files folder (if file already exists
   Error with message FS operation failed must be thrown) */

import { access, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const create = async () => {
  const filePath = join('files', 'fresh.txt');

  try {
    await access(filePath);

    throw new Error('File already exist');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(filePath, 'I am fresh and young');
    } else {
      throw new Error('FS operation failed');
    }
  }
};

await create();
