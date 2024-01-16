'use client';

import * as Yup from 'yup';
const pass =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const ResetPassSchemas = (t: any) =>
  Yup.object({
    password: Yup.string()
      .required(t('resetPassword.validation.requiredPassword'))
      .min(8)
      .matches(pass, t('resetPassword.validation.requiredPassword')),
    confirmPassword: Yup.string()
      .required(t('resetPassword.validation.requiredPassword'))
      .oneOf(
        [Yup.ref('password')],
        t('resetPassword.validation.requiredPassword '),
      ),
  });
