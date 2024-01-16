'use client';

import FieldLayout from '@/components/formLayouts/FieldLayout';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import AuthLayout from './AuthLayout';
import { useFormik } from 'formik';
import { loginFormSchema } from './schemas/LoginFormSchemas';
import {
  facebookAuthLogin,
  googleAuthLogin,
  loginUser,
} from '../../api/userAPI/login';
import { UserLogin } from '@/interfaces/userLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useContext, useEffect } from 'react';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
import { UserLoginContext } from '../../app/[lng]/layout';
import AlertBox from '../alertBox/alertBox';
import RenderPasswordField from '../formLayouts/RenderPasswordField';
import CircularProgress from '@mui/material/CircularProgress';
import { KeyPrefix, TFunction } from 'i18next';

interface loginFormProps {
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

const initialValues = {
  email: '',
  password: '',
};

const LoginForm: React.FC<loginFormProps> = ({ t }) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);

  const alertCloseHandler = () => {
    setAlertMessages([]);
  };
  const router = useRouter();
  const { setIsUserLogin, langugeRoute } = useContext(UserLoginContext);

  const searchParams = useSearchParams();
  const [googleAuthToken, setGoogleAuthToken] = useState<null | string>(
    searchParams.get('googletoken'),
  );
  const [facebookAuthToken, setFacebookAuthToken] = useState<null | string>(
    searchParams.get('facebooktoken'),
  );

  const [isLoding, setIsLoding] = useState<boolean>(false);

  const handleSocialAuthLogin = async (
    token: string,
    socialAuthAPI: Function,
    setAuthToken: React.Dispatch<React.SetStateAction<null | string>>,
  ) => {
    setDisabled(true);
    const { data } = await socialAuthAPI(token);

    if (data.success) {
      loginLocalStorageHelper.setItem(data.data);
      setIsUserLogin(true);
      setAuthToken(null);
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);
      setDisabled(false);
      setIsLoding(false);
      router.push(`${langugeRoute}/dashboard`);
    } else {
      setAuthToken(null);
      setIsLoding(false);
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (googleAuthToken) {
      setIsLoding(true);
      handleSocialAuthLogin(
        googleAuthToken,
        googleAuthLogin,
        setGoogleAuthToken,
      );
    }

    if (facebookAuthToken) {
      setIsLoding(true);
      handleSocialAuthLogin(
        facebookAuthToken,
        facebookAuthLogin,
        setFacebookAuthToken,
      );
    }
  }, []);

  // TODO: Need to fix this issue.
  // useEffect(() => {
  //   const data = loginLocalStorageHelper.getUserDetails();
  //   if (data) {
  //     router.push('/dashboard/my-profile');
  //   }
  // }, [router,]);
  const handleLoginForm = async (formValues: UserLogin) => {
    const { data } = await loginUser(formValues);
    setDisabled(true);
    if (data.success) {
      setIsUserLogin(true);
      loginLocalStorageHelper.setItem(data.data);
      loginLocalStorageHelper.setPlan(data.data.userPlan);
      router.push(`${langugeRoute}/dashboard`);
    }
    setAlertMessages([
      ...alertMessages,
      { type: data.success, message: data.message },
    ]);
    setTimeout(() => {
      setAlertMessages([]);
    }, 3000);
    setDisabled(false);
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: loginFormSchema(t),
    onSubmit: async (values: UserLogin) => {
      await handleLoginForm(values);
    },
  });

  return (
    <>
      {isLoding ? (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          height="100vh">
          <Box>
            <CircularProgress size={200} />
          </Box>
        </Grid>
      ) : (
        <AuthLayout title={t('loginForm.login')} t={t}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container>
              <Grid item xs={12}>
                <FieldLayout
                  label={t('loginForm.emailAddress')}
                  error={errors.email}
                  showError={touched.email}>
                  <TextField
                    size="small"
                    placeholder={t('loginForm.enterEmailAddress') as string}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </FieldLayout>
                <FieldLayout
                  label={t('loginForm.password')}
                  error={errors.password}
                  showError={touched.password}>
                  <RenderPasswordField
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    size="small"
                    placeholder="*********"
                  />
                </FieldLayout>
                <Box display="flex" justifyContent="flex-end">
                  <Typography
                    variant="caption"
                    color="#FFF"
                    sx={{ cursor: 'pointer' }}
                    onClick={() =>
                      router.push(`${langugeRoute}/forget-password`)
                    }>
                    {t('loginForm.forgotPassword')}
                  </Typography>
                </Box>

                <AlertBox
                  alertMessages={alertMessages}
                  handleAlertClose={alertCloseHandler}></AlertBox>
                <Box marginTop="3rem" marginBottom="2rem">
                  <Button type="submit" disabled={disabled} fullWidth>
                    {t('loginForm.button')}
                  </Button>
                </Box>
                <Typography textAlign="center">
                  {t('loginForm.account')}
                  <Typography
                    color="#FFF"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => router.push(`${langugeRoute}/signup`)}>
                    {t('loginForm.registerHere')}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AuthLayout>
      )}
    </>
  );
};

export default LoginForm;
