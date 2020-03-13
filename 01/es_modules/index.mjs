import http from 'http'; // const http = require('http')
// http = module http
import handler from './handler.mjs';

const server = new http.Server();

server.on('request', handler);

server.listen(3000);

