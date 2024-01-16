const { fetchPlanAndFeature } = require('.');
const { sendBadRequest } = require('../utils/customResponse');

async function categoryAuthorization(req, res, next) {
  const currentPlanAndFeature = await fetchPlanAndFeature(
    req.user.id,
    'Categories',
  );
  if (!currentPlanAndFeature) {
    return sendBadRequest(res, 'Authorization failed', {});
  }
  const requestVisibility = /true/.test(req.body.visibility);
  const requestNumber = Number(requestVisibility);
  if (
    (currentPlanAndFeature.currentFeatures.visibility || []).includes(
      requestNumber,
    )
  ) {
    next();
  } else {
    return sendBadRequest(
      res,
      'Authorization failed! Can not create category',
      {},
    );
  }
}

module.exports = { categoryAuthorization };
