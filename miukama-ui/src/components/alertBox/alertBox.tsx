'use client';
import { Alert } from '@mui/material';

function AlertBox({
  alertMessages,
  handleAlertClose,
}: {
  alertMessages: {
    type: 'success' | 'error';
    message: string;
  }[];
  // eslint-disable-next-line no-unused-vars
  handleAlertClose: (value: any) => void;
}) {
  return (
    <div>
      {alertMessages &&
        alertMessages.map(({ type, message }, index) => {
          return (
            <Alert
              key={index}
              onClose={() => {
                handleAlertClose([]);
              }}
              severity={type ? 'success' : 'error'}>
              {message}
            </Alert>
          );
        })}
    </div>
  );
}

export default AlertBox;
