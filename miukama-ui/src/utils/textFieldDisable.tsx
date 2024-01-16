import { Typography } from '@mui/material';
import authProviders from './authProvider';
import config from './../../config.json';

export const handleDisableTextField = (authProviderName: string) => {
  if (authProviderName === authProviders.local) {
    return false;
  }
  return true;
};

export const handleDisableTextFieldMessage = (authProviderName: string) => {
  if (authProviderName === authProviders.local) {
    return <Typography variant="caption"></Typography>;
  }
  return (
    <Typography variant="caption" color={config.primary}>
      User signed in through {authProviderName} hence this action can not be
      performed
    </Typography>
  );
};
