'use client';
import React, { useContext } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { useRouter } from 'next/navigation';
import { KeyPrefix, TFunction } from 'i18next';
import { UserLoginContext } from '@/app/[lng]/layout';

interface RedirecEmailAddProps {
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  preferredLng: string;
}

const RedirecEmailAdd: React.FC<RedirecEmailAddProps> = ({ t }) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);

  return (
    <Grid
      container
      sx={{
        marginTop: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Grid item xs={12} sm={8} md={6} sx={{ padding: '3rem' }}>
        <Box display="flex" justifyContent="center" marginLeft="4.625rem">
          <Typography
            variant="h1"
            noWrap
            onClick={() => router.push(`${langugeRoute}/`)}
            sx={{
              mr: '3rem',
              display: { xs: 'none', md: 'flex' },
              fontWeight: 900,
              fontSize: '2.25rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}>
            LOGO
            <Typography
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontWeight: 900,
                fontSize: '2.25rem',
                color: '#B20000',
                ml: '.3rem',
                mr: '1rem',
                lineHeight: '40px',
              }}>
              DESIGN
            </Typography>
          </Typography>
        </Box>
        <Box mt="4rem">
          <Typography variant="h4" sx={{ textTransform: 'none' }} gutterBottom>
            {t('redirect_email.title')}
            <img
              style={{
                background: '#fff',
                height: '25px',
                borderRadius: '4px',
              }}
              src="/email.png"
              alt=""
            />
          </Typography>

          <Typography variant="h5" gutterBottom>
            {t('redirect_email.instruction')}
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            my: '3rem',
          }}>
          <Box mt="1rem">
            <Button type="button" fullWidth sx={{ border: '1px solid' }}>
              {t('redirect_email.go_to_email')}
            </Button>
          </Box>
          <Box mt="2rem">
            <Typography
              textAlign="center"
              mt={1}
              gutterBottom
              onClick={() => router.push(`${langugeRoute}/login`)}
              sx={{ cursor: 'pointer' }}>
              <ArrowBackIosNewSharpIcon
                sx={{ display: 'inline', verticalAlign: 'middle' }}
              />
              {t('redirect_email.back_to_login')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RedirecEmailAdd;
