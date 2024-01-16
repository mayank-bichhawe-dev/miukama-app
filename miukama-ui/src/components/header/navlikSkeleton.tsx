import React from 'react';
import { Box, Skeleton } from '@mui/material';

const NavLinksSkeleton = () => {
  const skeletons = [];
  for (let i = 0; i <= 4; i++) {
    skeletons.push(
      <Skeleton
        key={i}
        variant="text"
        width={50}
        height={25}
        sx={{ ml: '1rem', mr: '1rem', my: 2, bgcolor: 'grey.900' }}
      />,
    );
  }
  return (
    <Box
      alignItems="center"
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
      }}>
      {skeletons}
    </Box>
  );
};

export default NavLinksSkeleton;
