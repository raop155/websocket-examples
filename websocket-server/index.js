import { WebSocket, WebSocketServer } from 'ws';

const PORT = 9080;

const wss = new WebSocketServer({ port: PORT }, () => {
  console.log(' _____   __    __               ______     _____  ');
  console.log('|  __ \\  \\ \\  / /              /  ____|   |  __ \\ ');
  console.log('| |__) |  \\ \\/ /     _____    |  / ___    | |__) |');
  console.log('|  ___/    >  <     |_____|   | | |__ |   |  ___/ ');
  console.log('| |       / /\\ \\              | |___/ |   | |     ');
  console.log('|_|      /_/  \\_\\              \\_____/    |_|     ');
  console.log(`Server started on PORT: ${PORT}`);
});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    console.log('received: %s', data);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false });
      }
    });
  });

  ws.send('This message is from [ws-server]');
});

wss.on('error', function (error) {
  console.log('Error:');
  console.error(error);
});
