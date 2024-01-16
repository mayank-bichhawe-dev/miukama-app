'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { NavLinks } from './headerConfiguration';
import Logo from '../Logo';
import NavigationLinks from './navigationLinks';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
import UserProfileSection from '@/components/userProfileSection';
import UserProfileSkeleton from './userProfileSkeleton';
import { UserLoginContext } from '@/app/[lng]/layout';
import { KeyPrefix, TFunction } from 'i18next';
import Link from 'next/link';
import Cookies from 'js-cookie';
import LanguageCurrencyDropdowns from './LanguageCurrencyDropdowns';

function ResponsiveAppBar({
  t,
  preferredLng,
}: {
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  preferredLng: string;
}) {
  const router = useRouter();
  const { setIsUserLogin, isUserLogin, userData, loading, langugeRoute } =
    useContext(UserLoginContext);
  const [userDetails, setUserDetails] = React.useState<any>();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserLogout = () => {
    loginLocalStorageHelper.clearAll();
    handleCloseUserMenu();
    setIsUserLogin(false);
    Cookies.remove('token');
    return router.push(`${langugeRoute}/login`);
  };

  React.useEffect(() => {
    if (isUserLogin) {
      const userInfo = loginLocalStorageHelper.getUserDetails();
      setUserDetails(userInfo);
    }
  }, [isUserLogin, userData]);

  const navLinks: NavLinks[] = [
    {
      title: t('headers.navigation.home'),
      path: `${langugeRoute}/`,
    },
    {
      title: t('headers.navigation.galleries'),
      path: `${langugeRoute}/gallery`,
    },
    {
      title: t('headers.navigation.sellOnMiukama'),
      path: `${langugeRoute}/sell-on-miukama`,
    },
    {
      title: t('headers.navigation.pricing'),
      path: `${langugeRoute}/pricing`,
    },
    {
      title: t('headers.navigation.faq'),
      path: `${langugeRoute}/faq`,
    },
  ];

  const optionalNavLinks: NavLinks[] = [
    {
      title: t('headers.navigation.signup'),
      path: `${langugeRoute}/signup`,
    },
    {
      title: t('headers.navigation.login'),
      path: `${langugeRoute}/login`,
    },
  ];

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        paddingTop: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #343131',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: '#000000',
        whiteSpace: 'nowrap',
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Grid display={'flex'} flexGrow={1}>
            <Grid item md={12}>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}>
                  {navLinks.map((page) => (
                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                      <Link
                        href={page.path}
                        prefetch={false}
                        style={{ textDecoration: 'none', color: '#fff' }}>
                        <Typography textAlign="center">{page.title}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                variant="h5"
                noWrap
                onClick={() => router.push(`${langugeRoute}/`)}
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'inherit',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}>
                LOGO
              </Typography>
              {loading ? null : (
                <Box
                  alignItems="center"
                  sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {(!isUserLogin ? [...navLinks, ...optionalNavLinks] : []).map(
                    (page: NavLinks) => (
                      <NavigationLinks page={page} key={page.title} />
                    ),
                  )}
                </Box>
              )}
            </Grid>
            <Grid flexGrow={1}></Grid>
            <Grid display="flex">
              <LanguageCurrencyDropdowns preferredLng={preferredLng} />

              {!loading ? (
                isUserLogin ? (
                  <UserProfileSection
                    handleOpenUserMenu={handleOpenUserMenu}
                    handleUserLogout={handleUserLogout}
                    handleCloseUserMenu={handleCloseUserMenu}
                    userDetails={userDetails}
                    anchorElUser={anchorElUser}
                    t={t}
                  />
                ) : (
                  <Button
                    size="small"
                    sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
                    onClick={() => router.push(`${langugeRoute}/contactUs`)}>
                    {t('headers.navigation.help')}
                  </Button>
                )
              ) : (
                <UserProfileSkeleton />
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
