'use client';

import { Grid, Box, Typography, Avatar } from '@mui/material';
import React, { MutableRefObject, useState, useEffect, useContext } from 'react';
import UserForm from './UserForm';
import Image from 'next/image';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
import { ProfileFormProps } from '@/interfaces/userModules/userprofile';
import Breadcrumb from '@/components/breadcrumbs/breadcrumbs';
import { UserLoginContext } from '@/app/[lng]/layout';

const ProfileForm: React.FC<ProfileFormProps> = ({
  t,
  id,
  add = false,
  edit = false,
}) => {
  const { langugeRoute } = useContext(UserLoginContext);
  const [profilePicture, setProfilePicture] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const inputFileRef = React.useRef() as MutableRefObject<HTMLInputElement>;

  const onFileChangeCapture = (e: any) => {
    setProfilePicture(e.target.files[0]);
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleClick = () => {
    inputFileRef.current.click();
  };

  useEffect(() => {
    const userDetails = loginLocalStorageHelper.getUserDetails();
    if (userDetails?.imagePath && !id && add !== true) {
      setAvatarPreview(
        `${process.env.NEXT_PUBLIC_S3_IMAGE_BASE_URL}${userDetails.imagePath}`,
      );
    }
  }, []);

  return (
    <Box paddingBottom={'42px'}>
      {!edit ? (
        <Breadcrumb
          title={
            add
              ? (t('user.title.addProfile') as string)
              : id
                ? (t('user.title.editProfile') as string)
                : (t('user.title.myProfile') as string)
          }
          data={[
            add
              ? { title: t('user.dataTitle.user'), link: `${langugeRoute}/admin/user` }
              : id
                ? { title: t('user.dataTitle.user'), link: `${langugeRoute}/admin/user` }
                : {
                  title: t('user.dataTitle.dashboard.myProfile'),
                  link: `${langugeRoute}/admin/user`,
                },
          ]}
        />
      ) : null}
      {add || id || edit ? (
        <Box
          paddingTop={edit ? '0' : '50px'}
          paddingBottom={edit ? '30px' : '40px'}>
          <Grid item md={6} alignContent="center">
            <Typography
              variant={edit ? 'h6' : 'h4'}
              sx={{
                textAlign: edit ? 'left' : 'center',
                fontWeight: 600,
                lineHeight: '41px',
                fontStyle: 'normal',
                wordSpacing: 1,
              }}>
              {add
                ? t('my_profile.addUser')
                : id
                  ? t('my_profile.userProfile')
                  : t('my_profile.edit')}
            </Typography>
          </Grid>
        </Box>
      ) : (
        <Box paddingTop="30px" paddingBottom="110px">
          <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            rowSpacing={10}>
            <Grid item md={6} alignContent="center">
              <Typography
                variant="h4"
                sx={{
                  textAlign: 'center',
                  fontWeight: 600,
                  lineHeight: '41px',
                  fontStyle: 'normal',
                  wordSpacing: 1,
                }}>
                {t('my_profile.title')}
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              alignContent="center"
              sx={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}>
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="profile image"
                  style={{
                    height: '135px',
                    width: '135px',
                    borderRadius: '70px',
                  }}
                  onClick={handleClick}
                />
              ) : (
                <Avatar
                  sx={{ height: '125px', width: '125px' }}
                  onClick={handleClick}></Avatar>
              )}
              <input
                hidden
                type="file"
                name="file"
                ref={inputFileRef}
                onChangeCapture={onFileChangeCapture}
                accept="image/*"
              />
              {!avatarPreview && (
                <Image
                  height="15"
                  width="15"
                  src="/add_a_photo_myprofile.png"
                  style={{
                    position: 'relative',
                    // bottom: '44px',
                    // left: '53px',
                    right: '1.5rem',
                    top: '6rem',
                  }}
                  alt="profile_pic"></Image>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
      <UserForm
        profilePicture={profilePicture}
        t={t}
        id={id}
        add={add}
        setAvatarPreview={setAvatarPreview}
        edit={edit}
      />
    </Box>
  );
};

export default ProfileForm;
