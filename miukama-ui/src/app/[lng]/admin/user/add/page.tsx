'use client';

import { Container } from '@mui/material';
import React from 'react';
import { useTranslation } from '../../../../i18n';
import ProfileForm from '@/components/userProfileForm/ProfileForm';

async function AddUser({ params: { lng } }: { params: { lng: string } }) {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <ProfileForm preferredLng={i18n.language} t={t} add={true} />
    </Container>
  );
}

export default AddUser;
