# 🔗 console-link

Effortlessly stream client-side `console.log` messages to your server-side terminal via WebSocket. Debugging across environments has never been easier!  
This is just a proof of concept and intended only for development purposes.

## 🚀 Features

- **Global override** – Redirect all console methods (e.g., `console.log`, `console.error`) to the terminal without modifying your code.
- **Multiple integration options** – Choose from three simple methods to integrate.
- **Real-time streaming** – Logs are instantly sent from the client to the server.
- **Queueing** – Ensures no logs are lost, even if the WebSocket connection isn't ready.

## 🛠️ Installation

```bash
npm install -g console-link
```

## 📖 Usage

### In the terminal:

```bash
console-link
# Or run directly without preinstallation
npx console-link
```

### On the client-side (choose one):

#### 1. Node.js (e.g., React)

```typescript
import 'console-link';

// Now all console messages will be forwarded to the server.
```

#### 2. HTML

```html
<script src="https://www.unpkg.com/console-link"></script>
```

#### 3. Paste in DevTools

Simply copy the distributed code (available at [https://www.unpkg.com/console-link](https://www.unpkg.com/console-link)) and paste it into your browser's DevTools console. This works on your site, localhost, etc.

## 🧠 How It Works

1. The command in the terminal starts a WebSocket server.
2. The client-side script establishes a WebSocket connection to the server and overrides `window.console` using a Proxy.
3. Logs are serialized using `flatted` to handle circular references.
4. The server listens for incoming messages and prints them to the terminal.

## ✨ Example

### Client

```typescript
console.log('App started');
console.warn('Something might be wrong');
console.error('An error occurred');
```

### Server Output

```bash
> console-link is running on ws://localhost:5001
> console-link client connected
App started
Something might be wrong
An error occurred
> console-link client disconnected
```
