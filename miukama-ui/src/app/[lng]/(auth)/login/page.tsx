'use client';

import LoginForm from '@/components/auth/LoginForm';
import { Container } from '@mui/material';
import { useTranslation } from '../../../i18n';

const Login = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <LoginForm preferredLng={i18n.language} t={t} />
    </Container>
  );
};

export default Login;
