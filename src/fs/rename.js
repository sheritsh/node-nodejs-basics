/* rename.js - implement function that renames file wrongFilename.txt
   to properFilename with extension .md (if there's no file
   wrongFilename.txt or properFilename.md already exists
   Error with message FS operation failed must be thrown) */

import * as fs from 'node:fs/promises';
import { join } from 'node:path';

const rename = async () => {
  const filePath = join('files', 'wrongFilename.txt');
  const newPath = join('files', 'properFilename.md');

  try {
    await fs.access(filePath);
  } catch {
    throw new Error('FS operation failed');
  }

  try {
    await fs.access(newPath);

    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }

  await fs.rename(filePath, newPath);
};

await rename();
