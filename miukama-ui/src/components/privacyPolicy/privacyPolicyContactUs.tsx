'use-client';

import React from 'react';
import { Box } from '@mui/material';
import PrivacyPolicyHeading from './privacyPolicyHeading';
import PrivacyPolicyPara from './privacyPolicyPara';
import { CustomBullets } from './privacyPolicyDataList';

const PrivacyPolicyContactUs = () => {
  const contactEmailId: string = 'deepak.birla@backbenchertechnologies.com';

  return (
    <Box>
      <PrivacyPolicyHeading text="Contact Us" />
      <PrivacyPolicyPara text="If you have any questions about this Privacy Policy, You can contact us:" />
      <ul>
        <li style={{ listStyle: 'none' }}>
          <CustomBullets /> By email: {contactEmailId}
        </li>
      </ul>
    </Box>
  );
};

export default PrivacyPolicyContactUs;
