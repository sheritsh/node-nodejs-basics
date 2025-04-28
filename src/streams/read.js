/* read.js - implement function that reads file fileToRead.txt content
   using Readable Stream and prints it's content into process.stdout */

import { createReadStream } from 'node:fs';
import { join } from 'node:path';

const read = async () => {
  const filePath = join('files', 'fileToRead.txt');

  const rs = createReadStream(filePath);

  rs.on('error', (error) => {
    console.error('Error reading the file:', error.message);
  });

  rs.pipe(process.stdout);
};

await read();
