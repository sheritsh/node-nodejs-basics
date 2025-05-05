/* transform.js - implement function that reads data
    from process.stdin, reverses text using Transform
    Stream and then writes it into process.stdout */

import { Transform } from 'node:stream';

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, cb) {
      const reversed = chunk.toString().split('').reverse().join('') + '\n';

      this.push(reversed);

      cb();
    },
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);

  reverseStream.on('error', (error) => {
    console.error('Error during transformation:', error.message);
  });
};

await transform();
