'use client';

import { Container } from '@mui/material';
import { useTranslation } from '../../../../i18n';
import ResetPassword from '@/components/auth/resetPassword/resetPassword';

const ResetPasswordComponent = async ({
  params,
  params: { lng },
}: {
  params: { slug: string; lng: string };
}) => {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <ResetPassword preferredLng={i18n.language} t={t} token={params.slug} />
    </Container>
  );
};

export default ResetPasswordComponent;
