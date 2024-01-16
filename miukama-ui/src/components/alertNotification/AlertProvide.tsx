import { messages } from '@/common/popOverHelper';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AlertProvideProps } from '@/interfaces/AlertInterface';

const AlertProvide: React.FC<AlertProvideProps> = ({ message, severity }) => {
  const showToast = () => {
    const notificationMessage: string = messages[message];
    if (notificationMessage) {
      switch (severity) {
        case 'success':
          toast.success(notificationMessage);
          break;
        case 'error':
          toast.error(notificationMessage);
          break;
        case 'warning':
          toast.error(notificationMessage);
          break;
        default:
          break;
      }
    }
  };
  React.useEffect(() => {
    showToast();
  }, [message, severity]);

  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: '',
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 4000,
        },
      }}
    />
  );
};

export default AlertProvide;
