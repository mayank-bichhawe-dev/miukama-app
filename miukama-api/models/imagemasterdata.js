'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageMasterData extends Model {
    static associate(models) {
      ImageMasterData.hasMany(models.FileSystem, {
        foreignKey: 'imageType',
      });
    }
  }
  ImageMasterData.init(
    {
      prefix: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ImageMasterData',
      paranoid: true,
    },
  );
  return ImageMasterData;
};
