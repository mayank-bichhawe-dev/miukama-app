'use client';
import { Container } from '@mui/material';
import HomeComponent from '@/components/home/home';
import { useTranslation } from '../../i18n';

export default async function Home({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <HomeComponent preferredLng={i18n.language} t={t} />
    </Container>
  );
}
