const mongoose = require('mongoose');

module.exports = function validateIdMiddleware(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) ctx.throw(400, 'invalid id');
  return next();
};
