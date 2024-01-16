'use client';

import ViewProductsList from '@/components/product/viewProduct';
import { Container } from '@mui/material';
import React from 'react';
import { useTranslation } from '../../../i18n';

async function DisplayProducts({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t, i18n } = await useTranslation(lng, undefined);

  return (
    <>
      <Container maxWidth="xl">
        <ViewProductsList preferredLng={i18n.language} t={t} />
      </Container>
    </>
  );
}

export default DisplayProducts;
