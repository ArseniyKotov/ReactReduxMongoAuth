const models = require('../models/models');
const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = function (user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

module.exports = {
  authentication: {
    createUser(req, res) {
      const email = req.body.email;
      const password = req.body.password;
      if (!email || !password) {
        res
          .status(422)
          .send({ message: 'You must provide an Email AND Password' });
      } else {
        models.authentication.createUser(email, password, (err, data) => {
          if (err) {
            res
              .status(422)
              .send(err);
          } else {
            res
              .send({ token: tokenForUser(data) });
          }
        });
      }
    },
    signIn(req, res) {
      // user has already had their credientials checked.
      // they now need a token
      res
        .send({ token: tokenForUser(req.user) });
    },
  },
  data: {
    get(req, res) {
      // user is already authed
      res.send({ message: 'Here is some secret data' });
    },
  },

};
