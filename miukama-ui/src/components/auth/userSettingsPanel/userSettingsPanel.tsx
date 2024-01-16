'use client';

import { Box, Grid } from '@mui/material';
import UserSetting from '@/components/userSetting/userSettingNavigation';
import { useState } from 'react';
import ChangePasswordDialog from '@/components/userSetting/changePasswordDialog';
import React from 'react';
import NotificationSettingDialog from '@/components/userSetting/notificationSettingDialog';
import Breadcrumb from '@/components/breadcrumbs/breadcrumbs';
import { notificationItemProps } from '@/interfaces/userSetting';
import { KeyPrefix, TFunction } from 'i18next';
import ProfileForm from '@/components/userProfileForm/ProfileForm';

interface userSettingsPanelProps {
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

const UserSettingsPanel: React.FC<userSettingsPanelProps> = ({ t }) => {
  const [userSettingMenu, setuserSettingMenu] = useState('editProfile');
  const [notificationItems, setNotificationItem] = useState<
    notificationItemProps[]
  >([
    {
      id: 1,
      heading: t('setting.notifications.orderConfirmation'),
      detail: t('setting.notifications.orderConfirmationMessage'),
      checked: false,
    },
    {
      id: 2,
      heading: t('setting.notifications.orderDelivered'),
      detail: t('setting.notifications.orderDeliveredMessage'),
      checked: true,
    },
    {
      id: 3,
      heading: t('setting.notifications.emailNotification'),
      detail: t('setting.notifications.emailNotificationMessage'),
      checked: false,
    },
  ]);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: any,
  ) => {
    const updatedItems = notificationItems.map((item) =>
      item.id === itemId ? { ...item, checked: event.target.checked } : item,
    );
    setNotificationItem(updatedItems);
  };
  const handleUserSetting = () => {
    switch (userSettingMenu) {
      case 'editProfile':
        return <ProfileForm t={t} edit={true} />;
      case 'changePassword':
        return <ChangePasswordDialog t={t} />;
      case 'notification':
        return (
          <NotificationSettingDialog
            t={t}
            notificationItems={notificationItems}
            handleChange={handleChange}
          />
        );

      default:
        return <ChangePasswordDialog t={t} />;
    }
  };
  return (
    <Box paddingBottom="6.25rem" paddingTop="1.938rem">
      <Breadcrumb
        title={t('setting.settings') as string}
        data={[{ title: t('setting.dashboard'), link: 'dashboard/setting' }]}
      />
      <Grid container columnGap={5} paddingTop="1.938rem">
        <Grid item md={3}>
          <UserSetting
            t={t}
            setuserSettingMenu={setuserSettingMenu}
            userSettingMenu={userSettingMenu}
          />
        </Grid>
        <Grid item xs={6.3} sm={7} md={6.3} marginLeft="1rem">
          {handleUserSetting()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserSettingsPanel;
