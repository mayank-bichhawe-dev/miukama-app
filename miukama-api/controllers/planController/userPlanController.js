const { UserPlan, Plan, Sequelize } = require('../../models');

const {
  sendInternalError,
  sendSuccess,
} = require('../../utils/customResponse');

exports.addUserPlan = async (req, res) => {
  try {
    const { planId, planType } = req.body;
    const plan = await Plan.findByPk(planId);
    let expiredAt = null;

    if (plan.duration > 0) {
      if (planType === 'month') {
        const durationInMonths = plan.duration;
        expiredAt = new Date();
        expiredAt.setMonth(expiredAt.getMonth() + durationInMonths);
      } else if (planType === 'year') {
        expiredAt = new Date();
        expiredAt.setFullYear(expiredAt.getFullYear() + 1);
      }
    }

    await UserPlan.create({
      userId: req.user.id,
      planId,
      expiredAt,
      isActive: true,
      planType,
    });
    return sendSuccess(res, 'UserPlan created Successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
exports.getUserPlan = async (req, res) => {
  try {
    let userPlan = await UserPlan.findOne({
      order: [['id', 'desc']],
      where: {
        userId: req.user.id,
        isActive: true,

        [Sequelize.Op.or]: [
          {
            expiredAt: null,
          },
          {
            expiredAt: {
              [Sequelize.Op.gte]: new Date(),
            },
          },
        ],
      },
      attributes: ['userId', 'planId', 'expiredAt', 'isActive'],
      include: [
        {
          model: Plan,
          attributes: ['id', 'planName'],
          required: true,
        },
      ],
      distinct: true,
    });
    return sendSuccess(res, 'Get userPlan', userPlan);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
