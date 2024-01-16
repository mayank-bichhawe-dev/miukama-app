const { fetchPlanAndFeature } = require('.');
const { sendBadRequest } = require('../utils/customResponse');

function genericFlagBasedAuthorization(featureType) {
  return async (req, res, next) => {
    const currentPlanAndFeature = await fetchPlanAndFeature(
      req.user.id,
      featureType,
    );
    if (!currentPlanAndFeature) {
      return sendBadRequest(res, 'Authorization failed', {});
    }
    const { currentFeatures } = currentPlanAndFeature;

    const visibility = req.body.visibility;

    const requestVisibility = /true/.test(visibility);

    const requestNumber = Number(requestVisibility);

    if ((currentFeatures.visibility || []).includes(requestNumber)) {
      return next();
    } else {
      return sendBadRequest(res, 'Authorization failed! can not allowed ', {});
    }
  };
}

module.exports = { genericFlagBasedAuthorization };
