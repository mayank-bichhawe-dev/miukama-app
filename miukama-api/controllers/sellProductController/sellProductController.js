const { Product, Wishlist, SellProduct, Sequelize } = require('../../models');
const {
  sendInternalError,
  sendBadRequest,
  sendSuccess,
} = require('../../utils/customResponse');

exports.sellProductCreateOne = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return sendBadRequest(res, 'Invalid Product');
    }
    await SellProduct.create({
      userId: req.user.id,
      productId: product.id,
    });

    return sendSuccess(res, 'Sell-product created successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.sellProductGetAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || parseInt(process.env.DEFAULT_PAGE);
    const pageSize =
      parseInt(req.query.pageSize) || parseInt(process.env.DEFAULT_PAGE_SIZE);
    const { itemName } = req.query;
    const whereClause = {
      userId: req.user.id,
    };

    if (itemName) {
      whereClause.itemName = { [Sequelize.Op.iLike]: `%${itemName}%` };
    }

    const product = await SellProduct.findAndCountAll({
      where: whereClause,
      order: [['id', 'asc']],
      include: [
        {
          model: Product,
          attributes: [
            'id',
            'categoryId',
            'itemName',
            'itemModel',
            'itemProductionNumber',
            'itemManufacturer',
            'yearOfOrigin',
            'color',
            'condition',
            'owner',
            'givenBy',
            'loanedBy',
            'description',
            'priceOfOrigin',
            'priceOfPurchase',
            'priceOfCurrent',
            'visibility',
          ],
        },
        {
          model: Wishlist,
          attributes: ['sellProductId'],
        },
      ],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    return sendSuccess(res, 'Get all sell-products successfully', product);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.sellProductDeleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await SellProduct.findOne({
      where: {
        userId: req.user.id,
        id: id,
      },
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }

    await data.destroy();
    return sendSuccess(res, 'Sell-product deleted successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
