'use client';
import { Container } from '@mui/material';
import { useTranslation } from '../../../../../i18n';
import AddGallery from '@/components/addGallery/AddGallery';

const UpdateGalleries = async ({
  params: { lng },
  params,
}: {
  params: { slug: number; lng: string };
}) => {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <AddGallery preferredLng={i18n.language} t={t} id={params.slug} />
    </Container>
  );
};

export default UpdateGalleries;
