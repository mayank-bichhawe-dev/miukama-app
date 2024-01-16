'use client';

import React from 'react';
import { Container } from '@mui/material';
import UserTermsAndConditions from '@/components/termsAndConditions/userTermsAndConditions';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="xl">
      <UserTermsAndConditions />
    </Container>
  );
};

export default TermsAndConditions;
