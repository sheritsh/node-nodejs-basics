/* compress.js - implement function that compresses file
   fileToCompress.txt to archive.gz using zlib and Streams API */

import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

const compress = async () => {
  const inputFilePath = join('files', 'fileToCompress.txt');
  const outputFilePath = join('files', 'archive.gz');

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
