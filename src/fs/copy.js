/* copy.js - implement function that copies folder files files
   with all its content into folder files_copy at the same level
   (if files folder doesn't exist or files_copy has already been
   created Error with message FS operation failed must be thrown) */

import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const srcFolder = join(__dirname, 'files');
  const destFolder = join(__dirname, 'files_copy');

  try {
    await fs.access(srcFolder);
  } catch {
    throw new Error('FS operation failed');
  }

  try {
    await fs.access(destFolder);

    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }

  await fs.mkdir(destFolder);

  const srcFolderEntities = await fs.readdir(srcFolder, { withFileTypes: true });

  for (const srcFolderEntity of srcFolderEntities) {
    const srcPath = join(srcFolder, srcFolderEntity.name);
    const destPath = join(destFolder, srcFolderEntity.name);

    if (srcFolderEntity.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

await copy();
