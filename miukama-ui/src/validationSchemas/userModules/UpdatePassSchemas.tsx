'use client';

import * as Yup from 'yup';
const pass =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
export const UpdatePasswordSchemas = (t: any) =>
  Yup.object({
    oldPassword: Yup.string()
      .required(t('setting.changePassword.validation.oldPassword'))
      .min(8, t('setting.changePassword.validation.oldPasswordMin'))
      .matches(pass, t('setting.changePassword.validation.oldPasswordMatches')),
    password: Yup.string()
      .required(t('setting.changePassword.validation.password'))
      .min(8, t('setting.changePassword.validation.passwordMin'))
      .matches(pass, t('setting.changePassword.validation.passwordMatches')),
    confirmPassword: Yup.string()
      .required(t('setting.changePassword.validation.confirmPassword'))
      .oneOf(
        [Yup.ref('password')],
        t('setting.changePassword.validation.confirmPasswordOneOf'),
      )
      .notOneOf(
        [Yup.ref('oldPassword')],
        t('setting.changePassword.validation.confirmPasswordNotOneOf'),
      ),
  });
