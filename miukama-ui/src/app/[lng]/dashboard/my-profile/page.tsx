'use client';

import ProfileForm from '@/components/userProfileForm/ProfileForm';
import { Container } from '@mui/material';
import { useTranslation } from '../../../i18n';

async function MyProfile({ params: { lng } }: { params: { lng: string } }) {
  const { t, i18n } = await useTranslation(lng, undefined);

  return (
    <Container maxWidth="xl">
      <ProfileForm preferredLng={i18n.language} t={t} />
    </Container>
  );
}

export default MyProfile;
