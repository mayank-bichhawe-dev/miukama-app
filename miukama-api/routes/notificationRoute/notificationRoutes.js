const express = require('express');
const router = express.Router();
const {
  notificationGetAll,
  notificationGetOne,
  notificationCreateOne,
  notificationMarkAsRead,
  notificationDeleteOne,
  notificationGetCount,
  notificationAllMarkRead,
  deleteAllNotification,
} = require('../../controllers/notificationController/notificationController');
const {
  validateBody,
  validateParams,
} = require('../../validationSchema/validationFunction');
const {
  notificationSchemaBody,
  notificationSchemaParams,
} = require('../../validationSchema/notificationValidation/noticationValidationSchema');
const passport = require('passport');
const {
  genericFlagBasedAuthorization,
} = require('../../authorizationMiddlewares/genericFlagBasedAuthorization');
router.use(passport.authenticate('jwt', { session: false }));
router.get('/count', notificationGetCount);
router.get(
  '/',
  genericFlagBasedAuthorization('Notifications'),
  notificationGetAll,
);
router.get(
  '/:id',
  validateParams(notificationSchemaParams),
  notificationGetOne,
);
router.post(
  '/',
  validateBody(notificationSchemaBody),
  genericFlagBasedAuthorization('Notifications'),
  notificationCreateOne,
);
router.patch(
  '/read/:id',
  validateParams(notificationSchemaParams),
  genericFlagBasedAuthorization('Notifications'),
  notificationMarkAsRead,
);
router.put('/read-all', notificationAllMarkRead);
router.delete(
  '/:id',
  validateParams(notificationSchemaParams),
  genericFlagBasedAuthorization('Notifications'),
  notificationDeleteOne,
);

router.delete('/', deleteAllNotification);

module.exports = router;
