/* read.js - implement function that reads file fileToRead.txt content
   using Readable Stream and prints it's content into process.stdout */

import { createReadStream } from 'node:fs';
import { finished } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  const rs = createReadStream(filePath);

  rs.on('error', (error) => {
    console.error('Error reading the file:', error.message);
  });

  rs.pipe(process.stdout);

  await finished(rs);

  // without this doesnt work, I dont know why :D
  console.log('\n');
};

await read();
