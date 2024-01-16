'use client';

import ForgetPassword from '@/components/auth/forgetPassword';
import { Container } from '@mui/material';
import { useTranslation } from '../../../app/i18n';

const ForgotPassword = async ({
  params: { lng },
}: {
  params: { lng: string };
}) => {
  const { t, i18n } = await useTranslation(lng, undefined);

  return (
    <Container maxWidth="xl">
      <ForgetPassword preferredLng={i18n.language} t={t} />
    </Container>
  );
};

export default ForgotPassword;
