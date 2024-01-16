const {
  Product,
  Category,
  SubCategory,
  Wishlist,
  Gallery,
  Sequelize,
  User,
} = require('../../models');
const {
  sendInternalError,
  sendBadRequest,
  sendSuccess,
} = require('../../utils/customResponse');
const attribute = require('./productAttributes');
const { s3ImageFolderName } = require('../../utils/s3ImgEnums');
const {
  handleFileUpload,
} = require('../uploadImageFunction/uploadImageFunction');

exports.productCreateOne = async (req, res) => {
  try {
    const categoryId = parseInt(req.body.categoryId);
    const visibility = /true/.test(req.body.visibility);
    const subCategoryId = parseInt(req.body.subCategoryId);
    const priceOfCurrent = parseFloat(req.body.priceOfCurrent);
    const priceOfPurchase = parseFloat(req.body.priceOfPurchase);
    const priceOfOrigin = parseFloat(req.body.priceOfOrigin);
    const obj = {
      ...req.body,
      categoryId,
      subCategoryId,
      visibility,
      priceOfCurrent,
      priceOfPurchase,
      priceOfOrigin,
    };
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return sendBadRequest(res, 'Invalid category');
    }
    let subCategory = null;
    if (subCategoryId) {
      subCategory = await SubCategory.findOne({
        where: { id: subCategoryId, categoryId },
      });
      if (!subCategory)
        return sendBadRequest(res, 'category and subCategory do not match');
      obj.subCategoryId = subCategoryId;
    }

    if (req.files && req.files.file) {
      const { file } = req.files;
      const result = await handleFileUpload(
        file,
        req.user.id,
        s3ImageFolderName.product,
      );

      if (result) {
        obj.fileSystemId = result.fileSystemId;
        obj.imagePath = result.imagePath;
      }
    }
    await Product.create({
      ...obj,
      userId: req.user.id,
      categoryId: category.id,
      subCategoryId: subCategory ? subCategory.id : null,
    });

    return sendSuccess(res, 'Product created successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.productGetAll = async (req, res) => {
  try {
    const page =
      parseInt(req.query.page) || parseInt(process.env.DEFAULT_PAGE || '1');
    const pageSize =
      parseInt(req.query.pageSize) ||
      parseInt(process.env.DEFAULT_PAGE_SIZE || '10');
    let whereClause = {};

    const publicVisibilityCondition = {
      visibility: false,
    };

    const privateVisibilityCondition = {
      visibility: true,
      userId: req.user.id,
    };

    const defaultVisibilityCondition = {
      [Sequelize.Op.or]: [
        publicVisibilityCondition,
        privateVisibilityCondition,
      ],
    };

    let visibilityCondition = {};
    const { itemName, categoryId, visibility } = req.query;

    if (visibility === 'public') {
      visibilityCondition = publicVisibilityCondition;
    } else if (visibility === 'private') {
      visibilityCondition = privateVisibilityCondition;
    } else {
      visibilityCondition = defaultVisibilityCondition;
    }

    if (itemName) {
      whereClause.itemName = { [Sequelize.Op.iLike]: `%${itemName}%` };
    }
    if (categoryId) {
      whereClause.categoryId = { [Sequelize.Op.eq]: categoryId };
    }

    const data = await Product.findAndCountAll({
      attributes: attribute,
      include: [
        {
          model: Category,
          where: defaultVisibilityCondition,
          attributes: [
            'id',
            'categoryName',
            'galleryId',
            'description',
            'visibility',
            'userId',
          ],
          required: true,
          include: [
            {
              model: Gallery,
              attributes: ['id', 'userId', 'visibility'],
              where: defaultVisibilityCondition,
              required: true,
            },
          ],
        },
        {
          model: Wishlist,
          attributes: ['productId', 'id', 'userId'],
          required: false,
          where: { userId: req.user.id },
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
      where: { ...whereClause, ...visibilityCondition },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    return sendSuccess(res, 'Get all products successfully', data);
  } catch (err) {
    console.log(err);
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.productUpdateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryId = parseInt(req.body.categoryId);
    const visibility = /true/.test(req.body.visibility);
    const obj = { ...req.body, categoryId, visibility };
    const data = await Product.findOne({
      where: { id },
      include: [
        {
          model: User,
        },
      ],
    });

    if (!data) return sendBadRequest(res, 'Invalid Id');
    const file = req.files && req.files.file;
    if (file) {
      const result = await handleFileUpload(
        file,
        req.user.id,
        s3ImageFolderName.product,
      );

      if (result) {
        obj.fileSystemId = result.fileSystemId;
        obj.imagePath = result.imagePath;
      }
    }
    await Product.update(obj, { where: { id } });
    return sendSuccess(res, 'Product updated successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.productDeleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findOne({
      where: {
        id,
      },
    });

    if (!data) return sendBadRequest(res, 'Invalid Id');
    await data.destroy();
    await Wishlist.destroy({
      where: {
        productId: id,
      },
    });
    return sendSuccess(res, 'Product deleted successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.productGetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Category,
          attributes: [
            'id',
            'categoryName',
            'galleryId',
            'description',
            'visibility',
            'userId',
          ],
        },
      ],
      attributes: attribute,
    });
    if (!data) return sendBadRequest(res, 'Invalid Id');
    return sendSuccess(res, 'Get single product successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
