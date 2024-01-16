'use client';

import * as Yup from 'yup';

export const forgotPassSchemas = (t: any) =>
  Yup.object({
    email: Yup.string()
      .required(t('forget_password.validation.required_email'))
      .email(t('forget_password.validation.email')),
  });
