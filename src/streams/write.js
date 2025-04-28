/* write.js - implement function that writes process.stdin data
   into file fileToWrite.txt content using Writable Stream */

import { createWriteStream } from 'node:fs';
import { join } from 'node:path';

const write = async () => {
  const filePath = join('files', 'fileToWrite.txt');

  const ws = createWriteStream(filePath);

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
