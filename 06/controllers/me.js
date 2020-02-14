const sessions = require('../sessions');

module.exports.get = async function(ctx, next) {

  // Header - Authorization: Bearer <token>
  
  const header = ctx.request.get('Authorization');
  
  if (!header) ctx.throw(401);
  
  const token = header.split(' ')[1];
  
  if (!token) ctx.throw(401);
  
  if (!sessions[token]) ctx.throw(401);
  
  ctx.body = sessions[token];
};
