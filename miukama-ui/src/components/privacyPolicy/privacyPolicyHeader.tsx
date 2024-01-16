'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';

const PrivacyPolicyHeader = ({ text }: { text: string }) => {
  return (
    <Box
      sx={{
        color: 'smokeWhite',
        padding: '1rem 0',
      }}>
      <Box
        sx={{
          position: 'relative',
          width: '90%',
          maxWidth: '1024px',
          margin: '0 auto',
        }}>
        <Typography
          sx={{
            fontSize: '24px',
            lineHeight: '24px',
            fontWeight: '700',
            margin: '0',
          }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default PrivacyPolicyHeader;
