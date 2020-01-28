// mocha (test runner)
// sinon (mock, stub)
// assert (assertions)

const assert = require('assert');
const sinon = require('sinon');
const IncrementStream = require('../IncrementStream');

describe('IncrementStream test', () => {
  it('should increment numbers', (done) => {
    const stream = new IncrementStream();
    const spy = sinon.spy();

    stream.on('data', spy);

    stream.on('end', () => {
      assert.strictEqual(spy.callCount, 5);
      
      assert.strictEqual(spy.getCall(0).args[0], 2);
      assert.strictEqual(spy.getCall(1).args[0], 3);
      assert.strictEqual(spy.getCall(2).args[0], 4);
      assert.strictEqual(spy.getCall(3).args[0], 16);
      assert.strictEqual(spy.getCall(4).args[0], 6);
      
      done();
    });
    
    stream.write(1);
    stream.write(2);
    stream.write(3);
    stream.write(12);
    stream.write(4);
    stream.write(5);

    stream.end();
  });
});
