import * as React from 'react';

import Breadcrumb from '@/components/breadcrumbs/breadcrumbs';

import { NotificationModel } from './NotificationModel';
import { Box, CircularProgress, Grid } from '@mui/material';
import { UserLoginContext } from '@/app/[lng]/layout';
import { fetchNotificationCount } from '@/api/notificationApi/notification';
import { useEffect, useState } from 'react';

const NotificationPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { notificationCounts, setNotificationCounts, langugeRoute } =
    React.useContext(UserLoginContext);

  const getNotificationCount = async () => {
    const response = await fetchNotificationCount();
    if (response.data.success) {
      setNotificationCounts(response.data.data);
    } else {
      setNotificationCounts(0);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getNotificationCount();
  }, []);

  return (
    <>
      <Breadcrumb
        title="Notifications"
        data={[{ title: 'Dashboard', link: `${langugeRoute}/dashboard/` }]}
      />
      <Grid container sx={{ marginTop: '30px' }}>
        {isLoading ? (
          <Box width="100%">
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          </Box>
        ) : (
          <NotificationModel
            fullPage={true}
            notificationCounts={notificationCounts}
            getNotificationCount={getNotificationCount}
          />
        )}
      </Grid>
    </>
  );
};
export default NotificationPage;
