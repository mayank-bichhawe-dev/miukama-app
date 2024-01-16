const express = require('express');
const router = express();
const passport = require('passport');
require('dotenv').config();
const {
  googleAuthLogin,
  googleAuthLogout,
} = require('../../controllers/socialAuthController/googleAuthController');

// call back url
router.get('/auth/callback', (req, res, next) => {
  passport.authenticate(
    'google',
    {
      session: false,
      failureRedirect: '/login/failed',
    },
    (err, user, token) => {
      try {
        if (!err) {
          return res.redirect(
            `${process.env.CLIENT_REDIRECT_URL}?googletoken=${token}`,
          );
        }
      } catch (error) {
        return res.redirect(`${process.env.CLIENT_REDIRECT_URL}`);
      }
    },
  )(req, res, next);
});

// Popup Open Url
router.get('/popup', passport.authenticate('google', ['profile', 'email']));

// Successfully Login Url
router.get('/login/:token', googleAuthLogin);

// Google User Logout Url
router.use(passport.authenticate('jwt', { session: false }));
router.get('/logout', googleAuthLogout);

module.exports = router;
