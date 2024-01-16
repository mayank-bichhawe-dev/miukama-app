'use client';

import ViewProductsList from '@/components/product/viewProduct';
import { Container } from '@mui/material';
import { useTranslation } from '../../../app/i18n';

export default async function Admin({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <ViewProductsList preferredLng={i18n.language} t={t} />
    </Container>
  );
}
