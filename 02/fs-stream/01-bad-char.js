const fs = require('fs');

const fileStream = fs.createReadStream('bad-char.txt', {
  highWaterMark: 9, // bytes
});

// '1' + 2 = '12'

let content = '';

fileStream.on('data', (data) => {
  content += data;
});

fileStream.on('end', () => {
  console.log(content);
});
