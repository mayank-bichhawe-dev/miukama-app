'use client';

import { HomeCategory } from '@/components/category/HomeCategory';
import { Container } from '@mui/material';
import React from 'react';
import { useTranslation } from '../../../i18n';

async function Category({ params: { lng } }: { params: { lng: string } }) {
  const { t, i18n } = await useTranslation(lng, undefined);

  return (
    <>
      <Container maxWidth="xl">
        <HomeCategory preferredLng={i18n.language} t={t} />
      </Container>
    </>
  );
}
export default Category;
