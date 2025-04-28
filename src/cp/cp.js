/* cp.js - implement function spawnChildProcess that receives array of
   arguments args and creates child process from file script.js, passing
   these args to it. This function should create IPC-channel between stdin
   and stdout of master process and child process: child process stdin
   should receive input from master process stdin child process stdout
   should send data to master process stdout                             */

import { spawn } from 'node:child_process';
import { join } from 'node:path';

const spawnChildProcess = async (args) => {
  const scriptPath = join('files', 'script.js');

  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on('error', (err) => {
    console.error('Failed to start child process:', err.message);
  });
};

spawnChildProcess(['arg1', 'arg2']);
