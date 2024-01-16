const express = require('express');
const router = express.Router();
const {
  publicGalleryGetAll,
  publicProductGetAll,
} = require('../../controllers/publicGalleryAndProductController/publicGalleryAndProductController');
router.get('/gallery', publicGalleryGetAll);
router.get('/product', publicProductGetAll);
module.exports = router;
