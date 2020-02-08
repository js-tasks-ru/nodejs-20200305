const User = require('../models/User');
const users = require('./users');

const connection = require('../lib/connection');

(async () => {
  
  await User.deleteMany();
  
  await User.insertMany(users);
  
  connection.close();
  
})();
