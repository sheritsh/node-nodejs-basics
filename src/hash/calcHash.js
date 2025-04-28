/* calcHash.js - implement function that calculates
   SHA256 hash for file fileToCalculateHashFor.txt and
   logs it into console as hex using Streams API */

import { createReadStream } from 'node:fs';
const { createHash } = await import('node:crypto');
import { join } from 'node:path';

const calculateHash = async () => {
  const filePath = join('files', 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256');
  const rs = createReadStream(filePath);

  rs.on('error', (error) => {
    console.error('File read error:', error.message);
  });

  rs.pipe(hash);

  hash.on('readable', () => {
    const data = hash.read();
    if (data) {
      console.log(data.toString('hex'));
    }
  });

  hash.on('error', (error) => {
    console.error('Hashing error:', error.message);
  });
};

await calculateHash();
