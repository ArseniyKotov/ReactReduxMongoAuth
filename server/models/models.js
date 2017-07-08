const db = require('./dbConfig');
const User = require('./user');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  authentication: {
    createUser(email, password, cb) {
      User.findOne({ email }, (err, user) => {
        if (err) {
          cb(err, null);
        } else if (user) {
          cb({ error: 'This email is already in use' }, null);
        } else {
          const user = new User({
            email,
            password,
          });
          user.save((err, data) => {
            if (err) {
              cb(err, null);
            } else {
              cb(null, user);
            }
          });
        }
      });
    },
  },
};
