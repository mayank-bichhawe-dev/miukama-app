'use client';

import { Container } from '@mui/material';
import AddCategory from '@/components/category/addCategory';
import React from 'react';
import { useTranslation } from '../../../../i18n';

async function Page({ params: { lng } }: { params: { lng: string } }) {
  const { t, i18n } = await useTranslation(lng, undefined);

  return (
    <>
      <Container maxWidth="xl">
        <AddCategory preferredLng={i18n.language} t={t} />
      </Container>
    </>
  );
}

export default Page;
