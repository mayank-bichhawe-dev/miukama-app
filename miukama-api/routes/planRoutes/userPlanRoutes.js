const express = require('express');
const router = express.Router();
const passport = require('passport');
router.use(passport.authenticate('jwt', { session: false }));
const {
  addUserPlan,
  getUserPlan,
} = require('../../controllers/planController/userPlanController');
router.post('/', addUserPlan);
router.get('/', getUserPlan);
module.exports = router;
