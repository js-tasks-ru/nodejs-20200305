const assert = require('assert');
const http = require('http');
const server = require('../server');

const axios = require('axios');

describe('server test', () => {
  
  /*
  * 1. launch server
  * 2. make request
  * 3. wait response
  * 4. compare request and response
  * 5. terminate server
  *
  * */
  
  before((done) => {
    server.listen(8080, done);
  });
  
  after((done) => {
    server.close(done);
  });
  
  it('should return request body', (done) => {
    const message = 'hello world!';

    const request = http.request(
      'http://localhost:8080',
      {method: 'POST'},
      async response => {
        const body = [];
        for await (const chunk of response) {
          body.push(chunk);
        }

        assert.strictEqual(Buffer.concat(body).toString(), message);
  
        done();
      });

    request.write(message);
    request.end();
  });
  
  // it('test with axios', async () => {
  //   const message = 'hello world!';
  //   const response = await axios.post('http://localhost:3333', message);
  //   assert.strictEqual(response.data, message);
  // });
  
});
