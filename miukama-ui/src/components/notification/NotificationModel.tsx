import { Delete, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { Notification } from '../notification/Notification';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { UserLoginContext } from '@/app/[lng]/layout';
import {
  deleteNotification,
  deleteNotifications,
  getAllNotifications,
  markAllAsRead,
  markNotificationAsRead,
} from '@/api/notificationApi/notification';
import {
  INotificationModel,
  INotificationModelProps,
} from '@/interfaces/Notification';
import { useRouter } from 'next/navigation';

export const NotificationModel = ({
  notificationCounts = 0,
  fullPage = false,
  getNotificationCount,
}: INotificationModelProps) => {
  const router = useRouter();
  const [dropdownNotification, setDropdownNotification] =
    useState<string>('All');
  const [allNotifications, setAllNotifications] = useState<
    INotificationModel[]
  >([]);

  const { showAlert, langugeRoute } = useContext(UserLoginContext);
  const refreshAndGetAllNotifications = () => {
    getNotificationCount && getNotificationCount();
    getAllNotificationsData();
  };

  const markAllRead = async () => {
    if (
      allNotifications.length > 0 &&
      !allNotifications.every((value) => value.read === true)
    ) {
      const response = await markAllAsRead();
      if (response.data.success) {
        refreshAndGetAllNotifications();
      }
      showAlert('readAll', 'success');
    } else {
      showAlert('noDataRead', 'warning');
    }
  };
  const deleteAllNotifications = async () => {
    if (allNotifications.length > 0) {
      const response = await deleteNotifications();
      if (response.data.success) {
        refreshAndGetAllNotifications();
        getNotificationCount && getNotificationCount();
        showAlert('deleteAll', 'success');
      }
    } else {
      showAlert('noDataDelete', 'warning');
    }
  };

  const getAllNotificationsData = async () => {
    const response = await getAllNotifications();
    if (response.data.success) {
      setAllNotifications(response.data.data);
    } else {
      setAllNotifications([]);
      showAlert('serverError', 'error');
    }
  };

  const deleteItem = async (id: number) => {
    const response = await deleteNotification(id);
    if (response.data.success) {
      const data = allNotifications.filter((data) => id !== data.id);
      setAllNotifications([...data]);
      getNotificationCount && getNotificationCount();
    } else {
      setAllNotifications([]);
    }
    showAlert('delete', 'success');
  };

  const markAsRead = async (id: number, read: boolean) => {
    const response = await markNotificationAsRead(id);
    if (response.data.success) {
      getAllNotificationsData();
      getNotificationCount && getNotificationCount();
    }
    showAlert(read ? 'unread' : 'read', 'success');
  };

  useEffect(() => {
    getAllNotificationsData();
  }, [notificationCounts]);

  return (
    <Box sx={{ p: 3, backgroundColor: ' #4E4D4D', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          direction: 'row',
          justifyContent: 'space-between',
          padding: '25px 0px',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: '700', lineHeight: '20px' }}>
            Notifications
          </Typography>
          <FormControl size="small">
            <Select
              sx={{
                height: '20px',
                backgroundColor: ' #4E4D4D',
                pr: '1rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderStyle: 'none',
                },
                '& .MuiSelect-select': {
                  padding: '15px !important',
                },
              }}
              IconComponent={KeyboardArrowDown}
              value={dropdownNotification}
              onChange={(event) => setDropdownNotification(event.target.value)}>
              <MenuItem
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '20px',
                }}
                value={'All'}>
                All
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '20px',
                }}
                value={'Read'}>
                Read
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '20px',
                }}
                value={'Unread'}>
                Unread
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: 'flex',
            ml: 3,
            alignItems: 'center',
            cursor: 'pointer',
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Delete sx={{ size: 'small', padding: '2px' }} />
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
                paddingRight: '1rem',
                fontWeight: '400',
                lineHeight: 'normal',
                textUnderlineOffset: '8px',
              }}
              component="a"
              onClick={() => {
                deleteAllNotifications();
              }}>
              Delete All
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutlineIcon sx={{ size: 'small', p: '2px' }} />
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'underline',
                cursor: ' pointer',
                fontWeight: '400',
                lineHeight: 'normal',
                textUnderlineOffset: '8px',
              }}
              component="a"
              onClick={() => {
                markAllRead();
              }}>
              Read All
            </Typography>
          </Box>
        </Box>
      </Box>
      <Notification
        allNotifications={allNotifications.filter(({ read }) =>
          dropdownNotification === 'All'
            ? true
            : dropdownNotification === 'Read'
              ? !!read
              : !read,
        )}
        deleteItem={deleteItem}
        markAsRead={markAsRead}
        fullPage={fullPage}
      />

      {fullPage === false && (
        <Box textAlign="end">
          <Typography
            variant="body2"
            sx={{
              textDecoration: 'underline',
              color: '#B20000',
              fontWeight: '500',
              lineHeight: '20px',
              cursor: 'pointer',
            }}
            onClick={() => router.push(`${langugeRoute}/dashboard/notifications`)}>
            Show All
          </Typography>
        </Box>
      )}
    </Box>
  );
};
