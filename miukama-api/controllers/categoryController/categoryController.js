const { Op } = require('sequelize');
const {
  Gallery,
  Category,
  User,
  SubCategory,
  Sequelize,
} = require('../../models');
const {
  sendBadRequest,
  sendSuccess,
  sendInternalError,
} = require('../../utils/customResponse');
exports.categoryGetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findOne({
      where: { id },
      include: [
        {
          model: Gallery,
          attribute: [],
        },
        {
          model: SubCategory,
          attributes: ['id', 'name'],
        },
      ],
      attribute: [],
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }
    return sendSuccess(res, 'Get single category successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
exports.categoryCreateOne = async (req, res) => {
  try {
    const {
      categoryName,
      galleryId,
      description,
      visibility,
      subCategories = [],
    } = req.body;
    const gallery = await Gallery.findOne({ where: { id: galleryId } });

    if (!gallery) {
      return sendBadRequest(res, 'Invalid Gallery');
    }

    const categoryCreateResponse = await Category.create({
      categoryName,
      galleryId: gallery.id,
      userId: req.user.id,
      description,
      visibility,
    });
    await SubCategory.bulkCreate(
      subCategories.map((name) => ({
        name,
        categoryId: categoryCreateResponse.id,
        userId: req.user.id,
      })),
    );

    return sendSuccess(res, 'successfully created category');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
exports.categoryGetAll = async (req, res) => {
  try {
    const page =
      parseInt(req.query.page) || parseInt(process.env.DEFAULT_PAGE || '1');
    const pageSize =
      parseInt(req.query.pageSize) ||
      parseInt(process.env.DEFAULT_PAGE_SIZE || '10');
    const { categoryName, visibility } = req.query;

    const publicVisibility = {
      visibility: false,
    };

    const privateVisibility = {
      visibility: true,
      userId: req.user.id,
    };

    const defaultVisibility = {
      [Op.or]: [publicVisibility, privateVisibility],
    };

    let visibilityCondition = {},
      whereClause = {};
    if (visibility === 'public') {
      visibilityCondition = publicVisibility;
    } else if (visibility === 'private') {
      visibilityCondition = privateVisibility;
    } else {
      visibilityCondition = defaultVisibility;
    }
    if (categoryName) {
      whereClause.categoryName = { [Sequelize.Op.iLike]: `%${categoryName}%` };
    }
    const data = await Category.findAndCountAll({
      where: { ...whereClause, ...visibilityCondition },
      order: [['id', 'asc']],
      attributes: [
        'id',
        'categoryName',
        'galleryId',
        'description',
        'visibility',
        'userId',
        'createdAt',
        [
          Sequelize.literal(
            '(SELECT COUNT("Products"."id") FROM "Products" WHERE "Products"."categoryId" = "Category"."id" AND "Products"."visibility"=false)',
          ),
          'publicCount',
        ],
        [
          Sequelize.literal(
            '(SELECT COUNT("Products"."id") FROM "Products" WHERE "Products"."categoryId" = "Category"."id" AND "Products"."visibility"=true)',
          ),
          'privateCount',
        ],
        [
          Sequelize.fn(
            'concat',
            Sequelize.col('User.firstName'),
            ' ',
            Sequelize.col('User.lastName'),
          ),
          'ownerName',
        ],
      ],
      include: [
        {
          model: Gallery,
          where: defaultVisibility,
          required: true,
        },
        {
          model: SubCategory,
          attributes: [
            'id',
            'name',
            [
              Sequelize.literal(
                '(SELECT COUNT("Products"."id") FROM "Products" WHERE "Products"."subCategoryId" = "SubCategories"."id" AND "Products"."visibility" = false)',
              ),
              'publicCount',
            ],
            [
              Sequelize.literal(
                '(SELECT COUNT("Products"."id") FROM "Products" WHERE "Products"."subCategoryId" = "SubCategories"."id" AND "Products"."visibility" = true)',
              ),
              'privateCount',
            ],
          ],
        },
        {
          model: User,
          attributes: [
            'id',
            'imagePath',
            'fileSystemId',
            'firstName',
            'lastName',
            'email',
          ],
          required: true,
        },
      ],
      required: true,
      distinct: true,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    return sendSuccess(res, 'Get all category successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
