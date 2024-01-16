import React from 'react';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { NavLinks } from './headerConfiguration';

export const NavigationLinks = ({ page }: { page: NavLinks }) => {
  return (
    <MuiLink
      key={page.title}
      href={page.path}
      underline="none"
      variant="body2"
      component={Link}
      sx={{
        pr: '1rem',
        pl: '1rem',
        my: 2,
        color: 'white',
        ':hover': { color: '#B20000' },
        display: 'block',

        textTransform: 'none',
        fontWeight: 'medium',
      }}>
      {page.title}
    </MuiLink>
  );
};

export default NavigationLinks;
