'use client';
import Users from '@/components/user/user';
import { Container } from '@mui/material';
import { useTranslation } from '../../../i18n';

const Page = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <Users preferredLng={i18n.language} t={t} />
    </Container>
  );
};
export default Page;
