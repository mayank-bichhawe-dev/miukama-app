'use client';

import NotificationPage from '@/components/notification/NotificationPage';
import { Container } from '@mui/material';
import React from 'react';

function Notifications() {
  return (
    <>
      <Container maxWidth="xl">
        <NotificationPage />
      </Container>
    </>
  );
}

export default Notifications;
