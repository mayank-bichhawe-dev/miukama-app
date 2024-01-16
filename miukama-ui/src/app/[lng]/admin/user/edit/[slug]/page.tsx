'use client';
import { Container } from '@mui/material';
import { useTranslation } from '@/app/i18n';
import ProfileForm from '@/components/userProfileForm/ProfileForm';

const UpdateUser = async ({
  params: { lng },
  params,
}: {
  params: { slug: number; lng: string };
}) => {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <ProfileForm preferredLng={i18n.language} t={t} id={params.slug} />
    </Container>
  );
};

export default UpdateUser;
