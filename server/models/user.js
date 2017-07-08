const db = require('./dbConfig');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});

userSchema.pre('save', function (cb) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      cb(err);
    } else {
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    }
  });
});

userSchema.methods.comparePassword = function (potentialPassword, cb) {
  bcrypt.compare(potentialPassword, this.password, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const UserClass = mongoose.model('user', userSchema);
module.exports = UserClass;

