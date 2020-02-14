const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../../config');
const get = require('lodash/get');
const authenticate = require('./authenticate');

module.exports = new FacebookStrategy({
  clientID: 'clientID',
  clientSecret: 'clientSecret',
  callbackURL: 'callbackURL',
  profileFields: ['displayName', 'email'],
  session: false,
}, function(accessToken, refreshToken, profile, done) {
  authenticate('facebook', get(profile, 'emails[0].value'), profile.displayName, done);
}
);
