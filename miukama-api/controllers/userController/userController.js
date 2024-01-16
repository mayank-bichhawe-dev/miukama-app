const {
  User,
  Faq,
  Sequelize,
  SubCategory,
  Gallery,
  Category,
  Product,
  Wishlist,
  UserPlan,
} = require('../../models');
require('../../passportConfiguration/bcryptHelp');
const {
  sendBadRequest,
  sendSuccess,
  sendInternalError,
} = require('../../utils/customResponse');
const jwt = require('jsonwebtoken');
const s3ImageUploader = require('../../utils/imageUploader');
const { s3ImageFolderName } = require('../../utils/s3ImgEnums');
const { uploadFileSystem } = require('../../utils/uploadFileSystem');

exports.getUserDetails = async (req, res) => {
  try {
    const attributes = [
      'id',
      'firstName',
      'lastName',
      'email',
      'address',
      'contact',
      'authProvider',
      'imagePath',
      'userType',
    ];
    const userId = req.params.userId || req.user.id;

    const user = await User.findByPk(userId, { attributes: attributes });
    const data = { ...user.dataValues };
    return sendSuccess(res, 'User profile successfully retrieved.', data);
  } catch (error) {
    return sendBadRequest(res, error.message);
  }
};

exports.userProfileUpdate = async (req, res) => {
  try {
    const obj = { ...req.body };

    if (req.files && req.files.file) {
      const { name, mimetype } = req.files.file;
      const fileType = mimetype.split('/');

      if (fileType[0] !== 'image') {
        return sendBadRequest(
          res,
          'the uploded file should be a image file like .png .jpg .jpeg',
        );
      }

      const imageName = `${name}${Date.now()}.${fileType[1]}`;

      s3ImageUploader(
        obj.id,
        req.files.file,
        s3ImageFolderName.profile,
        imageName,
      );

      const fileSystem = await uploadFileSystem(
        s3ImageFolderName.profile,
        imageName,
      );

      obj.fileSystemId = fileSystem.id;
      obj.imagePath = `${s3ImageFolderName.profile}/${obj.id}/${imageName}`;
    }

    const userId = req.params.userId || req.user.id;

    await User.update(obj, { where: { id: userId } });

    if (!req.params.userId) {
      const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET || 'my_jwt_secret',
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '30d',
        },
      );
      return sendSuccess(res, 'Profile updated succefully', { token: token });
    } else {
      return sendSuccess(res, 'Profile updated succefully', {});
    }
  } catch (error) {
    return sendInternalError(res, error.message);
  }
};

exports.userDelete = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return sendBadRequest(res, 'Invalid Id');
    }
    if (req.params.userId !== req.user.id) {
      await user.destroy();
      const tablesToDelete = [
        Gallery,
        Category,
        Product,
        UserPlan,
        Wishlist,
        SubCategory,
        Faq,
      ];

      for (const table of tablesToDelete) {
        await table.destroy({ where: { userId: id } });
      }

      return sendSuccess(res, 'User Deleted Successfully');
    } else {
      return sendBadRequest(res, 'Do not delete itself!');
    }
  } catch (error) {
    return sendInternalError(res, error.message);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const currentPage =
      parseInt(req.query.page) || parseInt(process.env.DEFAULT_PAGE || '1');

    const pageSize =
      parseInt(req.query.pageSize) ||
      parseInt(process.env.DEFAULT_PAGE_SIZE || '10');

    const searchTerm = req.query.name || '';

    const users = await User.findAndCountAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'userType',
        'contact',
        'address',
        'fileSystemId',
        'imagePath',
      ],
      limit: pageSize,
      offset: (currentPage - 1) * 10,
      where: {
        [Sequelize.Op.and]: {
          [Sequelize.Op.or]: [
            { firstName: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
            { lastName: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
            { email: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
          ],
          id: { [Sequelize.Op.not]: req.user.id },
        },
      },
    });

    return sendSuccess(res, 'Get All User Successfully', users);
  } catch (error) {
    return sendInternalError(res, error.message);
  }
};
