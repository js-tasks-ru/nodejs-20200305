const http = require('http');
const handler = require('./handler');

/*
*
* 1. core modules
* 2. node_modules
*
* 3. NODE_PATH=/Users/szelenov/programming/nodejs-course/01 node server.js
*    set NODE_PATH=/Users/szelenov/programming/nodejs-course/01 && node server.js
*
* */

const server = new http.Server();

// EventEmitter

// server.emit('request', req, res)

const _emit = server.emit;
server.emit = (...args) => {
  console.log(`event: ${args[0]}`);
  return _emit.apply(server, args);
};
//                      2s         4s        6s
//                      2s         2s        2s
// macrotasks queue: [request1, request2, request3]
server.on('request', handler);

server.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});
