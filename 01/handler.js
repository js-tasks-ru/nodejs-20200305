const memory_leak_obj = {};

function handler(req, res) {
  memory_leak_obj[Math.random()] = (new Array(1000000)).fill('*');
  
  res.end('hello world');
}

module.exports = handler;
// commonjs
