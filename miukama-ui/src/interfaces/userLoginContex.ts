import { ShowAlertProps, ToggleViewProps } from './AlertInterface';
import { UserProfile } from './userModules/userprofile';

export interface UserLoginContextValue extends ShowAlertProps {
  isUserLogin?: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsUserLogin: (user: boolean) => void;
  userData: UserProfile;
  // eslint-disable-next-line no-unused-vars
  setUserData: (value: UserProfile) => void;
  toggleView: ToggleViewProps;
  // eslint-disable-next-line no-unused-vars
  setToggleView: (value: ToggleViewProps) => void;
  notificationCounts: number;
  // eslint-disable-next-line no-unused-vars
  setNotificationCounts: (value: number) => void;
  loading: boolean;
  userAvatar: string;
  // eslint-disable-next-line no-unused-vars
  setUserAvatar: (value: string) => void;
  alertMessages: { type: 'success' | 'error'; message: string }[];
  // eslint-disable-next-line no-unused-vars
  setAlertMessages: (
    // eslint-disable-next-line no-unused-vars
    value: { type: 'success' | 'error'; message: string }[],
  ) => void;
  langugeRoute: string;
  // eslint-disable-next-line no-unused-vars
  setLangugeRoute: (value: string) => void;
}
