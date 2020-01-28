const http = require('http');

const server = new http.Server();

server.on('request', async (req, res) => {

  const body = [];
  
  for await (const chunk of req) {
    body.push(chunk);
  }
  
  res.end(Buffer.concat(body));

});

module.exports = server;
