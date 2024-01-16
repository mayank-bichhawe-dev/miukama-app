'use client';
import Galleries from '@/components/galleries/gallery';
import { Container } from '@mui/material';
import { useTranslation } from '../../../i18n';

const Page = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <Galleries preferredLng={i18n.language} t={t} />
    </Container>
  );
};
export default Page;
