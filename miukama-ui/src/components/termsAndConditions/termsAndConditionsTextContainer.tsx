'use client';

import React from 'react';
import { Box } from '@mui/material';
import PrivacyPolicyHeading from '../privacyPolicy/privacyPolicyHeading';
import PrivacyPolicyPara from '../privacyPolicy/privacyPolicyPara';

const TermsAndConditionsTextContainer = ({
  heading,
  contentData,
}: {
  heading: string;
  contentData: string[];
}) => {
  return (
    <Box>
      <PrivacyPolicyHeading text={heading} />
      {contentData.map((content, i) => (
        <PrivacyPolicyPara text={content} key={i} />
      ))}
    </Box>
  );
};

export default TermsAndConditionsTextContainer;
