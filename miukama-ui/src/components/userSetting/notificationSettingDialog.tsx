import { notificationItemProps } from '@/interfaces/userSetting';
import { Box, Button, Grid, Switch, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { KeyPrefix, TFunction } from 'i18next';
import { UserLoginContext } from '@/app/[lng]/layout';

function NotificationSettingDialog({
  notificationItems,
  handleChange,
  t,
}: {
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  notificationItems: notificationItemProps[];
  // eslint-disable-next-line no-unused-vars
  handleChange: (
    // eslint-disable-next-line no-unused-vars
    event: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line no-unused-vars
    id: number,
  ) => void;
}) {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  return (
    <Box component="form" display="flex" flexDirection="column" rowGap={3}>
      <Typography variant="h6">
        {t('setting.notifications.notifications')}
      </Typography>
      {notificationItems.map((val: notificationItemProps) => (
        <Grid
          key={val.id}
          container
          padding="1.25rem"
          justifyContent="space-between"
          sx={{ background: 'rgba(255, 255, 255, 0.20)' }}>
          <Grid item xs={8} md={10}>
            <Typography
              variant="body2"
              sx={{ paddingBottom: '.6rem', fontWeight: 500 }}>
              {val.heading}
            </Typography>
            <Typography fontWeight={400} variant="caption">
              {val.detail}
            </Typography>
          </Grid>
          <Grid item md={2} sx={{ padding: '8px' }}>
            <Switch
              checked={val.checked}
              onChange={(e) => handleChange(e, val.id)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>
        </Grid>
      ))}
      <Box
        display={{ xs: 'block', md: 'flex', sm: 'flex' }}
        justifyContent="end"
        columnGap={5}>
        <Button
          size="medium"
          sx={{ textTransform: 'none' }}
          onClick={() => router.push(`${langugeRoute}/dashboard`)}
          color="warning">
          {t('setting.changePassword.button.cancel')}
        </Button>
        <Button
          type="submit"
          size="medium"
          sx={{ textTransform: 'none' }}
          color="success">
          {t('setting.changePassword.button.save')}
        </Button>
      </Box>
    </Box>
  );
}

export default NotificationSettingDialog;
