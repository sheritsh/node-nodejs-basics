/* read.js - implement function that prints content of the
   fileToRead.txt into console (if there's no file fileToRead.txt
   Error with message FS operation failed must be thrown) */

import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  try {
    await fs.access(filePath);
  } catch {
    throw new Error('FS operation failed');
  }

  const fileText = await fs.readFile(filePath, { encoding: 'utf-8' });

  console.log(fileText);
};

await read();
