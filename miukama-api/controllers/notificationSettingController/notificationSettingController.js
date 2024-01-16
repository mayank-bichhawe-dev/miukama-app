const { NotificationSetting } = require('../../models');
const {
  sendSuccess,
  sendInternalError,
  sendCreateObject,
  sendNotFound,
} = require('../../utils/customResponse');

exports.createNotificationSetting = async (req, res) => {
  try {
    console.log(req.body);
    await NotificationSetting.create(req.body);
    return sendCreateObject(res, 'notification setting updated successfully');
  } catch (error) {
    return sendInternalError(res, error);
  }
};

exports.getAllNotificationSetting = async (req, res) => {
  try {
    const notificationSetting = await NotificationSetting.findAll();
    return sendSuccess(
      res,
      'get all notification successfully',
      notificationSetting,
    );
  } catch (error) {
    return sendInternalError(res, error);
  }
};

exports.getOneNotificationSetting = async (req, res) => {
  try {
    const notificationSetting = await NotificationSetting.findOne({
      where: { id: req.params.id },
    });

    if (!notificationSetting) {
      return sendNotFound(res, 'invalid id');
    }

    return sendSuccess(
      res,
      'get one notification successfully',
      notificationSetting,
    );
  } catch (error) {
    return sendInternalError(res, error);
  }
};

exports.updateNotificationSetting = async (req, res) => {
  try {
    const { name, value } = req.body;
    const notificationSetting = await NotificationSetting.findOne({
      where: { id: req.params.id },
    });

    if (!notificationSetting) {
      return sendNotFound(res, 'invalid');
    }

    await NotificationSetting.update(
      { name, value },
      {
        where: { id: req.params.id },
      },
    );

    return sendSuccess(res, 'notification setting updated successfully');
  } catch (error) {
    return sendInternalError(res, error);
  }
};
