import React from 'react';
import { Box, Skeleton } from '@mui/material';

const UserProfileSkeleton = () => {
  return (
    <Box
      alignItems="center"
      sx={{
        p: '8px 24px',
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        columnGap: '24px',
      }}>
      <Skeleton variant="circular" width={45} height={45} />
      <Box>
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="text" width={100} height={20} />
      </Box>
    </Box>
  );
};

export default UserProfileSkeleton;
