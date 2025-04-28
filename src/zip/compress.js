/* compress.js - implement function that compresses file
   fileToCompress.txt to archive.gz using zlib and Streams API */

import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const inputFilePath = join(__dirname, 'files', 'fileToCompress.txt');
  const outputFilePath = join(__dirname, 'files', 'archive.gz');

  const gzip = createGzip();
  const source = createReadStream(inputFilePath);
  const destination = createWriteStream(outputFilePath);

  try {
    await pipeline(source, gzip, destination);
  } catch (err) {
    console.error('An error occurred during compression:', err.message);
  }
};

await compress();
