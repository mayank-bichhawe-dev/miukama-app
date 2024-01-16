// import { AlertColor } from '@mui/material';

export interface ToggleViewProps {
  view: 'list' | 'column';
  visibility: 'public' | 'private';
}
export interface AlertProvideProps {
  message: string;
  severity: string;
}

export interface ShowAlertProps {
  // eslint-disable-next-line no-unused-vars
  showAlert: (message: string, severity: string) => void;
}
