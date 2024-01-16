'use client';
import React, { Suspense, useState } from 'react';
import { dir } from 'i18next';
import './globals.css';
import { useTranslation } from '../i18n';
import Header from '@/components/header/header';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createContext, useEffect } from 'react';
import theme from '../../theme';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
import { UserProfile } from '@/interfaces/userModules/userprofile';
import './globals.css';
import AlertProvide from '@/components/alertNotification/AlertProvide';
import {
  ToggleViewProps,
  AlertProvideProps,
} from '@/interfaces/AlertInterface';
import { UserLoginContextValue } from '@/interfaces/userLoginContex';

const userInfoInitialValue = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  address: '',
  authProvider: '',
};

const toggleViewInitialValue: ToggleViewProps = {
  view: 'list',
  visibility: 'public',
};

export const UserLoginContext = createContext<UserLoginContextValue>({
  isUserLogin: false,
  setIsUserLogin: (e) => e,
  userData: userInfoInitialValue,
  setUserData: (e) => e,
  toggleView: toggleViewInitialValue,
  setToggleView: (e) => e,
  loading: true,
  showAlert: (e) => e,
  notificationCounts: 0,
  setNotificationCounts: (e) => e,
  userAvatar: '',
  setUserAvatar: (e) => e,
  alertMessages: [],
  setAlertMessages: (e) => e,
  langugeRoute: '',
  setLangugeRoute: (e) => e,
});

function Providers({
  children,
  preferredLng,
}: {
  children: React.ReactNode;
  preferredLng: string;
}) {
  const [isUserLogin, setIsUserLogin] = React.useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] =
    React.useState<UserProfile>(userInfoInitialValue);
  const [toggleView, setToggleView] = React.useState<ToggleViewProps>(
    toggleViewInitialValue,
  );
  const [alert, setAlert] = React.useState<AlertProvideProps>({
    message: '',
    severity: 'error',
  });
  const [alertMessages, setAlertMessages] = React.useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  const [notificationCounts, setNotificationCounts] = React.useState<number>(0);
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [langugeRoute, setLangugeRoute] = useState(preferredLng);

  useEffect(() => {
    const storedValue = localStorage.getItem('preferredLng');
    const items = storedValue ? JSON.parse(storedValue) : null;
    const preferred = items?.LangaueName;

    if (preferred === 'Deu') {
      setLangugeRoute('/de');
    } else {
      setLangugeRoute('');
    }
  }, [preferredLng]);

  const showAlert = (message: string, severity: string) => {
    setAlert({
      message,
      severity,
    });
    setTimeout(() => {
      setAlert({
        message: '',
        severity: 'error',
      });
    }, 100);
  };
  const userLonginValue: UserLoginContextValue = {
    isUserLogin,
    setIsUserLogin,
    userData,
    setUserData,
    toggleView,
    setToggleView,
    notificationCounts,
    setNotificationCounts,
    loading,
    showAlert,
    userAvatar,
    setUserAvatar,
    alertMessages,
    setAlertMessages,
    langugeRoute,
    setLangugeRoute,
  };

  useEffect(() => {
    setIsUserLogin(loginLocalStorageHelper.isUserLoggedIn());
    setLoading(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserLoginContext.Provider value={userLonginValue}>
        <CssBaseline />
        <AlertProvide message={alert.message} severity={alert.severity} />
        <Suspense>{children}</Suspense>
      </UserLoginContext.Provider>
    </ThemeProvider>
  );
}

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <title>Miukama</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers preferredLng={i18n.language}>
          <Header t={t} preferredLng={i18n.language} />
          <Box sx={{ pt: '100px' }}>{children}</Box>
        </Providers>
      </body>
    </html>
  );
}
