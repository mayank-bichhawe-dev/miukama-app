const express = require('express');
const router = express();
const {
  categoryGetAll,
  categoryGetOne,
  categoryCreateOne,
} = require('../../controllers/categoryController/categoryController');
const {
  categoryUpdateOne,
  categoryDeleteOne,
} = require('../../controllers/categoryController/updateAndDeleteCategoryController');
const {
  validateBody,
  validateParams,
} = require('../../validationSchema/validationFunction');
const {
  genericFlagBasedAuthorization,
} = require('../../authorizationMiddlewares/genericFlagBasedAuthorization');
const {
  categorySchemaBody,
  categorySchemaParams,
  categoryUpdateSchemaBody,
} = require('../../validationSchema/categoryValidation/categoryValidationSchema');
const passport = require('passport');
const {
  categoryAuthorization,
} = require('../../authorizationMiddlewares/categoryAuthorization');

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', categoryAuthorization, categoryGetAll);

router.get('/:id', validateParams(categorySchemaParams), categoryGetOne);

router.post(
  '/',
  validateBody(categorySchemaBody),
  categoryAuthorization,
  categoryCreateOne,
); // PROBLEM

router.patch(
  '/:id',
  validateParams(categorySchemaParams),
  validateBody(categoryUpdateSchemaBody),
  genericFlagBasedAuthorization('Categories'),
  categoryUpdateOne,
);

router.delete(
  '/:id',
  validateParams(categorySchemaParams),
  genericFlagBasedAuthorization('Categories'),
  categoryDeleteOne,
);

module.exports = router;
