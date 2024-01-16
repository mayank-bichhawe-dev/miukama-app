'use client';

import { Box, Grid, TextField, Button } from '@mui/material';
import FieldLayout from '../formLayouts/FieldLayout';
import { useFormik } from 'formik';
import { userFormSchema } from './schemas/UserFormSchemas';
import { useState, useEffect, useContext } from 'react';
import { UserProfile } from '@/interfaces/userModules/userprofile';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
import { updateUserProfile } from '@/api/userAPI/profileUpdate';
import AlertBox from '../alertBox/alertBox';
import { getUserDetail } from '@/api/userAPI/getuser';
import { UserLoginContext } from '@/app/[lng]/layout';
import {
  handleDisableTextField,
  handleDisableTextFieldMessage,
} from '@/utils/textFieldDisable';
import { useRouter } from 'next/navigation';
import { userProps } from '@/interfaces/allUsers';
import { getUserById, updateUser, addUserByAdmin } from '@/api/allUser/user';
import { UserFormProps } from '@/interfaces/userModules/userprofile';
import RenderPasswordField from '../formLayouts/RenderPasswordField';

const initialValues: userProps = {
  firstName: '',
  lastName: '',
  address: '',
  contact: '',
  email: '',
  id: 0,
  userType: '',
  fileSystemId: 0,
  imagePath: '',
  authProvider: 'local',
  confirmPassword: '',
  password: '',
};

function UserForm({
  profilePicture,
  t,
  id,
  add = false,
  setAvatarPreview,
  edit = false,
}: UserFormProps) {
  const router = useRouter();
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  const { setUserAvatar, userData, setUserData, langugeRoute } = useContext(UserLoginContext);
  const [data, setData] = useState<userProps>(initialValues);
  const alertCloseHandler = () => {
    setAlertMessages([]);
  };
  const getUserByIdAsync = async () => {
    if (id) {
      try {
        const { data } = await getUserById(id);
        const rows = data.data;
        setData(rows);
        if (rows.imagePath) {
          setAvatarPreview(
            `${process.env.NEXT_PUBLIC_S3_IMAGE_BASE_URL}${rows.imagePath}`,
          );
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const handleUserProfileUpdate = async (
    values: UserProfile,
    id: number | undefined,
  ) => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('address', values.address);
    formData.append('contact', values.contact);

    if (add !== true) {
      formData.append('id', values.id.toString());
      formData.append('authProvider', values.authProvider);
      formData.append('file', profilePicture);
    }

    if (add === true && typeof values.confirmPassword === 'string' && typeof values.password === 'string') {
      formData.append('password', values.password);
      formData.append('confirmPassword', values.confirmPassword);
    }

    if (add !== true && (id === null || id === undefined)) {
      const { data } = await updateUserProfile(formData);
      if (data.success) {
        const userOldDetails = loginLocalStorageHelper.getUserDetails();
        const setNewToken = {
          user: userOldDetails,
          token: data.data.token,
        };
        loginLocalStorageHelper.setItem(setNewToken);
        const result = await getUserDetail();
        loginLocalStorageHelper.updateUserInLocalStorage(result.data.data);
        setUserData(result.data.data);
        if (result.data.data.imagePath) {
          setUserAvatar(
            `${process.env.NEXT_PUBLIC_S3_IMAGE_BASE_URL}${result.data.data.imagePath}`,
          );
        }
        setAlertMessages([
          ...alertMessages,
          { type: data.success, message: data.message },
        ]);
        setTimeout(() => {
          setAlertMessages([]);
        }, 3000);
      }
    }

    if (id || add === true) {
      const { data } = id ? await updateUser(formData, id) : await addUserByAdmin(formData);

      if (data.success) {
        setData(initialValues);
        setAlertMessages([
          ...alertMessages,
          { type: data.success, message: data.message },
        ]);
        setTimeout(() => {
          setAlertMessages([]);
          router.push(`${langugeRoute}/admin/user`);
        }, 3000);
      }
    }

  };

  useEffect(() => {
    getUserByIdAsync();
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

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: add ? data : id ? data : userData,
    enableReinitialize: true,
    validationSchema: userFormSchema(t),
    onSubmit: async (values: userProps | UserProfile) => {
      await handleUserProfileUpdate(values as userProps, id);
    },
  });

  const handelCancelRoute = () => {
    id || add ? router.push(`${langugeRoute}/admin/user`) : router.push(`${langugeRoute}/dashboard`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container justifyContent="center">
        <Grid item xs={6} md={edit ? 12 : add || id ? 5 : 6}>
          <FieldLayout
            label={t('my_profile.first_name')}
            error={errors.firstName}
            showError={touched.firstName}>
            <TextField
              size="small"
              type="text"
              placeholder={t('my_profile.placeholder_first_name') as string}
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
          </FieldLayout>

          <FieldLayout
            label={t('my_profile.last_name')}
            error={errors.lastName}
            showError={touched.lastName}>
            <TextField
              size="small"
              type="text"
              placeholder={t('my_profile.placeholder_last_name') as string}
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
          </FieldLayout>

          <FieldLayout
            label={t('my_profile.email')}
            error={errors.email}
            showError={touched.email}>
            <TextField
              size="small"
              type="email"
              placeholder={t('my_profile.placeholder_email') as string}
              name="email"
              value={values.email}
              onChange={handleChange}
              disabled={handleDisableTextField(
                add ? 'local' : id ? data.authProvider : userData.authProvider,
              )}
              helperText={handleDisableTextFieldMessage(
                add ? 'local' : id ? data.authProvider : userData.authProvider,
              )}
            />
          </FieldLayout>

          <FieldLayout
            label={t('my_profile.contact_number')}
            error={errors.contact}
            showError={touched.contact}>
            <TextField
              size="small"
              type="text"
              placeholder={t('my_profile.placeholder_contact') as string}
              name="contact"
              value={values.contact}
              onChange={handleChange}
            />
          </FieldLayout>
          <FieldLayout
            label={t('my_profile.address')}
            error={errors.address}
            showError={touched.address}>
            <TextField
              size="small"
              type="text"
              placeholder={t('my_profile.placeholder_address') as string}
              name="address"
              value={values.address}
              onChange={handleChange}
            />
          </FieldLayout>

          {add ? (<> <FieldLayout
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
            </FieldLayout></>) : null}

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
              onClick={() => handelCancelRoute()}
              size="medium"
              sx={{ textTransform: 'none' }}
              color="warning">
              {t('my_profile.cancel')}
            </Button>
            <Button
              type="submit"
              size="medium"
              style={{
                background: '#014F04',
              }}>
              {t('my_profile.save')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserForm;
