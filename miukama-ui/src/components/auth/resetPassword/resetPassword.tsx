'use client';

import FieldLayout from '@/components/formLayouts/FieldLayout';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { ResetPassSchemas } from '@/validationSchemas/userModules/ResetPassSchemas';
import { resetUserPassword } from '@/api/userAPI/resetPassword';
import { resetPasswordInterface } from '@/interfaces/resetPasswordInterface';
import AlertBox from '@/components/alertBox/alertBox';
import RenderPasswordField from '@/components/formLayouts/RenderPasswordField';
import { KeyPrefix, TFunction } from 'i18next';
import { useRouter } from 'next/navigation';
import { UserLoginContext } from '@/app/[lng]/layout';

const initialValues: resetPasswordInterface = {
  password: '',
  confirmPassword: '',
};

const ResetPassword = ({
  token,
  t,
}: {
  token: string;
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);

  const alertCloseHandler = () => {
    setAlertMessages([]);
  };
  const handleChangePassword = async (value: resetPasswordInterface) => {
    const { data } = await resetUserPassword(value, token);
    if (data.success) {
      handleReset(initialValues);
    }
    setAlertMessages([
      ...alertMessages,
      { type: data.success, message: data.message },
    ]);
  };

  const { values, errors, handleChange, handleReset, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ResetPassSchemas(t),
      onSubmit: async (values: resetPasswordInterface) => {
        handleChangePassword(values);
      },
    });
  return (
    <Box paddingY="6rem">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} sx={{ padding: '3rem' }}>
          <Box paddingTop="3rem">
            <Box display="flex" justifyContent="center">
              <Typography
                noWrap
                onClick={() => router.push(`${langugeRoute}/`)}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 900,
                  fontSize: '2.25rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}>
                LOGO
                <Typography
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 900,
                    fontSize: '2.25rem',
                    color: '#B20000',
                    ml: '.3rem',
                    mr: '1rem',
                  }}>
                  DESIGN
                </Typography>
              </Typography>
            </Box>
            <Box
              mt="4rem"
              display="flex"
              justifyContent="center"
              alignItems="left"
              flexDirection="column">
              <Typography
                variant="h5"
                sx={{ textTransform: 'uppercase' }}
                gutterBottom>
                {t('resetPassword.createNewPassword')}
                {'🔒'}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                {t('resetPassword.subtitle1')}
              </Typography>
            </Box>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            marginTop="2.5rem"
            noValidate>
            <FieldLayout
              label={t('resetPassword.newPassword')}
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
              label={t('resetPassword.confirmNewPassword')}
              error={errors.confirmPassword}
              showError={touched.confirmPassword}>
              <RenderPasswordField
                value={values.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                size="small"
                placeholder="**********"
              />
            </FieldLayout>
            <Box sx={{ my: '1.25rem' }}>
              <AlertBox
                alertMessages={alertMessages}
                handleAlertClose={alertCloseHandler}></AlertBox>
            </Box>
            <Box>
              <Button type="submit" fullWidth sx={{ border: '1px solid' }}>
                {t('resetPassword.button')}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPassword;
