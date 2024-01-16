require('../../models');
const {
  sendSuccess,
  sendInternalError,
} = require('../../utils/customResponse');
const { Op } = require('sequelize');
const { todaysWishlistCnt, totalWishlistCnt } = require('./wishlistCount');
const { todaysCategoryCnt, totalCategoryCnt } = require('./categoryCount');
const {
  totalPrivateProductCnt,
  todayPrivateProductCnt,
  todayPublicProductCnt,
  totalPublicProductCnt,
  totalDefaultProductCnt,
  todaysDefaultProductCnt,
} = require('./productCount');

exports.productCount = async (req, res) => {
  try {
    const publicVisibilityCondition = {
      visibility: false,
    };

    const privateVisibilityCondition = {
      visibility: true,
      userId: req.user.id,
    };

    const defaultVisibilityCondition = {
      [Op.or]: [publicVisibilityCondition, privateVisibilityCondition],
    };

    const todayWishlistCount = await todaysWishlistCnt(
      req.user.id,
      defaultVisibilityCondition,
    );

    const totalWishlistCount = await totalWishlistCnt(
      req.user.id,
      defaultVisibilityCondition,
    );

    const totalCategoryCount = await totalCategoryCnt(
      defaultVisibilityCondition,
    );

    const todayCategoryCount = await todaysCategoryCnt(
      defaultVisibilityCondition,
    );

    const totalPrivateProductCount = await totalPrivateProductCnt(
      privateVisibilityCondition,
      defaultVisibilityCondition,
    );

    const todayPrivateProductCount = await todayPrivateProductCnt(
      privateVisibilityCondition,
      defaultVisibilityCondition,
    );

    const todayPublicProductCount = await todayPublicProductCnt(
      publicVisibilityCondition,
      defaultVisibilityCondition,
    );

    const totalPublicProductCount = await totalPublicProductCnt(
      publicVisibilityCondition,
      defaultVisibilityCondition,
    );

    const totalProductCount = await totalDefaultProductCnt(
      defaultVisibilityCondition,
      defaultVisibilityCondition,
    );

    const todayProductCount = await todaysDefaultProductCnt(
      defaultVisibilityCondition,
      defaultVisibilityCondition,
    );

    const appendPercentage = (value) => {
      if (isNaN(value)) {
        return '0.00%';
      } else {
        return value.toFixed(2) + '%';
      }
    };
    const percentagePrivateProducts = appendPercentage(
      (todayPrivateProductCount / totalPrivateProductCount) * 100,
    );

    const percentagePublicProducts = appendPercentage(
      (todayPublicProductCount / totalPublicProductCount) * 100,
    );

    const percentageCategory = appendPercentage(
      (todayCategoryCount / totalCategoryCount) * 100,
    );

    const percentageWishlists = appendPercentage(
      (todayWishlistCount / totalWishlistCount) * 100,
    );

    const percentageProduct = appendPercentage(
      (todayProductCount / totalProductCount) * 100,
    );

    return sendSuccess(res, 'Get total products count successfully', {
      wishlistCount: {
        totalWishlistCount,
        todayWishlistCount,
        percentageWishlists,
      },
      categoryCount: {
        totalCategoryCount,
        todayCategoryCount,
        percentageCategory,
      },
      privateProductCount: {
        totalPrivateProductCount,
        todayPrivateProductCount,
        percentagePrivateProducts,
      },
      publicProductCount: {
        totalPublicProductCount,
        todayPublicProductCount,
        percentagePublicProducts,
      },
      userProductCount: {
        totalProductCount,
        todayProductCount,
        percentageProduct,
      },
    });
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
