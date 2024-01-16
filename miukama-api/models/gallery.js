'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gallery.hasMany(models.Category, {
        foreignKey: 'galleryId',
      });

      Gallery.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Gallery.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      visibility: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      imagePath: DataTypes.STRING,
      fileSystemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
    },
  );
  return Gallery;
};
