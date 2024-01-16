import { Box, Typography, IconButton } from '@mui/material';
import groupPng from '../../../public/static/Group.png';
import Image from 'next/image';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import { Delete } from '@mui/icons-material';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import { INotificationComponentProps } from '../../interfaces/Notification';
import { NotificationDateTime } from './components/NotificationDateTime';

export const Notification = ({
  allNotifications,
  deleteItem,
  markAsRead,
  fullPage = false,
}: INotificationComponentProps) => {
  return (
    <>
      {allNotifications.map((value) => (
        <Box
          sx={{
            p: 2,
            overflow: 'hidden',
            color: '#FFF',
            backgroundColor: '#2B2929',
            columnGap: '10px',
            display: 'flex',
            marginBottom: '15px',
            '&:hover': {
              backgroundColor: '#B20000',
            },
            '&:hover .MuiTypography-root': {
              color: '#FFF',
            },
          }}
          key={value.id}>
          <Image
            src={groupPng}
            width={22}
            height={20}
            alt=" image"
            style={{
              paddingRight: '8px',
            }}
          />
          <Box width="100%" pr="30px" sx={{ position: 'relative' }}>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                marginBottom: '10px',
              }}
              width={fullPage ? 'calc(100% - 275px)' : '100%'}>
              <Typography
                variant="body2"
                color="#B20000"
                sx={{
                  paddingRight: '5px',
                  fontWeight: '500',
                  lineHeight: '20px',
                }}>
                {value.title}
              </Typography>
              <Typography
                variant="body2"
                className={!fullPage ? 'fullpage-description' : ''}
                sx={{
                  fontWeight: '500',
                  lineHeight: '20px',
                  color: '#FFFFFF',
                  wordBreak: 'break-all',
                }}>
                {value.description}
              </Typography>
              {fullPage && (
                <Box
                  sx={{
                    display: 'flex',
                    columnGap: '5px',
                    minWidth: '275px',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '30px',
                  }}>
                  <NotificationDateTime value={value} />
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                marginBottom: '10px',
              }}
              width={'100%'}>
              <Typography
                variant="body2"
                color="#B20000"
                sx={{
                  paddingRight: '5px',
                  fontWeight: '500',
                  lineHeight: '20px',
                }}>
                {value.title}
              </Typography>
              <Typography
                variant="body2"
                className={!fullPage ? 'fullpage-description' : ''}
                sx={{
                  fontWeight: '500',
                  lineHeight: '20px',
                  color: '#FFFFFF',
                  wordBreak: 'break-all',
                }}>
                {value.description}
              </Typography>
            </Box>
            {fullPage && (
              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                }}>
                <NotificationDateTime value={value} />
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                columnGap: '5px',
                alignItems: 'center',
              }}>
              {!fullPage && <NotificationDateTime value={value} />}
              <Box
                sx={{
                  ml: 'auto',
                  minWidth: '60px',
                }}>
                <IconButton
                  sx={{ p: 0, fontSize: '16px' }}
                  onClick={() => deleteItem(value.id)}>
                  <Delete sx={{ size: 'small', padding: '2px' }} />
                </IconButton>
                <IconButton
                  sx={{ p: 0, fontSize: '16px' }}
                  onClick={() => markAsRead(value.id, value.read)}>
                  {value.read ? (
                    <DraftsOutlinedIcon
                      sx={{ size: 'small', padding: '2px' }}
                    />
                  ) : (
                    <MailOutlineSharpIcon
                      sx={{ size: 'small', padding: '2px' }}
                    />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
