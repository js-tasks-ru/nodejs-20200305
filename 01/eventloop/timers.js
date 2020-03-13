const fs = require('fs');

// V8 + libUV + wrapper

console.log('start'); // 1

// queue (macro)tasks: []
// queue microtasks: []
// queue nexttick: []

fs.readFile(__filename, () => {
  console.log('readFile'); // 8
});

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

console.log('end'); // 3
