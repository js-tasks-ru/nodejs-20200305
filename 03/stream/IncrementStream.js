const stream = require('stream');

module.exports = class IncrementStream extends stream.Transform {
  constructor(options) {
    super(Object.assign({}, options, {
      readableObjectMode: true,
      writableObjectMode: true,
    }));
    
    this.number = 0;
  }
  
  _transform(value, encoding, callback) {
    if (value > 10) {
      this.number = value;
      return callback(null);
    }
    
    setTimeout(() => {
      if (this.number !== 0) {
        const v = value + this.number;
        this.number = 0;
        return callback(null, v);
      }
      
      callback(null, value + 1);
    }, 100);
  }
};
