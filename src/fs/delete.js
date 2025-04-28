/* delete.js - implement function that deletes file
   fileToRemove.txt (if there's no file fileToRemove.txt
   Error with message FS operation failed must be thrown) */

import * as fs from 'node:fs/promises';
import { join } from 'node:path';

const remove = async () => {
  const filePath = join('files', 'fileToRemove.txt');

  try {
    await fs.unlink(filePath);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await remove();
