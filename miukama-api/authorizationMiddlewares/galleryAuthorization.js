const { fetchPlanAndFeature } = require('.');
const { sendBadRequest } = require('../utils/customResponse');

const AUTHORIZATION_FAIL = 'Authorization failed';

async function galleryAuthorization(req, res, next) {
  const currentPlanAndFeature = await fetchPlanAndFeature(
    req.user.id,
    'Galleries',
  );

  const { currentFeatures } = currentPlanAndFeature;
  if (!currentPlanAndFeature || currentFeatures.effect) {
    return sendBadRequest(res, AUTHORIZATION_FAIL, {});
  }

  if (['POST', 'PATCH', 'PUT'].includes(req.method)) {
    const visibility = req.body.visibility;

    const requestVisibility = /true/.test(visibility);

    const requestNumber = Number(requestVisibility);

    if ((currentFeatures.visibility || []).includes(requestNumber)) {
      return next();
    }
  } else {
    // TODO handle when pass empty visibility
    const visibility = req.query.visibility === 'public' ? 0 : 1;
    if (
      currentFeatures.visibility.length &&
      (currentFeatures.visibility || []).includes(visibility)
    ) {
      return next();
    }
  }
  return sendBadRequest(res, AUTHORIZATION_FAIL, {});
}

module.exports = { galleryAuthorization };
