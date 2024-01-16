const { Post, Sequelize } = require('../../models');
const {
  sendInternalError,
  sendBadRequest,
  sendSuccess,
} = require('../../utils/customResponse');
const { s3ImageFolderName } = require('../../utils/s3ImgEnums');
const {
  handleFileUpload,
} = require('../uploadImageFunction/uploadImageFunction');
exports.postGetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Post.findOne({
      where: { id },
      attributes: [
        'id',
        'title',
        'description',
        'fileName',
        'userId',
        'externalLink',
        'imagePath',
        'fileSystemId',
      ],
    });
    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }
    return sendSuccess(res, 'Get single post successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
exports.postGetAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || parseInt(process.env.DEFAULT_PAGE);
    const pageSize =
      parseInt(req.query.pageSize) || parseInt(process.env.DEFAULT_PAGE_SIZE);
    const { title } = req.query;
    const whereClause = {};
    if (title) {
      whereClause.title = { [Sequelize.Op.iLike]: `%${title}%` };
    }
    const data = await Post.findAndCountAll({
      where: whereClause,
      order: [['id', 'asc']],
      attributes: [
        'id',
        'title',
        'description',
        'fileName',
        'externalLink',
        'updatedAt',
        'imagePath',
        'fileSystemId',
      ],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    return sendSuccess(res, 'Get all posts successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.postCreateOne = async (req, res) => {
  try {
    const obj = { ...req.body };

    if (!(req.files && req.files.file)) {
      return sendBadRequest(res, 'unidentified file', {});
    }

    const { file } = req.files;
    const result = await handleFileUpload(
      file,
      req.user.id,
      s3ImageFolderName.dashboardPost,
    );

    if (result) {
      obj.fileSystemId = result.fileSystemId;
      obj.imagePath = result.imagePath;
    }

    await Post.create({
      ...obj,
      userId: req.user.id,
    });

    return sendSuccess(res, 'Post created successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.postUpdateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = { ...req.body };
    const data = await Post.findOne({
      where: { id },
    });

    if (!data) return sendBadRequest(res, 'Invalid Id');
    const file = req.files && req.files.file;

    if (!(req.files && req.files.file)) {
      return sendBadRequest(res, 'unidentified file', {});
    }
    if (file) {
      const result = await handleFileUpload(
        file,
        req.user.id,
        s3ImageFolderName.dashboardPost,
      );

      if (result) {
        obj.fileSystemId = result.fileSystemId;
        obj.imagePath = result.imagePath;
      }
    }
    await Post.update(obj, { where: { userId: req.user.id, id: id } });
    return sendSuccess(res, 'Post updated Successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.postDeleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Post.findOne({
      where: { id },
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }
    await data.destroy();
    return sendSuccess(res, 'Post deleted successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
