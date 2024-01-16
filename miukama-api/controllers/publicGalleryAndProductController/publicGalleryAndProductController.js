const { Gallery, Category, Product, User, Sequelize } = require('../../models');
const {
  sendInternalError,
  sendSuccess,
} = require('../../utils/customResponse');

exports.publicGalleryGetAll = async (req, res) => {
  try {
    const page =
      parseInt(req.query.page) || parseInt(process.env.DEFAULT_PAGE || '1');
    const pageSize =
      parseInt(req.query.pageSize) ||
      parseInt(process.env.DEFAULT_PAGE_SIZE || '10');
    const { name } = req.query;
    let whereClause = {};
    if (name) {
      whereClause.name = { [Sequelize.Op.iLike]: `%${name}%` };
    }

    const data = await Gallery.findAndCountAll({
      order: [['id', 'asc']],
      attribute: [],
      where: {
        visibility: false,
        ...whereClause,
      },
      include: [
        {
          model: User,
          required: true,
          attributes: [
            'id',
            'imagePath',
            'fileSystemId',
            'firstName',
            'lastName',
            'email',
          ],
        },
      ],
      required: true,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    return sendSuccess(res, 'Get all galleries successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.publicProductGetAll = async (req, res) => {
  try {
    const page =
      parseInt(req.query.page) || parseInt(process.env.DEFAULT_PAGE || '1');
    const pageSize =
      parseInt(req.query.pageSize) ||
      parseInt(process.env.DEFAULT_PAGE_SIZE || '10');
    let whereClause = {};
    const { itemName } = req.query;

    if (itemName) {
      whereClause.itemName = { [Sequelize.Op.iLike]: `%${itemName}%` };
    }
    const data = await Product.findAndCountAll({
      order: [['id', 'asc']],
      attribute: [],
      where: {
        visibility: false,
        ...whereClause,
      },
      include: [
        {
          model: Category,
          where: { visibility: false },
          include: [
            {
              model: Gallery,
              where: { visibility: false },
              required: true,
            },
          ],
          required: true,
        },
        {
          model: User,
          required: true,
          attributes: [
            'id',
            'imagePath',
            'fileSystemId',
            'firstName',
            'lastName',
            'email',
          ],
        },
      ],
      required: true,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    return sendSuccess(res, 'Get all products successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
