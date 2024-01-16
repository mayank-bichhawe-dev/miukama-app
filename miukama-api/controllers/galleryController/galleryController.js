const { Gallery, sequelize, Category } = require('../../models');
const {
  sendInternalError,
  sendBadRequest,
  sendSuccess,
} = require('../../utils/customResponse');
const {
  handleFileUpload,
} = require('../uploadImageFunction/uploadImageFunction');
const { s3ImageFolderName } = require('../../utils/s3ImgEnums');
const fs = require('fs');
const { QueryTypes } = require('sequelize');
const galleryFetchAllQuery = fs
  .readFileSync('./custom-queries/gallery/gallery-fetch-all.sql')
  .toString();
const galleryFetchCountQuery = fs
  .readFileSync('./custom-queries/gallery/gallery-fetch-count.sql')
  .toString();

exports.galleryGetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Gallery.findOne({
      where: { id },
      attributes: [
        'id',
        'name',
        'description',
        'userId',
        'visibility',
        'imagePath',
        'fileSystemId',
      ],
    });
    if (!data) {
      return sendBadRequest(res, 'Invalid Id');
    }
    return sendSuccess(res, 'Get single gallery successfully', data);
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.galleryGetAll = async (req, res) => {
  try {
    const currentPage =
      parseInt(req.query.page) || parseInt(process.env.DEFAULT_PAGE || '1');
    const pageSize =
      parseInt(req.query.pageSize) ||
      parseInt(process.env.DEFAULT_PAGE_SIZE || '10');
    const { name, visibility } = req.query;

    let whereQuery = '';
    if (visibility === 'public') {
      whereQuery += '"Gallery"."visibility" = FALSE';
    } else if (visibility === 'private') {
      whereQuery +=
        '"Gallery"."visibility" = TRUE AND "Gallery"."userId" = ' + req.user.id;
    } else {
      whereQuery +=
        '("Gallery"."visibility" = FALSE OR ("Gallery"."visibility" = TRUE AND "Gallery"."userId" = ' +
        req.user.id +
        '))';
    }

    const countResponse = await sequelize.query(
      `${galleryFetchCountQuery} AND ${whereQuery} AND "name" ILIKE :name`,
      {
        // eslint-disable-next-line quotes
        replacements: { name: `%${name || ''}%` },
        type: QueryTypes.SELECT,
      },
    );

    const fetchQuery = `${galleryFetchAllQuery} AND ${whereQuery} AND "name" ILIKE :name ORDER BY "Gallery"."id" ASC LIMIT :limit OFFSET :offset`;

    const dataResponse = await sequelize.query(fetchQuery, {
      replacements: {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        name: `%${name || ''}%`,
      },
      type: QueryTypes.SELECT,
    });

    return sendSuccess(res, 'Get all galleries successfully', {
      count: countResponse[0].count,
      rows: dataResponse || [],
    });
  } catch (err) {
    console.log('Error :', err);
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.galleryCreateOne = async (req, res) => {
  try {
    const visibility = /true/.test(req.body.visibility);
    const obj = { ...req.body, visibility };
    if (req.files && req.files.file) {
      const { file } = req.files;
      const result = await handleFileUpload(
        file,
        req.user.id,
        s3ImageFolderName.gallery,
      );
      if (result) {
        obj.fileSystemId = result.fileSystemId;
        obj.imagePath = result.imagePath;
      }
    }
    await Gallery.create({
      ...obj,
      userId: req.user.id,
    });

    return sendSuccess(res, 'Gallery created successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.galleryUpdateOne = async (req, res) => {
  try {
    const id = req.params.id;

    const visibility = /true/.test(req.body.visibility);
    const obj = { ...req.body, visibility };

    const data = await Gallery.findOne({
      where: { id },
    });

    if (!data) return sendBadRequest(res, 'Invalid Id');
    const file = req.files && req.files.file;
    if (file) {
      const result = await handleFileUpload(
        file,
        req.user.id,
        s3ImageFolderName.gallery,
      );

      if (result) {
        obj.fileSystemId = result.fileSystemId;
        obj.imagePath = result.imagePath;
      }
    }
    data.save();
    await Gallery.update(obj, { where: { id } });
    return sendSuccess(res, 'Gallery updated Successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};

exports.galleryDeleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Gallery.findOne({
      where: { id },
    });

    if (!data) {
      return sendBadRequest(res, 'Invalid Gallery');
    }

    await data.destroy();
    await Category.destroy({
      where: {
        galleryId: id,
      },
    });
    return sendSuccess(res, 'Gallery deleted successfully');
  } catch (err) {
    return sendInternalError(res, 'Something went wrong');
  }
};
