const fs = require('fs');

// eventloop
// V8 (JS VM) + libUV (fs, network)

console.log('start'); // 1

// macrotask queue: []
// microtask queue: []
// nextTick queue: []

fs.readFile(__filename, (err, content) => {
  console.log('readFile'); // 9 exit
});

setTimeout(() => { console.log('timeout') }, 1);

queueMicrotask(() => {
  console.log('queueMicrotask'); // 6
});

new Promise((resolve) => {
  console.log('promise create'); // 2
  resolve('promise then');
}).then((value) => {
  console.log(value); // 7
});

process.nextTick(() => {
  console.log('nextTick1'); // 4

  process.nextTick(() => {
    console.log('nextTick2'); // 5
  });
});

setImmediate(() => {
  console.log('setImmediate'); // 8
});

console.log('end'); // 3
