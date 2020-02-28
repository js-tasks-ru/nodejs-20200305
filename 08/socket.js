const socketIO = require('socket.io');
const socketRedis = require('socket.io-redis');
const config = require('./config');

function socket(server, sockets) {
  const io = socketIO(server);
  
  // publish / subscribe
  io.adapter(socketRedis(config.redis.uri));

  /*
  * NO HTTP request (no handshake)
  * 1. allow all
  *   "mark" untrusted
  *   timeout 5s
  * 2. wait credentials
  *   validate -> valid? "mark" trusted
  *            -> invalid? disconnect
  * */
  io.use(async (socket, next) => {
    const headers = socket.handshake.query;
    
    next();
  });
  
  io.on('connection', socket => {
    console.log('connect', socket.id);
    
    sockets[socket.id] = socket;
    
    socket.on('message', msg => {
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      delete sockets[socket.id];
      console.log('disconnect');
    });
  });
  
  return io;
}

module.exports = socket;
