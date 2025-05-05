/* delete.js - implement function that deletes file
   fileToRemove.txt (if there's no file fileToRemove.txt
   Error with message FS operation failed must be thrown) */

import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const filePath = join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await fs.unlink(filePath);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await remove();
