'use client';

import AddProduct from '@/components/product/addProduct';
import { Container } from '@mui/material';
import { useTranslation } from '../../../../../i18n';

const UpdateProduct = async ({
  params: { lng },
  params,
}: {
  params: { slug: number; lng: string };
}) => {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <AddProduct id={params.slug} preferredLng={i18n.language} t={t} />
    </Container>
  );
};

export default UpdateProduct;
