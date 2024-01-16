const {
  UserPlan,
  Feature,
  PlanFeatureMapping,
  Sequelize,
  Plan,
} = require('../models');

const fetchUserPlanDetails = async (userId) => {
  const userPlanDetails = await UserPlan.findOne({
    where: {
      [Sequelize.Op.and]: {
        userId,
        [Sequelize.Op.or]: [
          { expiredAt: null },
          { expiredAt: { [Sequelize.Op.gte]: new Date() } },
        ],
      },
    },
    attributes: ['id', 'createdAt'],
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Plan,
        attributes: ['id', 'planName'],
        required: true,
        include: [
          {
            model: PlanFeatureMapping,
            attributes: ['id', 'effect', 'limit'],
            required: true,
            include: [
              {
                model: Feature,
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      },
    ],
  });

  return userPlanDetails;
};

module.exports = { fetchUserPlanDetails };
