import * as Yup from 'yup';

const passwordRules =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

export const signUpSchema = (t: any) =>
  Yup.object({
    firstName: Yup.string().required(t('signup.validation.first_name')),
    lastName: Yup.string().required(t('signup.validation.last_name')),
    email: Yup.string()
      .required(t('signup.validation.required_email'))
      .email(t('signup.validation.email')),
    password: Yup.string()
      .required(t('signup.validation.password'))
      .matches(passwordRules, {
        message: t('signup.validation.password_message'),
      }),
    confirmPassword: Yup.string()
      .required(t('signup.validation.confirm_password'))
      .oneOf(
        [Yup.ref('password')],
        t('signup.validation.match_confirm_password'),
      ),
    termsOfService: Yup.boolean()
      .required(t('signup.validation.terms_conditions'))
      .oneOf([true], t('signup.validation.terms_conditions')),
  });
