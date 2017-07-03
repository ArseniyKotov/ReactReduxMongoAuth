const db = require('./dbConfig');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

userSchema.pre('save', function(cb) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      cb(err);
    } else {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
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

userSchema.methods.comparePassword = function(potentialPassword, cb) {
  console.log('this password', this.password);
  
  bcrypt.compare(potentialPassword, this.password, function(err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const UserClass = mongoose.model('user', userSchema);
module.exports = UserClass;


