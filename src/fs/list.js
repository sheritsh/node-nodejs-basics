/* list.js - implement function that prints array of all filenames
   from files folder into console (if files folder doesn't exists Error
   with message FS operation failed must be thrown) */

import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const folderPath = join(__dirname, 'files');

  try {
    await fs.access(folderPath);
  } catch (error) {
    throw new Error('FS operation failed');
  }

  const folderEntities = await fs.readdir(folderPath, { withFileTypes: true });
  const filenamesArray = [];

  for (const folderEntity of folderEntities) {
    if (folderEntity.isFile()) {
      filenamesArray.push(folderEntity.name);
    }
  }

  console.log(filenamesArray);
};

await list();
