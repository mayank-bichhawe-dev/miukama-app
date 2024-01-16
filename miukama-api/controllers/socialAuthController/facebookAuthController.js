const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const {
  sendSuccess,
  sendInternalError,
} = require('../../utils/customResponse');

exports.facebookAuthLogin = async (req, res, next) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      where: { authToken: token },
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'contact',
        'address',
        'authProvider',
      ],
    });

    if (user) {
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        const jwtLoginToken = jwt.sign(
          req.user.dataValues,
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN || '30d',
          },
        );

        const data = {
          user: req.user,
          token: jwtLoginToken,
        };
        return sendSuccess(res, 'User Login By Facebook Successfully', data);
      });
    } else {
      return sendInternalError(res, 'Invalid Token');
    }
  } catch (error) {
    return sendInternalError(res, error.message);
  }
};
