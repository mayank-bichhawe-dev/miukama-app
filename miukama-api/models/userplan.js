'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPlan.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      UserPlan.belongsTo(models.Plan, {
        foreignKey: 'planId',
      });
    }
  }
  UserPlan.init(
    {
      isActive: DataTypes.BOOLEAN,
      expiredAt: DataTypes.DATE,
      userId: DataTypes.INTEGER,
      planId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserPlan',
    },
  );
  return UserPlan;
};
