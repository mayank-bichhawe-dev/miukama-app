const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const { passwordCompare } = require('./bcryptHelp');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const { fetchUserPlanDetails } = require('../helper');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passportConfig = () => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, callback) => {
        try {
          let user = await User.findOne({
            attributes: [
              'id',
              'firstName',
              'lastName',
              'email',
              'contact',
              'address',
              'password',
              'authProvider',
              'imagePath',
            ],
            where: { email: email },
          });
          if (!user) return callback(null, false);
          const verifyPassword = await passwordCompare(password, user.password);
          if (!verifyPassword) return callback(null, false);
          user = user.toJSON();
          delete user.password;
          const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '30d',
          });

          const userPlanDetails = await fetchUserPlanDetails(user.id);
          return callback(null, { user, userPlanDetails }, token);
        } catch (error) {
          console.log('Error in auth :', error);
          callback(error, false);
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
};

module.exports = passportConfig;
