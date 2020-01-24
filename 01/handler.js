let i = 0;

const obj = {};

function sleep(ms) {
  const d = Date.now();
  while (true) {
    if (Date.now() - d >= ms) break;
  }
}

function handler(req, res) {
  i++;
  // obj[Math.random()] = new Array(100000).fill('*').join('');
  
  // sleep(2000);
  setTimeout(() => {
    res.end(i.toString());
  }, 2000);
}

module.exports = handler;
