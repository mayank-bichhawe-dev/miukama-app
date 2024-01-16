import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { UserLoginContext } from '@/app/[lng]/layout';
import { useContext } from 'react';

export default function Logo() {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      onClick={() => router.push(`${langugeRoute}`)}
      sx={{
        mr: '3rem',
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'inherit',
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
          fontFamily: 'inherit',
          fontWeight: 900,
          fontSize: '1.25rem',
          color: 'red',
          ml: '.3rem',
          mr: '1rem',
        }}>
        DESIGN
      </Typography>
    </Typography>
  );
}
