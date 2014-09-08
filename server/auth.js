'use strict';

var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy;

module.exports = function(app) {
  // Setup passport middleware
  app.use(passport.initialize());

  // Setup HTTP Basic Auth
  passport.use(new BasicStrategy(function(username, password, done) {
    // Here, in real life, you would look up
    // the session from the DB.
    if(username !== 'secret api key') {
      return done(null, false);
    }

    return done(null, { success: true });
  }));
};