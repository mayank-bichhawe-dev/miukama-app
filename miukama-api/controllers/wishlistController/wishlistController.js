const { Op } = require('sequelize');
const {
  Wishlist,
  Product,
  Category,
  SellProduct,
  User,
  Gallery,
  Sequelize,
} = require('../../models');

const {
  sendInternalError,
  sendBadRequest,
  sendSuccess,
} = require('../../utils/customResponse');

exports.wishlistGetAll = async (req, res) => {
  try {
    const { categoryId, itemName, page, pageSize } = req.query;
    const pageNumber =
      parseInt(page) || parseInt(process.env.DEFAULT_PAGE || '1');
    const pageItemLimit =
      parseInt(pageSize) || parseInt(process.env.DEFAULT_PAGE_SIZE || '10');

    const whereProduct = {};
    if (itemName) {
      whereProduct.itemName = { [Sequelize.Op.iLike]: `%${itemName}%` };
    }
    if (categoryId) {
      whereProduct.categoryId = { [Sequelize.Op.eq]: categoryId };
    }
    const defaultVisibilityCondition = {
      [Op.or]: [
        { visibility: false },
        { visibility: true, userId: req.user.id },
      ],
    };

    const data = await Wishlist.findAndCountAll({
      attributes: [
        'id',
        'productId',
        [
          Sequelize.fn(
            'concat',
            Sequelize.col('User.firstName'),
            ' ',
            Sequelize.col('User.lastName'),
          ),
          'ownerName',
        ],
        'userId',
        'updatedAt',
      ],
      order: [['id', 'asc']],

      include: [
        {
          model: Product,
          include: {
            model: Category,
            where: defaultVisibilityCondition,
            attributes: ['id'],
            required: true,
            include: [
              {
                model: Gallery,
                where: defaultVisibilityCondition,
                attributes: [],
                required: true,
              },
            ],
          },
          attributes: ['itemName', 'categoryId', 'userId', 'imagePath'],
          where: { ...whereProduct, ...defaultVisibilityCondition },
          required: true,
        },
        {
          model: User,
          attributes: [
            'imagePath',
            'fileSystemId',
            'firstName',
            'lastName',
            'email',
          ],
          required: true,
        },
      ],
      where: { userId: req.user.id },
      required: true,
      offset: (pageNumber - 1) * pageItemLimit,
      limit: pageItemLimit,
    });
    return sendSuccess(res, 'Get all wishlists successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.wishlistGetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Wishlist.findOne({
      where: {
        id: id,
      },
      attributes: ['id', 'productId', 'userId', 'updatedAt'],
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
            'userId',
          ],
        },
        {
          model: SellProduct,
          attributes: ['productId'],
        },
        {
          model: SellProduct,
          attributes: ['productId', 'userId'],
        },
      ],
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }
    return sendSuccess(res, 'Get single wishlists successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.wishlistCreateOne = async (req, res) => {
  const { productId } = req.body;
  try {
    const productAlreadyAdded = await Wishlist.findOne({
      where: { userId: req.user.id, productId: productId },
    });

    if (productAlreadyAdded) {
      return sendBadRequest(
        res,
        `productId already added: ${productAlreadyAdded.productId}`,
      );
    }
    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      return sendBadRequest(res, 'Invalid Product');
    }

    const data = await Wishlist.create({
      userId: req.user.id,
      productId: product.id,
    });

    return sendSuccess(res, 'Wishlist created successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.wishlistUpdateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const { productId, categoryId, sellProductId } = req.body;
    const data = await Wishlist.findOne({
      where: {
        id: id,
      },
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }

    data.productId = productId;
    data.categoryId = categoryId;
    data.sellProductId = sellProductId;

    await data.save();
    return sendSuccess(res, 'Wishlist update successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.wishlistDeleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Wishlist.findOne({
      where: {
        id: id,
      },
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }

    await data.destroy();
    return sendSuccess(res, 'Wishlist deleted successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
