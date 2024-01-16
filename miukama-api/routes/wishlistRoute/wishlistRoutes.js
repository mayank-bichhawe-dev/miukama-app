const express = require('express');
const router = express.Router();
const {
  wishlistGetAll,
  wishlistGetOne,
  wishlistCreateOne,
  wishlistUpdateOne,
  wishlistDeleteOne,
} = require('../../controllers/wishlistController/wishlistController');
const {
  validateBody,
  validateParams,
} = require('../../validationSchema/validationFunction');
const {
  wishlistSchemaBody,
  wishlistSchemaParams,
} = require('../../validationSchema/wishlistValidation/wishlistValidationSchema');
const passport = require('passport');
const {
  genericFlagBasedAuthorization,
} = require('../../authorizationMiddlewares/genericFlagBasedAuthorization');

router.use(passport.authenticate('jwt', { session: false }));
router.get('/', genericFlagBasedAuthorization('Wishlists'), wishlistGetAll);
router.get('/:id', validateParams(wishlistSchemaParams), wishlistGetOne);
router.post(
  '/',
  genericFlagBasedAuthorization('Wishlists'),
  validateBody(wishlistSchemaBody),
  wishlistCreateOne,
);
router.patch(
  '/:id',
  validateParams(wishlistSchemaParams),
  validateBody(wishlistSchemaBody),
  genericFlagBasedAuthorization('Wishlists'),
  wishlistUpdateOne,
);
router.delete(
  '/:id',
  validateParams(wishlistSchemaParams),
  genericFlagBasedAuthorization('Wishlists'),
  wishlistDeleteOne,
);
module.exports = router;
