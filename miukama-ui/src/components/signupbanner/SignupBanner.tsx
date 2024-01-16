import React, { useContext } from 'react';
import styles from './SignupBanner.module.css';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { KeyPrefix, TFunction } from 'i18next';
import { UserLoginContext } from '@/app/[lng]/layout';

function Faqsignup({
  t,
}: {
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}) {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  return (
    <Container maxWidth={'xl'} className={styles.faq}>
      <Grid container spacing={2}>
        <Grid item xs={3} md={9}>
          <Box className={styles.box1}>
            <Typography className={styles.content}>
              {t('home.content')}
            </Typography>

            <Button
              onClick={() => {
                router.push(`${langugeRoute}/signup`);
              }}
              className={styles.button}
              color="secondary"
              variant="contained"
              size="medium">
              {t('home.signup')}
            </Button>
          </Box>
        </Grid>
        <Grid item md={3} xs={9} className={styles.sideImage}>
          <Box className={styles.box2}>
            <img src="/myproject.png" alt="" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Faqsignup;
