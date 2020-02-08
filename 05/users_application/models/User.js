const mongoose = require('mongoose');
const connection = require('../lib/connection');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: 'такой email уже есть',
    validate: [{
      validator: value => {
        return value.includes('@');
      },
      message: 'email некорректный'
    }]
  },
  name: {
    type: String,
    index: true,
  },
  gender: {
    type: String,
    enum: ['f', 'm'],
  },
});

schema.index({ email: 1, name: 1 });

module.exports = connection.model('User', schema);
