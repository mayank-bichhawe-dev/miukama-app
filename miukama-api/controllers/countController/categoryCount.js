const { Gallery, Category, Sequelize } = require('../../models');
const {
  categoryAuthorization,
} = require('../../authorizationMiddlewares/categoryAuthorization');
const categoryCnt = async (visibilityCondition, additionalCondition = {}) => {
  categoryAuthorization;
  return await Category.count({
    where: {
      ...visibilityCondition,
      ...additionalCondition,
    },
    include: [
      {
        model: Gallery,
        required: true,
        where: visibilityCondition,
      },
    ],
    required: true,
  });
};

exports.totalCategoryCnt = async (visibilityCondition) => {
  return await categoryCnt(visibilityCondition);
};

exports.todaysCategoryCnt = async (visibilityCondition) => {
  return await categoryCnt(visibilityCondition, {
    createdAt: {
      [Sequelize.Op.gte]: new Date().setHours(0, 0, 0, 0),
    },
  });
};
