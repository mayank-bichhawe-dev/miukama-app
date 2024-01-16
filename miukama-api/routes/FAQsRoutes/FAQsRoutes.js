const express = require('express');
const router = express();
const {
  faqGetAll,
  faqGetOne,
  faqAdminGetAll,
  faqCreateOne,
  faqUpdateOne,
  faqDeleteOne,
} = require('../../controllers/FAQsController/FAQsControllers');
const passport = require('passport');
const {
  validateBody,
  validateParams,
} = require('../../validationSchema/validationFunction');
const {
  faqSchemaBody,
  faqSchemaParams,
} = require('../../validationSchema/faqVlidationSchema/faqValidationSchema');

router.get('/user', faqGetAll);
router.use(passport.authenticate('jwt', { session: false }));
router.get('/:id', validateParams(faqSchemaParams), faqGetOne);
router.post('/', validateBody(faqSchemaBody), faqCreateOne);
router.patch('/:id', validateBody(faqSchemaBody), faqUpdateOne);
router.delete('/:id', validateParams(faqSchemaParams), faqDeleteOne);
router.get('/admin/get-all', faqAdminGetAll);

module.exports = router;
