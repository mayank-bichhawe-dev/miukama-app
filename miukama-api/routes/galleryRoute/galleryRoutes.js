const express = require('express');
const router = express();

const {
  galleryGetAll,
  galleryGetOne,
  galleryCreateOne,
  galleryUpdateOne,
  galleryDeleteOne,
} = require('../../controllers/galleryController/galleryController');
const {
  validateBody,
  validateParams,
} = require('../../validationSchema/validationFunction');
const {
  gallerySchemaBody,
  gallerySchemaParams,
  galleryVisibilitySchemaParams,
} = require('../../validationSchema/galleryValidation/galleryValidationSchema');
const passport = require('passport');
const {
  galleryAuthorization,
} = require('../../authorizationMiddlewares/galleryAuthorization');
router.use(passport.authenticate('jwt', { session: false }));

router.get(
  '/',
  validateParams(galleryVisibilitySchemaParams),
  galleryAuthorization,
  galleryGetAll,
);

router.get('/:id', validateParams(gallerySchemaParams), galleryGetOne);

router.post(
  '/',
  validateBody(gallerySchemaBody),
  galleryAuthorization,
  galleryCreateOne,
);

router.patch(
  '/:id',
  validateParams(gallerySchemaParams),
  validateBody(gallerySchemaBody),
  galleryAuthorization,
  galleryUpdateOne,
);

router.delete(
  '/:id',
  validateParams(gallerySchemaParams),
  galleryAuthorization,
  galleryDeleteOne,
);
module.exports = router;
