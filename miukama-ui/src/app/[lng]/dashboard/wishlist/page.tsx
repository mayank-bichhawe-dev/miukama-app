'use client';

import { WishListPage } from '@/components/wishList/WishListPage';
import { Container } from '@mui/material';
import { useTranslation } from '../../../i18n';

export default async function Wishlist({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t, i18n } = await useTranslation(lng, undefined);
  return (
    <Container maxWidth="xl">
      <WishListPage preferredLng={i18n.language} t={t} />
    </Container>
  );
}
