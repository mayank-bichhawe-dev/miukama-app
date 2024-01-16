const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { User } = require('../models');
const loginAuthProvider = require('../utils/authProviderName');

const googleOauth2Config = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // Your Credentials here.
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Credentials here.
        callbackURL: '/google/auth/callback',
        scope: ['email', 'profile'],
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, callback) => {
        try {
          const exitsUser = await User.findOne({
            where: { email: profile.email },
          });

          if (exitsUser) {
            await exitsUser.update(
              {
                authToken: accessToken,
              },
              { where: { id: exitsUser.id } },
            );

            return callback(null, profile, accessToken);
          } else {
            await User.create({
              firstName: profile.given_name,
              lastName: profile.family_name,
              email: profile.email,
              authProvider: loginAuthProvider.google,
              authToken: accessToken,
            });
            return callback(null, profile, accessToken);
          }
        } catch (error) {
          return callback(error, false);
        }
      },
    ),
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (token, callback) => {
        try {
          const user = await User.findOne({
            where: {
              email: token.email,
            },
          });

          if (!user) {
            return callback(null, false);
          }
          return callback(null, user.toJSON());
        } catch (error) {
          callback(error);
        }
      },
    ),
  );

  passport.serializeUser((user, callback) => {
    callback(null, user);
  });

  passport.deserializeUser(function (user, callback) {
    callback(null, user);
  });
};

module.exports = googleOauth2Config;
