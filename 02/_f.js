const fs = require('fs');


// macrotasks: []
fs.open('1.txt', 'r', (err, file) => {
  // ...
  if (err) return;
  // console.log(stat.mtime);
  fs.readFile(file, (err, content) => {
    console.log(err);
  });
});

fs.unlink('1.txt', (err) => {});
