const { ImageMasterData, FileSystem } = require('../models');

exports.uploadFileSystem = async (prefixName, imageName) => {
  const imgMasterData = await ImageMasterData.findOne({
    where: { prefix: prefixName },
  });

  const fileSystem = await FileSystem.create({
    imageName: imageName,
    imageType: imgMasterData.id,
  });

  return fileSystem;
};
