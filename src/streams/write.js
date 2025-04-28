/* write.js - implement function that writes process.stdin data
   into file fileToWrite.txt content using Writable Stream */

import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = join(__dirname, 'files', 'fileToWrite.txt');

  const ws = createWriteStream(filePath, { flags: 'a' });

  process.stdin.pipe(ws);

  // press ctrl+D to finish input
  process.stdin.on('end', () => {
    console.log('Data has been written to file successfully');
  });

  ws.on('error', (error) => {
    console.error('Error writing to file:', error.message);
  });
};

await write();
