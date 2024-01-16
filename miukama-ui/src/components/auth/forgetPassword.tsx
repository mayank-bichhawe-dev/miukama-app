'use client';
import React, { useContext } from 'react';
import FieldLayout from '@/components/formLayouts/FieldLayout';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { forgotPassSchemas } from '../../validationSchemas/userModules/ForgotPassSchemas';
import { useFormik } from 'formik';
import { forgotPassword } from '@/api/userAPI/forgotApi';
import { useRouter } from 'next/navigation';
import AlertBox from '../alertBox/alertBox';
import { useState } from 'react';
import { KeyPrefix, TFunction } from 'i18next';
import { UserLoginContext } from '@/app/[lng]/layout';

const initialValues = {
  email: '',
};

interface ForgetPasswordProps {
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  preferredLng: string;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ t }) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);

  const alertCloseHandler = () => {
    setAlertMessages([]);
  };
  const { values, errors, handleChange, handleReset, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: forgotPassSchemas(t),
      onSubmit: async (values) => {
        const { data } = await forgotPassword(values);
        setAlertMessages([
          ...alertMessages,
          { type: data.success, message: data.message },
        ]);
        if (data.success) {
          handleReset(initialValues);
          router.push(`${langugeRoute}/forget-password/redirect-mail`);
        }
      },
    });
  return (
    <Grid
      container
      sx={{
        my: '2rem',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Grid item xs={12} sm={8} md={6} sx={{ padding: '3rem' }}>
        <Box display="flex" justifyContent="center">
          <Typography
            noWrap
            component="a"
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
        <Box mt="4rem">
          <Typography
            variant="h5"
            sx={{ textTransform: 'uppercase' }}
            gutterBottom>
            {t('forget_password.title')}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            {t('forget_password.instruction')}
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            my: '2.5rem',
          }}>
          <FieldLayout
            label={t('forget_password.email')}
            error={errors.email}
            showError={touched.email}>
            <TextField
              size="small"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder={t('forget_password.enter_email') as string}
            />
          </FieldLayout>
          <Box paddingY="1.25rem">
            <AlertBox
              alertMessages={alertMessages}
              handleAlertClose={alertCloseHandler}></AlertBox>
          </Box>
          <Button
            type="submit"
            fullWidth
            sx={{ border: '1px solid', my: '1rem' }}>
            {t('forget_password.send_link')}
          </Button>

          <Typography
            textAlign="center"
            my="1.25rem"
            gutterBottom
            onClick={() => router.push(`${langugeRoute}/login`)}
            sx={{ cursor: 'pointer' }}>
            <ArrowBackIosNewSharpIcon
              sx={{ display: 'inline', verticalAlign: 'middle' }}
            />
            {t('forget_password.back_to_login')}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
