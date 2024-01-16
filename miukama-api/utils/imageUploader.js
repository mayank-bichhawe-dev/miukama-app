const AWS = require('aws-sdk');

const s3ImageUploader = (userId, file, folderName, imageName) => {
  const { data, mimetype } = file;

  AWS.config.update({
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_ID,
    secretAccessKey: process.env.S3_ACCESS_SECRET_KEY,
  });

  const s3 = new AWS.S3();
  const bucketName = process.env.S3_BUKET_NAME;
  const objectKey = `${folderName}/${userId}/${imageName}`;
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: data,
    ContentType: mimetype,
  };

  s3.putObject(params, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log('image upload successfully', data);
    }
  });
};

module.exports = s3ImageUploader;
