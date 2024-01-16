const express = require('express');
const router = express.Router();
const {
  contactGetAll,
} = require('../../controllers/contactusController/contactusController');
router.get('/', contactGetAll);

module.exports = router;
