'use client';
import { Container } from '@mui/material';
import React from 'react';
import { useTranslation } from '../../../../../i18n';
import AddCategory from '@/components/category/addCategory';

async function Edit({
  params: { lng },
  params,
}: {
  params: { slug: string; lng: string };
}) {
  const { t, i18n } = await useTranslation(lng, undefined);

  return (
    <Container maxWidth="xl">
      <AddCategory
        id={Number(params.slug)}
        preferredLng={i18n.language}
        t={t}
      />
    </Container>
  );
}
export default Edit;
