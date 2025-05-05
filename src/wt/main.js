/* main.js - implement function that creates number of worker threads
(equal to the number of host machine logical CPU cores) from file worker.js
and able to send data to those threads and to receive result of the
computation from them. You should send incremental number starting from 10
to each worker. For example: on host machine with 4 cores you should create
4 workers and send 10 to first worker, 11 to second worker, 12 to third
worker, 13 to fourth worker. After all workers will finish, function should
log array of results into console. The results are array of objects with 2
properties:
 ● status - 'resolved' in case of successfully received value
from worker or 'error' in case of error in worker
 ● data - value from worker in case of success or null in case of
error in worker                                                           */

import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const cpuAmount = cpus().length;
  const workers = [];

  for (let i = 0; i < cpuAmount; i++) {
    const worker = new Worker(join(__dirname, './worker.js'));

    const promise = new Promise((resolve) => {
      worker.once('message', (data) => {
        resolve({ status: 'resolved', data });
      });

      worker.once('error', () => {
        resolve({ status: 'error', data: null });
      });
    }).finally(() => {
      worker.terminate();
    });

    worker.postMessage(10 + i);
    workers.push(promise);
  }

  const resArr = await Promise.all(workers);

  console.log(resArr);
};

await performCalculations();
