const { Notification } = require('../../models');
const {
  sendInternalError,
  sendSuccess,
  sendBadRequest,
} = require('../../utils/customResponse');

exports.notificationCreateOne = async (req, res) => {
  const { title, description, read } = req.body;
  try {
    await Notification.create({
      title,
      description,
      read,
      userId: req.user.id,
    });
    return sendSuccess(res, 'Notification created successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.notificationGetAll = async (req, res) => {
  try {
    const data = await Notification.findAll({
      order: [['id', 'asc']],
      attributes: ['id', 'title', 'description', 'read', 'userId', 'updatedAt'],
      where: {
        userId: req.user.id,
      },
    });
    return sendSuccess(res, 'Get all notifications successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.notificationGetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Notification.findOne({
      where: {
        userId: req.user.id,
        id: id,
      },
      attributes: ['id', 'title', 'description', 'read', 'userId'],
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }

    return sendSuccess(res, 'Get single notification successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.notificationMarkAsRead = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Notification.findOne({
      where: {
        userId: req.user.id,
        id: id,
      },
    });
    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }
    data.read = !data.read;
    data.save();
    return sendSuccess(res, 'Notification updated successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.notificationDeleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Notification.findOne({
      where: {
        userId: req.user.id,
        id: id,
      },
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }

    await data.destroy();
    return sendSuccess(res, 'Notification deleted successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.notificationGetCount = async (req, res) => {
  try {
    const count = await Notification.count({
      where: {
        read: false,
        userId: req.user.id,
      },
    });
    return sendSuccess(res, 'Get total notification count successfully', count);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.notificationAllMarkRead = async (req, res) => {
  try {
    await Notification.update(
      { read: true },
      { where: { userId: req.user.id } },
    );

    return sendSuccess(res, 'Notification All updated successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.deleteAllNotification = async (req, res) => {
  try {
    await Notification.destroy({
      where: { userId: req.user.id },
    });
    return sendSuccess(res, 'Notification All deleted successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
