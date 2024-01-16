'use client';

import SignupForm from '@/components/auth/SignUpForm';
import { Container } from '@mui/material';
import { useTranslation } from '../../../../app/i18n';

const Signup = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <SignupForm preferredLng={i18n.language} t={t} />
    </Container>
  );
};

export default Signup;
