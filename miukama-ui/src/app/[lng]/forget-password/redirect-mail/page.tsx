'use client';

import RedirecEmailAdd from '@/components/auth/redirectToMail/redirectEmail';
import { Container } from '@mui/material';
import { useTranslation } from '../../../../app/i18n';

const RedirecEmail = async ({
  params: { lng },
}: {
  params: { lng: string };
}) => {
  const { t, i18n } = await useTranslation(lng, undefined);

  return (
    <Container maxWidth="xl">
      <RedirecEmailAdd preferredLng={i18n.language} t={t} />
    </Container>
  );
};

export default RedirecEmail;
