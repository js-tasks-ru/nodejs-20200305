const VkontakteStrategy = require('passport-vkontakte').Strategy;
const config = require('../../config');
const authenticate = require('./authenticate');

module.exports = new VkontakteStrategy({
  clientID: '7317263',
  clientSecret: 'yX5J4jSJu0mWAlUBLTcL',
  callbackURL: 'http://localhost:3000/oauth/callback/vkontakte',
  scope: ['user:email'],
  session: false,
}, function(accessToken, refreshToken, params, profile, done) {
  
  console.log(accessToken, refreshToken, params, profile);

  authenticate('vkontakte', params.email, profile.displayName, done);
});

// OAuth 2.0
