import http from 'http';
import handler from './handler.mjs';

const server = new http.Server();

server.on('request', handler);

server.listen(3000, () => {
  console.log('app is running on http://localhost:3000');
});
