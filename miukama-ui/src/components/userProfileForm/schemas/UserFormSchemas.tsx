'use client';

const minMaxContactNoMsg = 'my_profile.validation.contact_length';
import * as Yup from 'yup';
const isValidEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const userFormSchema = (t: any) =>
  Yup.object({
    firstName: Yup.string()
      .required(t('my_profile.validation.first_name'))
      .min(2),
    lastName: Yup.string()
      .required(t('my_profile.validation.last_name'))
      .min(2),
    email: Yup.string()
      .email(t('my_profile.validation.valid_email'))
      .required(t('my_profile.validation.enter_email'))
      .matches(isValidEmail, {
        message: t('my_profile.validation.not_valid_email'),
      }),
    contact: Yup.string()
      .required(t('my_profile.validation.valid_contact_number'))
      .matches(phoneRegExp, t('my_profile.validation.not_valid_contact'))
      .max(10, t(minMaxContactNoMsg))
      .min(7, t(minMaxContactNoMsg)),
    address: Yup.string().required(t('my_profile.validation.valid_address')),
  });
