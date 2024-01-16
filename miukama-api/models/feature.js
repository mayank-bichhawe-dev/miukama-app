'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  Feature.init(
    {
      name: DataTypes.STRING,
      orderPriority: DataTypes.INTEGER,
      isHiddenFeature: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Feature',
    },
  );
  return Feature;
};
