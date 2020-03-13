const http = require('http');
const events = require('events');
const handler = require('./handler');

// ES Modules

/*
*
* 1. core modules
* 2. ./node_modules
*    ../node_modules
*    ../../node_modules
*
* 3. NODE_PATH=.:./eventloop node server.js
*    WINDOWS: set NODE_PATH=.;./eventloop && node server.js
*
* */

const server = new http.Server();
server.listen(3000);

//                     2s    2s    2s    2s
// macrotasks queue: [req1, req2, req3, req4]
server.on('request', (req, res) => {
  process.nextTick(() => {
    Promise.resolve().then(() => {
      process.nextTick(() => {
        // const wait_untill = Date.now() + 2000;
        // while(Date.now() < wait_untill) {}
        // res.end('hello');
        setTimeout(() => {
          res.end('hello');
        }, 2000);
      });
    })
  })
});
