const passport = require('passport');
const db = require('../models/dbConfig');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local Strategy
const localLogin = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      done(err, false);
    } else if (!user) {
      done(null, false);
    } else {
      // check if passwords matchup
      user.comparePassword(password, (err, result) => {
        if (err) {
          done(err, null);
        } else if (!result) {
          done(null, false);
        } else {
          done(null, user);
        }
      });
    }
  });
});

// Set up options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// Create strat
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      done(err, false);
    } else if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use it
passport.use(jwtLogin);
passport.use(localLogin);

