const http = require('http');
const fs = require('fs');
const server = new http.Server();

server.on('request', (req, res) => {

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });

  req.on('end', () => {
    const json = Buffer.concat(body);
    
    const message = JSON.parse(json).message;
    res.end(message);
  });
  
  // fs.readFile('big.png', (err, content) => {
  //   res.end(content);
  // });
  
  // const s = fs.createReadStream('not');
  // s.pipe(res);
  //
  // s.on('error', () => {
  //   res.statusCode = 500;
  //   res.end('something went wrong');
  // });
  
  // const s = fs.createWriteStream('big.copy.png');
  // req.pipe(s);
  //
  // // req.on('end')
  // // s.on('finish')
  // s.on('close', () => {
  //   res.end('all done');
  // });
  
});

server.listen(3000);
