import {
  handleDisableTextField,
  handleDisableTextFieldMessage,
} from '@/utils/textFieldDisable';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import AlertBox from '../alertBox/alertBox';
import FieldLayout from '../formLayouts/FieldLayout';
import { changeUserPassword } from '@/api/userAPI/updateUserPassword';
import { UserLoginContext } from '@/app/[lng]/layout';
import { UpdatePasswordInterface } from '@/interfaces/updatePasswordInterface';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
import { UpdatePasswordSchemas } from '@/validationSchemas/userModules/UpdatePassSchemas';
import { useFormik } from 'formik';
import authProviders from '@/utils/authProvider';
import { useRouter } from 'next/navigation';
import { KeyPrefix, TFunction } from 'i18next';

const initialValues: UpdatePasswordInterface = {
  oldPassword: '',
  password: '',
  confirmPassword: '',
};
function ChangePasswordDialog({
  t,
}: {
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}) {
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);

  const { userData, setUserData, langugeRoute } = useContext(UserLoginContext);
  const router = useRouter();

  const alertCloseHandler = () => {
    setAlertMessages([]);
  };

  const handleChangePassword = async (value: UpdatePasswordInterface) => {
    const { data } = await changeUserPassword(value);
    setAlertMessages([
      ...alertMessages,
      { type: data.success, message: data.message },
    ]);
    if (data.success) {
      handleReset(initialValues);
    }
    setTimeout(() => {
      setAlertMessages([]);
    }, 3000);
  };

  useEffect(() => {
    const data = loginLocalStorageHelper.getUserDetails();
    if (data) {
      setUserData({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contact: data.contact,
        address: data.address,
        authProvider: data.authProvider,
      });
    }
  }, []);

  const { values, errors, handleChange, handleReset, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: UpdatePasswordSchemas(t),
      onSubmit: async (values: UpdatePasswordInterface) => {
        await handleChangePassword(values);
      },
    });

  return (
    <Fragment>
      {userData.authProvider === authProviders.local ? (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" sx={{ paddingBottom: '1.875rem' }}>
            {t('setting.changePassword.changePassword')}
          </Typography>
          <FieldLayout
            label={t('setting.changePassword.currentPassword')}
            error={errors.oldPassword}
            showError={touched.oldPassword}>
            <TextField
              type="password"
              placeholder={
                t('setting.changePassword.enterCurrentPassword') as string
              }
              name="oldPassword"
              value={values.oldPassword}
              onChange={handleChange}
              disabled={handleDisableTextField(userData.authProvider)}
              helperText={handleDisableTextFieldMessage(userData.authProvider)}
            />
          </FieldLayout>
          <FieldLayout
            label={t('setting.changePassword.newPassword')}
            error={errors.password}
            showError={touched.password}>
            <TextField
              type="password"
              placeholder={
                t('setting.changePassword.enterNewPassword') as string
              }
              name="password"
              value={values.password}
              onChange={handleChange}
              disabled={handleDisableTextField(userData.authProvider)}
              helperText={handleDisableTextFieldMessage(userData.authProvider)}
            />
          </FieldLayout>
          <FieldLayout
            label={t('setting.changePassword.confirmNewPassword')}
            error={errors.confirmPassword}
            showError={touched.confirmPassword}>
            <TextField
              type="password"
              placeholder={
                t('setting.changePassword.confirmNewPasswords') as string
              }
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              disabled={handleDisableTextField(userData.authProvider)}
              helperText={handleDisableTextFieldMessage(userData.authProvider)}
            />
          </FieldLayout>
          <Box paddingY="1.25rem">
            <AlertBox
              alertMessages={alertMessages}
              handleAlertClose={alertCloseHandler}></AlertBox>
          </Box>
          <Box
            display={{ xs: 'block', md: 'flex', sm: 'flex' }}
            justifyContent="end"
            columnGap={5}>
            <Button
              onClick={() => router.push(`${langugeRoute}/dashboard`)}
              size="medium"
              sx={{ textTransform: 'none' }}
              color="warning">
              {t('setting.changePassword.button.cancel')}
            </Button>
            <Button
              type="submit"
              size="medium"
              sx={{ textTransform: 'none' }}
              disabled={handleDisableTextField(userData.authProvider)}
              color="success">
              {t('setting.changePassword.button.save')}
            </Button>
          </Box>
        </Box>
      ) : (
        userData.authProvider && (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            item
            xs={6}
            md={6}>
            <Box
              sx={{
                border: '2px solid red',
                padding: '20px',
                textAlign: 'center',
              }}>
              <Typography variant="h6" color="red">
                You can not change password as you logged in through{' '}
                {userData.authProvider?.charAt(0).toUpperCase() +
                  userData.authProvider?.slice(1)}
                .
              </Typography>
            </Box>
          </Grid>
        )
      )}
    </Fragment>
  );
}

export default ChangePasswordDialog;
