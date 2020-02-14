const uuid = require('uuid/v4');
const passport = require('../libs/passport');
const sessions = require('../sessions');

module.exports.login = async function login(ctx, next) {
  await passport.authenticate('local', (err, user, info) => {
    
    if (err) throw err;
    
    if (!user) ctx.throw(401, info);
    
    ctx.body = uuid();
    
  })(ctx, next);
};

module.exports.oauth = async function oauth(ctx, next) {
  await passport.authenticate(ctx.params.strategy, {scope: ['email']})(ctx, next);
};

module.exports.oauth_callback = async function oauthcallback(ctx, next) {
  await passport.authenticate(ctx.params.strategy, (err, user, info) => {
    console.log(err, user, info);
  })(ctx, next)
};

/*
* const {email, password} = ctx.request.body;
  
  const user = await User.findOne({email});
  
  if (!user) ctx.throw(400, 'no such user');

  if (!await user.checkPassword(password)) ctx.throw(400, 'wrong password');
  
  const token = uuid();
  
  sessions[token] = user;
  
  ctx.body = token;
* */
