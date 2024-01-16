'use client';

import AddGallery from '@/components/addGallery/AddGallery';
import { Container } from '@mui/material';
import React from 'react';
import { useTranslation } from '../../../../i18n';

async function AddGalleries({ params: { lng } }: { params: { lng: string } }) {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <AddGallery preferredLng={i18n.language} t={t} />
    </Container>
  );
}

export default AddGalleries;
