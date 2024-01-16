'use client';

import PrivacyPolicy from '@/components/privacyPolicy/privacyPolicy';
import { Container } from '@mui/material';
import React from 'react';

const UserPrivacyPolicy = () => {
  return (
    <Container maxWidth="xl">
      <PrivacyPolicy />
    </Container>
  );
};

export default UserPrivacyPolicy;
