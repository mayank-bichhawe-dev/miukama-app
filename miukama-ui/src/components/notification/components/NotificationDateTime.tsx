import { Typography } from '@mui/material';
import todayPng from '../../../../public/static/today.png';
import alarmPng from '../../../../public/static/alarm.png';
import Image from 'next/image';
import { INotificationModel } from '../../../interfaces/Notification';
import { format } from 'date-fns';

interface NotificationDateTimeProps {
  value: INotificationModel;
}

export const NotificationDateTime = ({ value }: NotificationDateTimeProps) => {
  return (
    <>
      <Image src={todayPng} width={16} height={16} alt="date" />
      <Typography
        variant="body2"
        sx={{
          fontWeight: '400',
          lineHeight: '20px',
        }}>
        {format(
          new Date(value.updatedAt),
          process.env.NEXT_PUBLIC_NOTIFICATION_DATE || 'EEEE, LLLL d, yyyy',
        )}
      </Typography>
      <Image src={alarmPng} width={16} height={16} alt="time" />
      <Typography
        variant="body2"
        sx={{
          fontWeight: '400',
          lineHeight: '20px',
        }}>
        {format(
          new Date(value.updatedAt),
          process.env.NEXT_PUBLIC_NOTIFICATION_TIME || 'hh:mm a',
        )}
      </Typography>
    </>
  );
};
