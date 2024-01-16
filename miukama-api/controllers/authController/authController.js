const { User, Plan, UserPlan } = require('../../models');
const {
  passwordEncryption,
  passwordCompare,
} = require('../../passportConfiguration/bcryptHelp');
const crypto = require('crypto');
const {
  checkUserPasswordValidate,
} = require('../../utils/userSchemaValidations');
const {
  sendBadRequest,
  sendCreateObject,
  sendSuccess,
  sendNotFound,
  sendInternalError,
} = require('../../utils/customResponse');
const sendinBlueMail = require('../../utils/sendinblueMail');
const loginAuthProvider = require('../../utils/authProviderName');
const changePasswordHelper = require('../../utils/changePasswordHelper');

exports.userRegister = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contact,
      address,
      password,
      confirmPassword,
    } = req.body;

    const findUser = await User.findOne({ where: { email: email } });
    const defaultPlan = await Plan.findOne({ where: { default: true } });

    if (findUser) {
      return sendBadRequest(
        res,
        `user already exits with this email id: ${findUser.email}`,
      );
    }

    if (!defaultPlan) {
      console.error('The Default Plan does not exist');
      return sendInternalError(res, 'something wrong while creating user');
    }

    if (password !== confirmPassword) {
      return sendBadRequest(
        res,
        'Password and confirm password does not match',
      );
    }

    checkUserPasswordValidate(password);
    const encPass = await passwordEncryption(password);
    const userResult = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      address: address,
      password: encPass,
      authProvider: loginAuthProvider.local,
    });

    if (userResult) {
      await UserPlan.create({
        userId: userResult.id,
        planId: defaultPlan.id,
        isActive: true,
      });
      return sendCreateObject(res, 'Account has been successfully registered');
    } else {
      return sendInternalError(res, 'something wrong while creating user');
    }
  } catch (error) {
    const errMsg = error.message;
    return sendBadRequest(res, errMsg);
  }
};

exports.userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    return sendSuccess(res, 'Logout Successfully');
  });
};

exports.forgetPaaword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return sendNotFound(res, 'user does not exits');
    }

    if (user.authProvider !== loginAuthProvider.local) {
      return sendBadRequest(
        res,
        `You're signed in through ${user.authProvider?.toUpperCase()} hence this action can't be performed`,
      );
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validate: false });
    const redirectLink = `${req.get('origin')}${
      process.env.RESET_PASSWORD_REDIRECT_URL
    }/${resetToken}`;
    try {
      const options = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        subject: 'Your Miukama Account Password Recovery',
        redirectLink: redirectLink,
      };

      await sendinBlueMail(options);
      return sendSuccess(res, `Email send to ${user.email} successfully`);
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;
      await user.save({ validate: false });

      return sendInternalError(res, error.message);
    }
  } catch (error) {
    return sendBadRequest(res, error.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      where: {
        resetPasswordToken: resetPasswordToken,
      },
    });

    if (!user) {
      return sendBadRequest(
        res,
        'Reset password Link is invalid or has been expried',
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return sendBadRequest(
        res,
        'Reset Password and confirm password does not match',
      );
    }
    const isPasswordChanged = await changePasswordHelper(
      req.body.password,
      user,
    );

    if (!isPasswordChanged) {
      return sendBadRequest(
        res,
        'The new password should not be used in the history...',
      );
    }

    return sendSuccess(res, 'Your Password Has Been Reset Successfully');
  } catch (error) {
    return sendInternalError(res, error.message);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, password, confirmPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    const isPasswordMatch = await passwordCompare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return sendBadRequest(res, 'Your old password is wrong');
    }

    if (password !== confirmPassword) {
      return sendBadRequest(
        res,
        'New Password and confirm password do not match',
      );
    }
    const isPasswordChanged = await changePasswordHelper(password, user);
    if (!isPasswordChanged) {
      return sendBadRequest(
        res,
        'The new password should not be used in the history...',
      );
    }

    return sendSuccess(res, 'Your Password Has Been Reset Successfully');
  } catch (error) {
    return sendBadRequest(res, error.message);
  }
};
