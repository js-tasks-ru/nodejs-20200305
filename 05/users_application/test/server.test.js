const axios = require('axios');
const assert = require('assert');
const connection = require('../lib/connection');
const User = require('../models/User');
const app = require('../server');
const users = require('../fixtures/users');

const client = axios.create({
  baseURL: 'http://localhost:3000',
  validateStatus: function (status) {
    return status < 500;
  }
});

describe('User REST API', async function() {
  let server;
  
  before((done) => {
    server = app.listen(3000, done);
  });
  
  after(async () => {
    await User.deleteMany({});
    connection.close();
    server.close();
  });
  
  beforeEach(async function() {
    await User.deleteMany({});
    await User.insertMany(users);
  });
  
  it('GET /users request', async () => {
    const response = await client.get('/api/users');
    assert.strictEqual(response.status, 200);
  });
  
  it('GET /users/:id request', async () => {});
  
  it('POST /users request', async () => {});
  
  it('PATCH /users/:id request', async () => {});
  
  it('DELETE /users/:id request', async () => {});
});
