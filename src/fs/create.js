/* create.js - implement function that creates new file fresh.txt with content
   "I am fresh and young" inside of the files folder (if file already exists
   Error with message FS operation failed must be thrown) */

import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = join(__dirname, 'files', 'fresh.txt');

  try {
    await fs.access(filePath);

    throw new Error('File already exist');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, 'I am fresh and young');
    } else {
      throw new Error('FS operation failed');
    }
  }
};

await create();
