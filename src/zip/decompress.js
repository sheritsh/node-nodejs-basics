/* decompress.js - implement function that decompresses
   archive.gz back to the fileToCompress.txt with same
   content as before compression using zlib and Streams API */

import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

const decompress = async () => {
  const inputFilePath = join('files', 'archive.gz');
  const outputFilePath = join('files', 'fileToDecompress.txt');

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
