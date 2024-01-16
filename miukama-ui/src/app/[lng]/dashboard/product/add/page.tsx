'use client';

import AddProduct from '@/components/product/addProduct';
import { Container } from '@mui/material';
import { useTranslation } from '../../../../i18n';

const AddItem = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <AddProduct preferredLng={i18n.language} t={t} />
    </Container>
  );
};

export default AddItem;
