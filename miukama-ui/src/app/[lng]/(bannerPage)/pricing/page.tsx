'use client';
import Banner from '../../../../components/banner/banner';
import { Box, Container } from '@mui/material';
import { useTranslation } from '../../../i18n/index';
import UserPlans from '@/components/userPlans/userPlans';

const Pricing = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t } = await useTranslation(lng, undefined);
  return (
    <Box>
      <Banner
        title={'Pricing'}
        subtitle={'Home/Pricing'}
        fontSize="40px"
        fontWeight={500}
      />
      <Container maxWidth="xl">
        <UserPlans />
      </Container>
    </Box>
  );
};

export default Pricing;
