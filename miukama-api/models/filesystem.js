'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FileSystem extends Model {
    static associate(models) {
      FileSystem.belongsTo(models.ImageMasterData, {
        foreignKey: 'imageType',
      });
    }
  }
  FileSystem.init(
    {
      imageName: DataTypes.STRING,
      imageType: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'FileSystem',
      paranoid: true,
    },
  );
  return FileSystem;
};
