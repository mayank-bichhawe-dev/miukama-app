const {
  passwordCompare,
  passwordEncryption,
} = require('../passportConfiguration/bcryptHelp');
const { checkUserPasswordValidate } = require('./userSchemaValidations');
const { PasswordHistory } = require('../models');

const changePasswordHelper = async (newPassword, user) => {
  checkUserPasswordValidate(newPassword);
  const checkUserCurrentPassowrdIsSameAsNew = await passwordCompare(
    newPassword,
    user.password,
  );

  if (checkUserCurrentPassowrdIsSameAsNew) {
    return false;
  }

  const userPasswordHistory = await PasswordHistory.findAll({
    where: { userId: user.id },
  });

  for (const iterator of userPasswordHistory) {
    const newPasswordAlreadyExistInUsedPassword = await passwordCompare(
      newPassword,
      iterator.previousPasswords,
    );
    if (newPasswordAlreadyExistInUsedPassword) {
      return false;
    }
  }

  const encPass = await passwordEncryption(newPassword);
  const userOldDetails = { ...user.dataValues };

  await PasswordHistory.create({
    userId: user.id,
    previousPasswords: userOldDetails.password,
  });

  await user.update(
    {
      password: encPass,
      resetPasswordToken: null,
      resetPasswordTokenExpire: null,
    },
    { where: { id: user.id } },
  );

  return true;
};

module.exports = changePasswordHelper;
