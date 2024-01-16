const express = require('express');
const router = express();
const passport = require('passport');
const {
  userRegister,
  userLogout,
  forgetPaaword,
  resetPassword,
  changePassword,
} = require('../../controllers/authController/authController');
const {
  genericFlagBasedAuthorization,
} = require('../../authorizationMiddlewares/genericFlagBasedAuthorization');
const {
  sendBadRequest,
  sendSuccess,
  sendInternalError,
} = require('../../utils/customResponse');
const { validateBody } = require('../../validationSchema/validationFunction');
const userSchemaBody = require('../../validationSchema/userValidationSchema/loginValidation');

router.post('/login', async (req, res, next) => {
  passport.authenticate(
    'login',
    { session: false },
    async (err, { user, userPlanDetails }, token) => {
      try {
        if (err || !user) {
          return sendBadRequest(res, 'Please check your credentials');
        } else {
          const data = {
            user: user,
            userPlan: userPlanDetails,
            token: token,
          };
          return sendSuccess(res, 'authentication successful', data);
        }
      } catch (error) {
        return sendInternalError(res, 'Something went wrong');
      }
    },
  )(req, res, next);
});
router.post('/register', validateBody(userSchemaBody), userRegister);

router.post(
  '/password/forgot',
  genericFlagBasedAuthorization('Users'),
  forgetPaaword,
);
router.patch('/password/reset/:token', resetPassword);

router.use(passport.authenticate('jwt', { session: false }));

router.patch(
  '/password/update',
  genericFlagBasedAuthorization('Users'),
  changePassword,
);

router.get('/logout', genericFlagBasedAuthorization('Users'), userLogout);
module.exports = router;
