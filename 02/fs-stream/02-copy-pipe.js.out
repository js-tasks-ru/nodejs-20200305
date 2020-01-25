const fs = require('fs');

const fileIn = fs.createReadStream(__filename, {
  highWaterMark: 100,
});

const fileOut = fs.createWriteStream(__filename + '.out', {
  highWaterMark: 100,
});

fileIn.on('data', (data) => {
  const ready = fileOut.write(data);
  console.log(ready);
  if (!ready) {
    console.log('pause');
    fileIn.pause();
    fileOut.once('drain', () => {
      console.log('resume');
      fileIn.resume();
    });
  }
});

fileIn.on('end', () => {
  fileOut.end();
});
