'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlanFeatureMapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlanFeatureMapping.belongsTo(models.Plan, {
        foreignKey: 'planId',
      });
      PlanFeatureMapping.belongsTo(models.Feature, {
        foreignKey: 'featureId',
      });
    }
  }
  PlanFeatureMapping.init(
    {
      planId: DataTypes.INTEGER,
      featureId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      limit: DataTypes.INTEGER,
      effect: DataTypes.BOOLEAN,
      visibility: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: 'PlanFeatureMapping',
    },
  );
  return PlanFeatureMapping;
};
