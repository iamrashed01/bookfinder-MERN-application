const passport = require('passport');
const router = require('express').Router();
const upload = require('../utils/multer');
const auth = require('../middleware/auth');
const User = require('../model/user');
const {
  localRegister, localLogin, accountVerify, googleAuth,
} = require('../controllers/auth');

/**
 *@parent_route /api/auth
 */

router.post('/register', upload.single('picture'), localRegister);
router.get('/login', localLogin);
router.post('/verify', auth, accountVerify);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

router.get('/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile'],
  }));

router.get('/google/callback',
  passport.authenticate('google'), googleAuth);

module.exports = router;
