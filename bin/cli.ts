import { parse } from 'flatted';
import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 5001 });

server.on('connection', ws => {
  console.log('> console-link client connected');

  ws.on('message', message => {
    const { type, args } = parse(message.toString()) as { type: keyof Console; args: unknown[] };
    (console[type] as (...args: unknown[]) => void)(...args);
  });

  ws.on('close', () => {
    console.log('> console-link client disconnected');
  });

  ws.on('error', error => {
    console.error('> console-link error:', error);
  });
});

console.log('> console-link is running on ws://localhost:5001');
