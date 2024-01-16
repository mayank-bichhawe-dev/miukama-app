import * as Yup from 'yup';

export const loginFormSchema = (t: any) =>
  Yup.object({
    email: Yup.string().required(t('loginForm.validation.email')),
    password: Yup.string().required(t('loginForm.validation.password')),
  });
