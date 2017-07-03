const db = require('./dbConfig');
const User = require('./user');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  authentication: {
    createUser: function(email, password, cb) {
      User.findOne({email: email}, function(err, user) {
        if (err) {
          cb(err, null);
        } else if (user) {
          cb({ error: 'This email is already in use' }, null);
        } else {
          const user = new User({
            email: email,
            password: password
          });
          user.save(function(err, data) {
            if (err) {
              cb(err, null);
            } else {
              cb(null, user);
            }
          });
        }
      });
    }
  }
};