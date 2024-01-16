const { Plan, Feature, PlanFeatureMapping } = require('../../models');

const {
  sendInternalError,
  sendSuccess,
} = require('../../utils/customResponse');
exports.fetchAllPlan = async (req, res) => {
  try {
    const plans = await Plan.findAll({
      attributes: [
        'id',
        'planName',
        'highlight',
        'duration',
        'priceInMonth',
        'priceInYear',
      ],
      where: {
        isHiddenPlan: false,
      },
      include: [
        {
          model: PlanFeatureMapping,
          attributes: ['planId', 'featureId', 'description', 'limit', 'effect'],
          include: [
            {
              model: Feature,

              attributes: ['id', 'orderPriority', 'name'],
            },
          ],
        },
      ],
      order: [
        ['id', 'ASC'],
        [PlanFeatureMapping, Feature, 'orderPriority', 'ASC'],
      ],
      distinct: true,
    });

    const formattedPlans = plans.map((plan) => {
      const plainPlan = plan.get({ plain: true });
      plainPlan.PlanFeatureMappings = plainPlan.PlanFeatureMappings.map(
        (mapping) => {
          const result = {
            planId: mapping.planId,
            featureId: mapping.Feature.id,
            feature: mapping.Feature,
          };
          if (mapping.limit === null && mapping.effect === null) {
            result.data = mapping.description;
          } else if (mapping.description === null && mapping.effect === null) {
            result.data = mapping.limit;
          } else {
            result.data = mapping.effect;
          }
          return result;
        },
      );
      return plainPlan;
    });

    const feature = await Feature.findAndCountAll({
      attributes: ['id', 'orderPriority', 'name'],
      where: { isHiddenFeature: false },
      order: [['orderPriority', 'ASC']],
    });

    return sendSuccess(res, 'Get all plan successfully', {
      plansData: formattedPlans,
      feature: feature.rows,
    });
  } catch (err) {
    console.log(err);
    return sendInternalError(res, 'Something went wrong');
  }
};
