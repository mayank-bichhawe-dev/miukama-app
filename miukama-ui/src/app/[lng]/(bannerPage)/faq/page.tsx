'use client';

import { Container } from '@mui/material';
import { useTranslation } from '../../../i18n';
import Faq from '@/components/faq/Faq';

export default async function FaqComponent({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <Faq preferredLng={i18n.language} t={t} />
    </Container>
  );
}
