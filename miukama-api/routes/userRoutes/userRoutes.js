const express = require('express');
const router = express();
const {
  getUserDetails,
  userProfileUpdate,
} = require('../../controllers/userController/userController');
const {
  genericFlagBasedAuthorization,
} = require('../../authorizationMiddlewares/genericFlagBasedAuthorization');
const passport = require('passport');
const { validateBody } = require('../../validationSchema/validationFunction');
const {
  userSchemaBody,
} = require('../../validationSchema/userValidationSchema/getUserValidation');

router.use(passport.authenticate('jwt', { session: false }));

router.get('/me', genericFlagBasedAuthorization('Users'), getUserDetails);

router.patch(
  '/me/update',
  validateBody(userSchemaBody),
  genericFlagBasedAuthorization('Users'),
  userProfileUpdate,
);

module.exports = router;
