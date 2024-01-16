import React, { useState, useContext, useEffect } from 'react';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Popover from '@mui/material/Popover';
import { useRouter } from 'next/navigation';
import { NotificationModel } from './notification/NotificationModel';
import { UserLoginContext } from '@/app/[lng]/layout';
import { fetchNotificationCount } from '@/api/notificationApi/notification';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
import { KeyPrefix, TFunction } from 'i18next';

interface UserProfileSectionProps {
  handleOpenUserMenu: React.MouseEventHandler<HTMLButtonElement>;
  handleUserLogout: () => void;
  handleCloseUserMenu: () => void;
  userDetails: any;
  anchorElUser: null | HTMLElement;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

const s3ImageBaseUrl = process.env.NEXT_PUBLIC_S3_IMAGE_BASE_URL;

const UserProfileSection = ({
  t,
  handleOpenUserMenu,
  handleUserLogout,
  handleCloseUserMenu,
  userDetails,
  anchorElUser,
}: UserProfileSectionProps) => {
  const [anchorElNotification, setAnchorElNotification] =
    useState<HTMLButtonElement | null>(null);

  const [profilePicture, setProfilePicture] = useState<string>('');

  const { notificationCounts, setNotificationCounts, userAvatar, langugeRoute } =
    useContext(UserLoginContext);

  const handleClickOpenNotification = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const open = Boolean(anchorElNotification);
  const id = open ? 'simple-popover' : undefined;

  const router = useRouter();
  const onClickItem = (link: string) => {
    router.push(`${langugeRoute}${link}`);
    handleCloseUserMenu();
  };

  const getNotificationCount = async () => {
    const response = await fetchNotificationCount();
    if (response.data.success) {
      setNotificationCounts(response.data.data);
    } else {
      setNotificationCounts(0);
    }
  };

  useEffect(() => {
    getNotificationCount();
    try {
      const userDetails = loginLocalStorageHelper.getUserDetails();
      if (userDetails?.imagePath) {
        setProfilePicture(`${s3ImageBaseUrl}${userDetails.imagePath}`);
      }
    } catch (error) {
      console.log('err --------', error);
    }
  }, [userAvatar]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          gridColumnGap: 24,
          textAlign: 'justify',
        }}>
        <IconButton
          size="large"
          color="inherit"
          aria-describedby={id}
          onClick={handleClickOpenNotification}>
          <Badge
            badgeContent={notificationCounts}
            color="error"
            overlap="circular"
            sx={{
              '& .MuiBadge-badge': {
                top: 10,
              },
            }}>
            <NotificationsIcon fontSize="large" />
          </Badge>
        </IconButton>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Box position="relative">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="user profile"
                style={{ height: '45px', width: '45px', borderRadius: '30px' }}
              />
            ) : (
              <Avatar />
            )}
            <span
              style={{
                padding: '5px',
                background: 'green',
                borderRadius: '50%',
                border: '1.5px solid #FFF',
                position: 'absolute',
                right: 0,
                bottom: '6px',
              }}
            />
          </Box>
        </IconButton>
        <Box display="grid" alignItems="center">
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {userDetails
              ? `${userDetails?.firstName} ${userDetails?.lastName}`
              : ''}
          </Typography>
          <Typography variant="caption">
            {' '}
            {t('headers.logout.graphicDesigner')}
          </Typography>
        </Box>
      </Box>
      <Menu
        sx={{ mt: '10px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        <MenuItem
          onClick={() => onClickItem('/dashboard')}
          sx={{ justifyContent: 'left' }}>
          {t('headers.logout.dashboard')}
        </MenuItem>
        <MenuItem
          onClick={() => onClickItem('/dashboard/my-profile')}
          sx={{ justifyContent: 'left' }}>
          {t('headers.logout.profile')}
        </MenuItem>
        <MenuItem
          onClick={() => onClickItem('/dashboard/settings')}
          sx={{ justifyContent: 'left' }}>
          {t('headers.logout.changePassword')}
        </MenuItem>
        <MenuItem onClick={handleUserLogout} sx={{ justifyContent: 'left' }}>
          {t('headers.logout.logout')}
        </MenuItem>
      </Menu>
      <Popover
        id={id}
        open={open}
        onClose={handleCloseNotification}
        anchorEl={anchorElNotification}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorOrigin={{ horizontal: 85, vertical: 'bottom' }}
        className="user-popover"
        sx={{
          '& .MuiPopover-paper:: webkit-scrollbar': {
            width: '0px',
            background: 'red',
          },
          '& .MuiPaper-root:: webkit-scrollbar': {
            width: 0,
            height: 0,
          },
        }}
        slotProps={{
          paper: {
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              borderRadius: 0,
              backgroundImage: 'none',
              minHeight: '30px',
              maxHeight: '70%',
              width: '500px',
              maxWidth: '50%',
            },
          },
        }}>
        <Box
          sx={{
            position: 'relative',
            mt: '16px',
            '&::before': {
              backgroundColor: '#4E4D4D',
              content: '""',
              display: 'block',
              position: 'absolute',
              width: 12,
              height: 12,
              top: -6,
              transform: 'rotate(45deg)',
              right: '60px',
            },
          }}
        />
        <NotificationModel
          setAnchorElNotification={setAnchorElNotification}
          notificationCounts={notificationCounts}
          getNotificationCount={getNotificationCount}
        />
      </Popover>
    </Box>
  );
};
export default UserProfileSection;
