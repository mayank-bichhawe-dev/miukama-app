const express = require('express');
const router = express();
const passport = require('passport');
const {
  getUserDetails,
  userProfileUpdate,
  userDelete,
  getAllUser,
} = require('../../controllers/userController/userController');
const {
  userRegister,
} = require('../../controllers/authController/authController');
const {
  genericFlagBasedAuthorization,
} = require('../../authorizationMiddlewares/genericFlagBasedAuthorization');
router.use(passport.authenticate('jwt', { session: false }));
const {
  validateParams,
  validateBody,
} = require('../../validationSchema/validationFunction');
const {
  userSchemaParams,
  userSchemaBody,
} = require('../../validationSchema/userValidationSchema/getUserValidation');

router.get('/user', genericFlagBasedAuthorization('AdminUser'), getAllUser);

router.post(
  '/user',
  validateBody(userSchemaBody),
  genericFlagBasedAuthorization('AdminUser'),
  userRegister,
);
router.get(
  '/user/:userId',
  validateParams(userSchemaParams),
  genericFlagBasedAuthorization('AdminUser'),
  getUserDetails,
);

router.patch(
  '/user/:userId',
  validateParams(userSchemaParams),
  validateBody(userSchemaBody),
  genericFlagBasedAuthorization('AdminUser'),
  userProfileUpdate,
);

router.delete(
  '/user/:userId',
  validateParams(userSchemaParams),
  genericFlagBasedAuthorization('AdminUser'),
  userDelete,
);

module.exports = router;
