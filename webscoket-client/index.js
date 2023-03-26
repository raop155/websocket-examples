const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:9080');

ws.on('open', function open() {
  ws.on('message', function message(data) {
    console.log(`[ws-client]: received: ${data}`);
  });

  ws.send('Hello from [ws-client]');
});
