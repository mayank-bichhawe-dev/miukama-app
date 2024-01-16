const { Faq } = require('../../models');
const {
  sendBadRequest,
  sendSuccess,
  sendInternalError,
} = require('../../utils/customResponse');

exports.faqGetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Faq.findOne({
      where: {
        userId: req.user.id,
        id: id,
      },
      attributes: ['id', 'serialNumber', 'question', 'answer', 'userId'],
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }

    return sendSuccess(res, 'Get single faq successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.faqGetAll = async (req, res) => {
  try {
    const data = await Faq.findAll({
      where: {
        enable: true,
      },
      attributes: ['id', 'serialNumber', 'question', 'answer', 'userId'],
      order: [['serialNumber', 'asc']],
    });

    return sendSuccess(res, 'Get all faq seccessfully', data);
  } catch (err) {
    console.error('Error-', err);
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.faqAdminGetAll = async (req, res) => {
  try {
    const data = await Faq.findAll({
      attributes: ['id', 'serialNumber', 'question', 'answer', 'userId'],
      order: [['serialNumber', 'asc']],
    });
    return sendSuccess(res, 'Get all Admin faq successfully', data);
  } catch (err) {
    console.log('err-', err);
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.faqCreateOne = async (req, res) => {
  try {
    const { serialNumber, question, answer, enable } = req.body;
    await Faq.create({
      userId: req.user.id,
      serialNumber: serialNumber,
      question,
      answer,
      enable,
    });
    return sendSuccess(res, 'Faq created successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.faqUpdateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const { serialNumber, question, answer, enable } = req.body;

    const data = await Faq.findOne({
      where: {
        userId: req.user.id,
        id: id,
      },
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }

    data.serialNumber = serialNumber;
    data.question = question;
    data.answer = answer;
    data.enable = enable;

    await data.save();
    return sendSuccess(res, 'Faq updated successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.faqDeleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Faq.findOne({ where: { id } });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }

    await data.destroy();
    return sendSuccess(res, 'Faq deleted successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
