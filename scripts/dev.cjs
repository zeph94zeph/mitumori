const { spawn } = require('node:child_process');

const processes = [];

function runWorkspace(name) {
  const child = spawn('npm', ['run', 'dev', '--workspace', name], {
    stdio: 'inherit',
    env: process.env,
  });

  child.on('exit', (code, signal) => {
    if (code !== 0) {
      console.error(`\n${name} process exited with code ${code ?? 'null'}${signal ? ` (signal: ${signal})` : ''}`);
      shutdown(child);
      process.exitCode = code ?? 1;
    }
  });

  processes.push(child);
}

function shutdown(trigger) {
  for (const proc of processes) {
    if (proc !== trigger && !proc.killed) {
      proc.kill('SIGINT');
    }
  }
}

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  shutdown();
  process.exit(0);
});

runWorkspace('client');
runWorkspace('server');
