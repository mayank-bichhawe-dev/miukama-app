exports.checkUserPasswordValidate = (password) => {
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    )
  ) {
    throw new Error(
      'The password must be at least 8 characters long and contain at least one numeric digit, one capital letter, and one special character.',
    );
  }
};
