const { ContactUs } = require('../../models');
const {
  sendInternalError,
  sendSuccess,
} = require('../../utils/customResponse');

exports.contactGetAll = async (req, res) => {
  try {
    const data = await ContactUs.findAndCountAll({
      order: [['id', 'asc']],
      attributes: ['name', 'description', 'contact'],
    });
    return sendSuccess(res, 'Get all contact', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
