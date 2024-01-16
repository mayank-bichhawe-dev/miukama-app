const express = require('express');
const router = express.Router();
const {
  sellProductCreateOne,
  sellProductGetAll,
  sellProductDeleteOne,
} = require('../../controllers/sellProductController/sellProductController');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));
router.post('/', sellProductCreateOne);
router.get('/', sellProductGetAll);
router.delete('/:id', sellProductDeleteOne);
module.exports = router;
