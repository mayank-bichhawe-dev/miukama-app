const bcrypt = require('bcrypt');

exports.passwordEncryption = (enterPassword) => {
  return bcrypt.hash(enterPassword, 10);
};

exports.passwordCompare = (enterPassword, comparePass) => {
  return bcrypt.compare(enterPassword, comparePass);
};
