const express = require('express');
const router = express.Router();
const {
  fetchAllPlan,
} = require('../../controllers/planController/planController');
router.get('/', fetchAllPlan);
module.exports = router;
