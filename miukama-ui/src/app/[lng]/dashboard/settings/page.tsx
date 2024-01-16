'use client';

import UserSettingsPanel from '@/components/auth/userSettingsPanel/userSettingsPanel';
import { Container } from '@mui/material';
import { useTranslation } from '../../../i18n';

const UpdateUserPassword = async ({
  params: { lng },
}: {
  params: { lng: string };
}) => {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <UserSettingsPanel preferredLng={i18n.language} t={t} />
    </Container>
  );
};

export default UpdateUserPassword;
