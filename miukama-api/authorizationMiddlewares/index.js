const { Op } = require('sequelize');
const { UserPlan, Feature, PlanFeatureMapping } = require('../models');

async function fetchPlanAndFeature(userId, featureName) {
  const plan = await UserPlan.findOne({
    where: {
      userId: userId,
      isActive: true,
      expiredAt: { [Op.or]: [{ [Op.gte]: new Date() }, { [Op.eq]: null }] },
    },

    order: [['id', 'DESC']],
  });
  if (!plan) {
    return null;
  }

  const currentPlan = plan.toJSON();

  const features = await PlanFeatureMapping.findOne({
    where: {
      planId: currentPlan.planId,
    },
    attributes: [
      'id',
      'planId',
      'featureId',
      'description',
      'limit',
      'effect',
      'visibility',
    ],
    include: [
      {
        model: Feature,
        attributes: [],
        where: {
          name: featureName,
        },
      },
    ],
  });

  if (!features) {
    return null;
  }

  const currentFeatures = features.toJSON();

  return { currentFeatures, currentPlan };
}

module.exports = { fetchPlanAndFeature };
