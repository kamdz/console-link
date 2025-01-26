import { stringify } from 'flatted';

type Message = string | ArrayBufferLike | Blob | ArrayBufferView<ArrayBufferLike>;

interface ConsoleProxyHandler extends ProxyHandler<Console> {
  get(target: Console, prop: keyof Console): (...args: unknown[]) => void;
}

const ws = new WebSocket('ws://localhost:5001');
const messageQueue: Message[] = [];

ws.onopen = function () {
  console.log('> console-link opened');
  while (messageQueue.length > 0) {
    const message = messageQueue.shift();
    if (message !== undefined) {
      ws.send(message);
    }
  }
};

ws.onclose = function () {
  console.log('> console-link closed');
};

ws.onerror = function (error) {
  console.error('> console-link error:', error);
};

const sendMessage = (message: Message) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(message);
  } else {
    messageQueue.push(message);
  }
};

const consoleProxyHandler: ConsoleProxyHandler = {
  get(target: Console, prop: keyof Console) {
    return function (...args: unknown[]) {
      const message = stringify({ type: prop, args });
      sendMessage(message);
      Reflect.apply(target[prop], target, args);
    };
  }
};

window.console = new Proxy(console, consoleProxyHandler);
