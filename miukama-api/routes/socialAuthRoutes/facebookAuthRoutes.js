const express = require('express');
const router = express();
const passport = require('passport');
const {
  facebookAuthLogin,
} = require('../../controllers/socialAuthController/facebookAuthController');
require('dotenv').config();

router.get('/popup', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/callback', async (req, res, next) => {
  passport.authenticate(
    'facebook',
    {
      session: false,
    },
    (err, user, token) => {
      try {
        if (err) {
          throw err;
        } else {
          return res.redirect(
            `${process.env.CLIENT_REDIRECT_URL}?facebooktoken=${token}`,
          );
        }
      } catch (error) {
        return res.redirect(
          `${process.env.CLIENT_REDIRECT_URL}?facebookemailerror=true`,
        );
      }
    },
  )(req, res, next);
});

router.get('/login/:token', facebookAuthLogin);
module.exports = router;
