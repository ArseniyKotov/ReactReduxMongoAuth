const router = require('express').Router();
const controllers = require('../controllers/controllers.js');
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });

router.post('/api/signin', requireSignin, controllers.authentication.signIn);
router.post('/api/signup', controllers.authentication.createUser);

module.exports = router;