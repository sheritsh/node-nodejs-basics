/* decompress.js - implement function that decompresses
   archive.gz back to the fileToCompress.txt with same
   content as before compression using zlib and Streams API */

import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputFilePath = join(__dirname, 'files', 'archive.gz');
  const outputFilePath = join(__dirname, 'files', 'fileToCompress.txt');

  const gunzip = createGunzip();
  const source = createReadStream(inputFilePath);
  const destination = createWriteStream(outputFilePath);

  try {
    await pipeline(source, gunzip, destination);
  } catch (err) {
    console.error('An error occurred during decompression:', err.message);
  }
};

await decompress();
