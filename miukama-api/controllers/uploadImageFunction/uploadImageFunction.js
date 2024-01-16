const {
  sendInternalError,
  sendBadRequest,
} = require('../../utils/customResponse');
const s3ImageUploader = require('../../utils/imageUploader');
const { uploadFileSystem } = require('../../utils/uploadFileSystem');
exports.handleFileUpload = async (file, userId, s3ImageFolderName) => {
  try {
    if (!file) {
      return null;
    }

    const { name, mimetype } = file;
    const fileType = mimetype.split('/');

    if (fileType[0] !== 'image') {
      return sendBadRequest(
        'The uploaded file should be an image file like .png .jpg .jpeg',
      );
    }

    const imageName = `${name}${Date.now()}.${fileType[1]}`;
    s3ImageUploader(userId, file, s3ImageFolderName, imageName);

    const fileSystem = await uploadFileSystem(s3ImageFolderName, imageName);

    return {
      fileSystemId: fileSystem.id,
      imagePath: `${s3ImageFolderName}/${userId}/${imageName}`,
    };
  } catch (err) {
    return sendInternalError('Something went wrong');
  }
};
