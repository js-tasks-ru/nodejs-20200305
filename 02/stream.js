// r/w/d/t
// Readable, Writable, Duplex, Transform

const fs = require('fs');
const stream = require('stream');

const s1 = fs.createReadStream(__filename); // 64kb
const s2 = fs.createWriteStream(`${__filename}.out`);


// const s = stream.Readable.from(['1', '2', '3']);

// paused | flowing

// s.pipe(process.stdout);
// s.on('data', chunk => {
//   console.log(chunk);
// });
// s.resume() || s.pause()


// s.on('readable', () => {
//   console.log('readable');
//   // const chunk = s.read();
// });

s1.on('open', () => console.log('open'));

s1.on('data', (chunk) => console.log(chunk));

s1.on('error', () => console.log('error'));

// s.resume();

s1.on('close', () => console.log('close'));
s1.on('end', () => console.log('end'));


s2.on('open', () => console.log('open'));

s2.on('error', () => console.log('error'));

s2.on('close', () => console.log('close'));
s2.on('finish', () => console.log('finish'));


