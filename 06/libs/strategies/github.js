const GithubStrategy = require('passport-github').Strategy;
const config = require('../../config');
const get = require('lodash/get');
const authenticate = require('./authenticate');

module.exports = new GithubStrategy({
  clientID: 'clientID',
  clientSecret: 'clientSecret',
  callbackURL: 'callbackURL',
  scope: ['user:email'],
  session: false,
}, function(accessToken, refreshToken, profile, done) {
  authenticate('github', get(profile, 'emails[0].value'), profile.username, done);
}
);
