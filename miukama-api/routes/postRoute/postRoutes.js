const express = require('express');
const router = express();

const {
  postGetAll,
  postGetOne,
  postCreateOne,
  postUpdateOne,
  postDeleteOne,
} = require('../../controllers/postController/postController');
const {
  validateBody,
  validateParams,
} = require('../../validationSchema/validationFunction');
const {
  postSchemaBody,
  postSchemaParams,
} = require('../../validationSchema/postValidation/postValidationSchema');
const passport = require('passport');

router.get('/', postGetAll);
router.use(passport.authenticate('jwt', { session: false }));
router.get('/:id', validateParams(postSchemaParams), postGetOne);
router.post('/', validateBody(postSchemaBody), postCreateOne);
router.patch(
  '/:id',
  // validateParams(postSchemaParams),
  // validateBody(postSchemaBody),
  postUpdateOne,
);
router.delete('/:id', validateParams(postSchemaParams), postDeleteOne);
module.exports = router;
