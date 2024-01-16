const express = require('express');
const router = express();

const {
  getOneNotificationSetting,
  createNotificationSetting,
  getAllNotificationSetting,
  updateNotificationSetting,
} = require('../../controllers/notificationSettingController/notificationSettingController');

router.get('/all', getAllNotificationSetting);
router.post('/create', createNotificationSetting);
router.get('/one/:id', getOneNotificationSetting);
router.put('/one/:id', updateNotificationSetting);

module.exports = router;

// OrderConfirmation;
// OrderDelivered
// EmailNotification
