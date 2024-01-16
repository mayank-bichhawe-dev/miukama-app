const { fetchPlanAndFeature } = require('.');
const { sendBadRequest } = require('../utils/customResponse');
const { Product } = require('../models');

async function productAuthorization(req, res, next) {
  const currentPlanAndFeature = await fetchPlanAndFeature(
    req.user.id,
    'Products',
  );
  if (!currentPlanAndFeature) {
    return sendBadRequest(res, 'Authorization failed', {});
  }

  const totalProducts = await Product.count({
    where: {
      userId: req.user.id,
    },
  });

  if (
    currentPlanAndFeature.currentFeatures.limit === null ||
    currentPlanAndFeature.currentFeatures.limit > totalProducts
  ) {
    next();
  } else {
    return sendBadRequest(
      res,
      'Authorization failed! Can not create product',
      {},
    );
  }
}

module.exports = { productAuthorization };
