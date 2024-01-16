const { Product, Gallery, Category, Sequelize } = require('../../models');

const productCount = async (
  visibilityCondition,
  visibilityDefaultCondition,
  additionalCondition = {},
) => {
  return await Product.count({
    where: { ...visibilityCondition, ...additionalCondition },
    required: true,
    include: [
      {
        model: Category,
        required: true,
        where: visibilityDefaultCondition,
        include: [
          {
            model: Gallery,
            required: true,
            where: visibilityDefaultCondition,
          },
        ],
      },
    ],
  });
};

exports.totalPrivateProductCnt = async (
  visibilityCondition,
  visibilityDefaultCondition = {},
) => {
  return productCount(visibilityCondition, visibilityDefaultCondition);
};

exports.todayPrivateProductCnt = async (
  visibilityCondition,
  visibilityDefaultCondition,
) => {
  return productCount(visibilityCondition, visibilityDefaultCondition, {
    createdAt: {
      [Sequelize.Op.gte]: new Date().setHours(0, 0, 0, 0),
    },
  });
};

exports.todayPublicProductCnt = async (
  visibilityCondition,
  visibilityDefaultCondition,
) => {
  return productCount(visibilityCondition, visibilityDefaultCondition, {
    createdAt: {
      [Sequelize.Op.gte]: new Date().setHours(0, 0, 0, 0),
    },
  });
};

exports.totalPublicProductCnt = async (
  visibilityCondition,
  visibilityDefaultCondition,
) => {
  return productCount(visibilityCondition, visibilityDefaultCondition);
};

exports.totalDefaultProductCnt = async (
  visibilityCondition,
  visibilityDefaultCondition,
) => {
  return productCount(visibilityCondition, visibilityDefaultCondition);
};

exports.todaysDefaultProductCnt = async (
  visibilityCondition,
  visibilityDefaultCondition,
) => {
  return productCount(visibilityCondition, visibilityDefaultCondition, {
    createdAt: {
      [Sequelize.Op.gte]: new Date().setHours(0, 0, 0, 0),
    },
  });
};
