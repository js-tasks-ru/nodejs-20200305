const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      // НЕПРАВИЛЬНО! НЕОБХОДИМО СОБЛЮДАТЬ ПРИНЦИП АТОМАРНОСТИ
      // GET request, DELETE request
      // [exists, unlink, createReadStream]
      // fs.exists(filepath, isExist => { // fs.access, fs.existsSync
      //   if (isExist) {
      //     fs.createReadStream(filepath).pipe(res);
      //   } else {
      //     res.statusCode = 404;
      //     res.end('file does not exist');
      //   }
      // });
      
      fs.createReadStream(filepath)
        .on('error', err => {
          if (err.code === 'ENOENT') {
            res.statusCode = 404;
            res.end('file does not exist');
          } else {
            console.log(err);
            res.statusCode = 500;
            res.end('internal server error');
          }
        })
        // .on('open', () => {
        //   res.setHeader('content-type', 'image/png');
        // })
        .pipe(res);
      
      break;
    case 'DELETE':
      fs.unlink(filepath, err => {
        if (!err) return res.end('ok!');

        if (err.code === 'ENOENT') {
          res.statusCode = 404;
          res.end('file does not exist');
        } else {
          console.log(err);
          res.statusCode = 500;
          res.end('internal server error');
        }
      });
      
      break;
    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
