'use-client';

import { Typography } from '@mui/material';
import React from 'react';

interface headingProps {
  text: string;
  variant?: 'h1' | 'h2' | 'h3';
  fontSize?: '40px' | '32px' | '24px';
  lineHeight?: '60px' | '48px' | '36px';
}

const PrivacyPolicyHeading = ({
  text,
  variant,
  fontSize,
  lineHeight,
}: headingProps) => {
  return (
    <Typography
      variant={variant || 'h1'}
      sx={{
        fontWeight: '700',
        fontSize: fontSize || '40px',
        lineHeight: lineHeight || '60px',
        margin: '1rem 0',
      }}>
      {text}
    </Typography>
  );
};

export default PrivacyPolicyHeading;
