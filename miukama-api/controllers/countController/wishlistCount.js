const {
  Product,
  Category,
  Wishlist,
  Gallery,
  Sequelize,
} = require('../../models');

const wishlistCount = async (
  userId,
  visibilityCondition,
  additionalCondition = {},
) => {
  return await Wishlist.count({
    where: {
      userId,
      ...additionalCondition,
    },
    include: [
      {
        model: Product,
        required: true,
        include: [
          {
            model: Category,
            required: true,
            where: visibilityCondition,
            include: [
              { model: Gallery, required: true, where: visibilityCondition },
            ],
          },
        ],
        where: visibilityCondition,
      },
    ],

    required: true,
  });
};

exports.todaysWishlistCnt = async (userId, visibilityCondition) => {
  return wishlistCount(userId, visibilityCondition, {
    createdAt: {
      [Sequelize.Op.gte]: new Date().setHours(0, 0, 0, 0),
    },
  });
};

exports.totalWishlistCnt = async (userId, visibilityCondition) => {
  return wishlistCount(userId, visibilityCondition, {});
};
