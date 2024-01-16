'use client';

import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import style from './auth.module.css';
import { KeyPrefix, TFunction } from 'i18next';
import { useRouter } from 'next/navigation';
import { UserLoginContext } from '@/app/[lng]/layout';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  showLogo?: boolean;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

const AuthLayout = ({
  t,
  children,
  title,
  showLogo = false,
}: AuthLayoutProps) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const handleGoogleLoginPopup = () => {
    window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/google/popup`, '_self');
  };

  const handleFacebookLoginPopup = () => {
    window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/facebook/popup`, '_self');
  };

  return (
    <Grid
      container
      sx={{
        marginTop: '2rem',
        marginBottom: '2rem',
        border: '2px solid',
      }}>
      <Grid
        item
        sm={6}
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}>
        <Box
          sx={{
            padding: '3.5rem',
            height: '100%',
            backgroundColor: '#000000',
          }}>
          {showLogo ? (
            <Box>
              <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => router.push(`${langugeRoute}/`)}
                sx={{
                  mr: '3rem',
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}>
                LOGO
                <Typography
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 900,
                    fontSize: '1.25rem',
                    color: 'red',
                    ml: '.3rem',
                    mr: '1rem',
                  }}>
                  DESIGN
                </Typography>
              </Typography>
            </Box>
          ) : null}
          <Box
            sx={{
              display: 'grid',
              alignItems: 'center',
              justifyItems: 'center',
              height: '100%',
            }}>
            <Box
              sx={{
                width: '60%',
                maxWidth: '410px',
                textAlign: 'center',
              }}>
              <img
                style={{ maxWidth: '100%', height: 'auto' }}
                src="/bannerImage.png"
                alt="Miukama Signup"
              />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={6}>
        <Box
          sx={{
            padding: '3rem',
          }}>
          <Box
            sx={{
              textAlign: 'center',
            }}>
            <Box>
              <Typography
                variant="h4"
                sx={{ textTransform: 'uppercase' }}
                gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1">
                {t('loginForm.credential')}
              </Typography>
            </Box>
            <Box>
              <Stack direction="row" spacing={2} justifyContent="center" my={2}>
                <Avatar
                  classes={{
                    img: style.autoImage,
                  }}
                  title="Login with Facebook"
                  alt="Facebook"
                  sx={{ bgcolor: '#3B5998' }}
                  src="static/images/social/facebook.svg"
                  onClick={handleFacebookLoginPopup}
                />
                <Avatar
                  classes={{
                    img: style.autoImage,
                  }}
                  title="Login with Google"
                  alt="Google"
                  sx={{ bgcolor: '#FFFFFF' }}
                  src="static/images/social/google.svg"
                  onClick={handleGoogleLoginPopup}
                />
                <Avatar
                  classes={{
                    img: style.autoImage,
                  }}
                  title="Login with Apple"
                  alt="Apple"
                  sx={{ bgcolor: '#FFFFFF' }}
                  src="static/images/social/apple.svg"
                />
                <Avatar
                  classes={{
                    img: style.autoImage,
                  }}
                  title="Login with Twitter"
                  alt="Twitter"
                  sx={{ bgcolor: '#03A9F4' }}
                  src="static/images/social/twitter.svg"
                />
              </Stack>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px 1fr',
                alignItems: 'center',
                marginBottom: '3.5rem',
                marginTop: '2.5rem',
              }}>
              <Box sx={{ backgroundColor: '#E0E0E0', height: '1px' }}></Box>
              <Box>
                <Typography>{t('loginForm.or')}</Typography>
              </Box>
              <Box sx={{ backgroundColor: '#E0E0E0', height: '1px' }}></Box>
            </Box>
          </Box>
          <Box>{children}</Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
