import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ImageWithIcon = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 1,
        padding: '27px 17px 27px 17px',
        background: '#BCBABA',
        borderRadius: '5px',
      }}>
      <Box
        sx={{
          background: 'url(/planetIcon.png)',
          width: '85px',
          height: '57px',
        }}
      />
      <Box position="relative">
        <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: '29px' }}>
          Contact Us!{' '}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            columnGap: '8px',
          }}>
          <Typography variant="subtitle1" sx={{ lineHeight: '20px' }}>
            Get Started{' '}
          </Typography>
          <ArrowForwardIcon fontSize="small" />
        </Box>
      </Box>
    </Box>
  );
};

export default ImageWithIcon;
