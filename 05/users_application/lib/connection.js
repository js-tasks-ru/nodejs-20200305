const mongoose = require('mongoose');
const mongooseUniquePlugin = require('mongoose-beautiful-unique-validation');

mongoose.set('debug', true);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.plugin(mongooseUniquePlugin);

// mongoose.connect('mongodb://localhost/users_app');
module.exports = mongoose.createConnection('mongodb://localhost/users_app');
