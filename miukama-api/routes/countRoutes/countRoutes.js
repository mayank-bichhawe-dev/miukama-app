const express = require('express');
const router = express();
const {
  productCount,
} = require('../../controllers/countController/countController');

const passport = require('passport');
router.use(passport.authenticate('jwt', { session: false }));

router.get('/count', productCount);
module.exports = router;
