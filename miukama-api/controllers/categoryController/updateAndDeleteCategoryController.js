const { Category, Product, SubCategory } = require('../../models');
const {
  sendBadRequest,
  sendSuccess,
  sendInternalError,
} = require('../../utils/customResponse');
exports.categoryUpdateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      categoryName,
      description,
      visibility,
      galleryId,
      subCategories = [],
    } = req.body;
    const data = await Category.findOne({
      where: {
        id: id,
      },
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }
    data.categoryName = categoryName;
    data.description = description;
    data.visibility = visibility;
    data.galleryId = galleryId;

    await data.save();
    const subCategoriesInDb = await SubCategory.findAll({
      where: { categoryId: id },
    });

    const subCategoriesToUpdate = (subCategories || []).filter(
      ({ id }) => id && id > 0,
    );
    subCategoriesToUpdate.forEach(async ({ name, id }) => {
      await SubCategory.update({ name }, { where: { id } });
    });

    const subCategoryUpdateIds = subCategories.map(({ id }) => id || null);

    const subCategoriesToDelete = subCategoriesInDb.filter(
      ({ dataValues: { id } }) => subCategoryUpdateIds.indexOf(id) < 0,
    );
    subCategoriesToDelete.forEach(async (eachOne) => {
      await SubCategory.destroy({ where: { id: eachOne.dataValues.id } });
    });

    const subCategoriesToInsert = (subCategories || []).filter(
      ({ id }) => id === null || id === undefined,
    );

    SubCategory.bulkCreate(
      subCategoriesToInsert.map(({ name }) => ({
        name,
        userId: req.user.id,
        categoryId: id,
      })),
    );

    return sendSuccess(res, 'category updated successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
exports.categoryDeleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findOne({
      where: { id },
    });
    if (!data) return sendBadRequest(res, 'Invalid Id');
    await data.destroy();
    await SubCategory.destroy({ where: { categoryId: id } });
    await Product.destroy({
      where: {
        categoryId: id,
      },
    });
    return sendSuccess(res, 'category deleted!');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
