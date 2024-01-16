const express = require('express');
const router = express.Router();
const {
  productGetAll,
  productGetOne,
  productCreateOne,
  productUpdateOne,
  productDeleteOne,
} = require('../../controllers/productsController/productsController');
const {
  validateBody,
  validateParams,
} = require('../../validationSchema/validationFunction');
const {
  genericFlagBasedAuthorization,
} = require('../../authorizationMiddlewares/genericFlagBasedAuthorization');
const {
  productSchemaBody,
  productSchemaParams,
} = require('../../validationSchema/productValidation/productValidationSchema');
const passport = require('passport');
const {
  productAuthorization,
} = require('../../authorizationMiddlewares/productAuthorization');

router.use(passport.authenticate('jwt', { session: false }));
router.get('/', genericFlagBasedAuthorization('Products'), productGetAll);
router.get('/:id', validateParams(productSchemaParams), productGetOne);
router.post(
  '/',
  validateBody(productSchemaBody),
  productAuthorization,
  productCreateOne,
);
router.patch(
  '/:id',
  validateParams(productSchemaParams),
  validateBody(productSchemaBody),
  genericFlagBasedAuthorization('Products'),
  productUpdateOne,
);
router.delete(
  '/:id',
  validateParams(productSchemaParams),
  genericFlagBasedAuthorization('Products'),
  productDeleteOne,
);
module.exports = router;
