import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box, Button, Grid, TextField } from '@mui/material';
import styles from './CssModulesFooter.module.css';
import Link from 'next/link';
import { KeyPrefix, TFunction } from 'i18next';
import {
  marketPlaceNavLinks,
  myAccountNavLinks,
  resourcesNavList,
} from './footerConfiguration';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'primary' : '#fff',
  paddingTop: theme.spacing(2.5),
  marginLeft: theme.spacing(0),
  color: '#ffffff',
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: '16px',
}));
const FooterHome = ({
  t,
}: {
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}) => (
  <div className={styles.footer}>
    <Container maxWidth="xl">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
        <Grid item xs={10} sm={12} md={6} lg={5}>
          <Item sx={{ paddingTop: '0px' }}>
            <Box className={styles.logo}>LOGO</Box>
          </Item>
          <Item>
            <Item>
              <Typography className={styles.footerContentStay}>
                {t('home.footer.stay')}
              </Typography>
            </Item>

            <Item>
              <Box className={styles.box}>{t('home.footer.join')}</Box>
            </Item>
            <Item>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                }}>
                <TextField
                  placeholder={t('home.footer.emailAddress') as string}
                  size="medium"
                  fullWidth={false}
                />
                <Button
                  size="large"
                  color="secondary"
                  className={styles.button}>
                  {t('home.footer.subscribes')}
                </Button>
              </Box>
            </Item>
            <Item>&copy;{t('home.footer.miukama')}</Item>
          </Item>
        </Grid>
        <Grid item xs={4} sm={3} md={2} lg={2}>
          <Typography className={styles.footer_header}>
            {' '}
            {t('home.footer.marketplace.marketplace')}
          </Typography>
          {marketPlaceNavLinks.map((page, id) => (
            <Item key={id}>
              <Typography>
                <Link href={page.path} className={styles.footer_links}>
                  {t(page.title)}
                </Link>
              </Typography>
            </Item>
          ))}
        </Grid>
        <Grid
          item
          xs={4}
          sm={3}
          md={2}
          lg={2}
          className={styles.footerListContainer}>
          <Typography className={styles.footer_header}>
            {' '}
            {t('home.footer.myAccount.account')}
          </Typography>
          {myAccountNavLinks.map((page, id) => (
            <Item key={id}>
              <Typography>
                <Link href={page.path} className={styles.footer_links}>
                  {t(page.title)}
                </Link>
              </Typography>
            </Item>
          ))}
        </Grid>
        <Grid
          item
          xs={4}
          sm={3}
          md={2}
          lg={2}
          className={styles.footerListContainer}>
          <Typography className={styles.footer_header}>
            {' '}
            {t('home.footer.resources.resources')}
          </Typography>
          {resourcesNavList.map((page, id) => (
            <Item key={id}>
              <Typography>
                <Link href={page.path} className={styles.footer_links}>
                  {t(page.title)}
                </Link>
              </Typography>
            </Item>
          ))}
        </Grid>
      </Grid>
    </Container>
  </div>
);

export default FooterHome;
