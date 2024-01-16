'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Plan extends Model {
    static associate(models) {
      Plan.hasMany(models.UserPlan, {
        foreignKey: 'planId',
      });
      Plan.hasMany(models.PlanFeatureMapping, {
        foreignKey: 'planId',
      });
    }
  }
  Plan.init(
    {
      planName: DataTypes.STRING,
      default: DataTypes.BOOLEAN,
      highlight: DataTypes.BOOLEAN,
      duration: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      priceInMonth: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      priceInYear: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      isHiddenPlan: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Plan',
    },
  );
  return Plan;
};
