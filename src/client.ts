import { stringify } from 'flatted';

type Message = string | ArrayBufferLike | Blob | ArrayBufferView<ArrayBufferLike>;

interface ConsoleProxyHandler extends ProxyHandler<Console> {
  get(target: Console, prop: keyof Console): (...args: unknown[]) => void;
}

export default (port: number) => {
  const ws = new WebSocket(`ws://localhost:${port}`);
  const messageQueue: Message[] = [];

  ws.onopen = function () {
    while (messageQueue.length > 0) {
      const message = messageQueue.shift();
      if (message !== undefined) {
        ws.send(message);
      }
    }
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
};
