'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Notifications } from '@mui/icons-material';
import { KeyPrefix, TFunction } from 'i18next';

function userSettingNavigation({
  userSettingMenu = 'changePassword',
  setuserSettingMenu,
  t,
}: {
  userSettingMenu: string;
  setuserSettingMenu: Dispatch<SetStateAction<string>>;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}) {
  return (
    <Box display="flex" width="230px" flexDirection="column" rowGap={4}>
      <Box display="flex" sx={{ paddingBottom: '1.313rem' }}>
        <EditIcon />
        <Box
          display="flex"
          justifyContent="start"
          onClick={() => setuserSettingMenu('editProfile')}
          sx={{
            width: '10.75rem',
            paddingBottom: '1.313rem',
            ml: '.84rem',
            borderBottom: '1px solid #FFFFFF',
            cursor: 'pointer',
          }}>
          <Typography
            sx={{
              pr: '1.9rem',
              color: userSettingMenu === 'editProfile' ? '' : 'gray',
            }}>
            {t('setting.editProfile')}
          </Typography>
          <ChevronRightIcon />
        </Box>
      </Box>

      <Box
        onClick={() => setuserSettingMenu('changePassword')}
        display="flex"
        sx={{ paddingBottom: '1.313rem', cursor: 'pointer' }}>
        <VerifiedUserIcon />
        <Box
          display="flex"
          justifyContent="start"
          sx={{
            width: '10.75rem',
            paddingBottom: '1.313rem',
            ml: '.84rem',
            borderBottom: '1px solid #FFFFFF;',
            cursor: 'pointer',
          }}>
          <Typography
            sx={{ color: userSettingMenu === 'changePassword' ? '' : 'gray' }}>
            {' '}
            {t('setting.changePassword.changePassword')}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" sx={{ paddingBottom: '1.313rem' }}>
        <Notifications />
        <Box
          onClick={() => setuserSettingMenu('notification')}
          // onClick={()=>handleSetting(userSettingMenu.notification)}
          display="flex"
          justifyContent="start"
          sx={{
            width: '10.75rem',
            paddingBottom: '1.313rem',
            ml: '.84rem',
            borderBottom: '1px solid #FFFFFF;',
            cursor: 'pointer',
          }}>
          <Typography
            sx={{ color: userSettingMenu === 'notification' ? '' : 'gray' }}>
            {' '}
            {t('setting.notifications.notifications')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default userSettingNavigation;
