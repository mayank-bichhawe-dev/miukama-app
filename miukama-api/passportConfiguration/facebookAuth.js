const { User } = require('../models');
const loginAuthProvider = require('../utils/authProviderName');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const facebookAuthConfig = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/facebook/auth/callback',
        profileFields: ['id', 'email', 'photos', 'name'],
        enableProof: true,
      },
      async (accessToken, refreshToken, profile, callback) => {
        try {
          // eslint-disable-next-line no-unused-vars
          const { first_name, last_name, email, picture } = profile._json;
          const token = accessToken.slice(0, 50);

          if (!email) {
            throw Error('Empty email id in facebook auth');
          }

          const exitsUser = await User.findOne({
            where: {
              email: email,
            },
          });

          if (exitsUser) {
            await exitsUser.update(
              {
                authToken: token,
              },
              { where: { id: exitsUser.id } },
            );
            return callback(null, profile, token);
          } else {
            await User.create({
              firstName: first_name,
              lastName: last_name,
              email: email,
              authProvider: loginAuthProvider.facebook,
              authToken: token,
            });
            return callback(null, profile, token);
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

module.exports = facebookAuthConfig;
