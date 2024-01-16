'use client';
import React, { useContext } from 'react';
import FieldLayout from '@/components/formLayouts/FieldLayout';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material';
import AuthLayout from './AuthLayout';
import { useFormik } from 'formik';
import { signUpSchema } from './schemas/SignUpSchemas';
import { registerUser } from '../../api/userAPI/signUp';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AlertBox from '../alertBox/alertBox';
import { SignUpFormInterface } from '@/interfaces/signUpFormInterface';
import RenderPasswordField from '../formLayouts/RenderPasswordField';
import { KeyPrefix, TFunction } from 'i18next';
import { UserLoginContext } from '@/app/[lng]/layout';

const initialValues: SignUpFormInterface = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  contact: '',
  address: '',
  confirmPassword: '',
  termsOfService: false,
};
interface SignUpFormProps {
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  preferredLng: string;
}

const SignupForm: React.FC<SignUpFormProps> = ({ t }) => {
  const { langugeRoute } = useContext(UserLoginContext);
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  const alertCloseHandler = () => {
    setAlertMessages([]);
  };
  const router = useRouter();
  const userSignUp = async (value: SignUpFormInterface) => {
    const { data } = await registerUser(value);
    setAlertMessages([
      ...alertMessages,
      { type: data.success, message: data.message },
    ]);
    if (data.success) {
      setTimeout(() => {
        setAlertMessages([]);
        router.push(`${langugeRoute}/login`);
      }, 3000);
      handleReset(initialValues);
    }
  };
  const {
    setFieldValue,
    values,
    errors,
    touched,
    handleChange,
    handleReset,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema(t),
    onSubmit: async (values: SignUpFormInterface) => {
      await userSignUp(values);
    },
  });
  return (
    <AuthLayout title={t('signup.title')} t={t}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FieldLayout
              label={t('signup.label_first_name')}
              error={errors.firstName}
              showError={touched.firstName}>
              <TextField
                placeholder={t('signup.placeholder_first_name') as string}
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
            </FieldLayout>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FieldLayout
              label={t('signup.label_last_name')}
              error={errors.lastName}
              showError={touched.lastName}>
              <TextField
                placeholder={t('signup.placeholder_last_name') as string}
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </FieldLayout>
          </Grid>
        </Grid>

        <FieldLayout
          label={t('signup.email')}
          error={errors.email}
          showError={touched.email}>
          <TextField
            size="small"
            placeholder={t('signup.placeholder_email') as string}
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </FieldLayout>

        <FieldLayout
          label={t('signup.password')}
          error={errors.password}
          showError={touched.password}>
          <RenderPasswordField
            value={values.password}
            onChange={handleChange}
            name="password"
            size="small"
            placeholder="**********"
          />
        </FieldLayout>

        <FieldLayout
          label={t('signup.confirm_password')}
          error={errors.confirmPassword}
          noMargin={true}
          showError={touched.confirmPassword}>
          <RenderPasswordField
            value={values.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            size="small"
            placeholder="**********"
          />
        </FieldLayout>

        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => {
                setFieldValue('termsOfService', e.target.checked);
              }}
              name="termsOfService"
              checked={values.termsOfService}
            />
          }
          label={t('signup.terms_conditions')}
        />
        <FormHelperText style={{ color: '#B20000' }}>
          {touched.termsOfService && errors.termsOfService
            ? errors.termsOfService
            : ''}
        </FormHelperText>
        <Box paddingY="1.25rem">
          <AlertBox
            alertMessages={alertMessages}
            handleAlertClose={alertCloseHandler}></AlertBox>
        </Box>
        <Button type="submit" fullWidth>
          {t('signup.signup_button')}
        </Button>
      </Box>
    </AuthLayout>
  );
};
export default SignupForm;
