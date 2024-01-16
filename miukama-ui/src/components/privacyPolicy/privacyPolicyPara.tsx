'use-client';

import React from 'react';
import { Typography } from '@mui/material';

const PrivacyPolicyPara = ({ text }: { text: string }) => {
  return (
    <Typography variant="body1" sx={{ margin: '1rem 0' }}>
      {text}
    </Typography>
  );
};

export default PrivacyPolicyPara;
