'use-client';

import { Box } from '@mui/material';
import React from 'react';
import PrivacyPolicyHeading from './privacyPolicyHeading';
import PrivacyPolicyDataList from './privacyPolicyDataList';
import PrivacyPolicyPara from './privacyPolicyPara';

const InterpretationDefinitions = ({
  interpretationDefinitionsListData,
  definitionsListTitle,
}: {
  interpretationDefinitionsListData: string[];
  definitionsListTitle: string;
}) => {
  return (
    <Box>
      <PrivacyPolicyHeading text="Interpretation and Definitions" />
      <PrivacyPolicyHeading
        text="Interpretation"
        variant="h2"
        fontSize="32px"
        lineHeight="48px"
      />

      <PrivacyPolicyPara
        text="The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        in plural."
      />

      <PrivacyPolicyHeading
        text="Definitions"
        variant="h2"
        fontSize="32px"
        lineHeight="48px"
      />

      <PrivacyPolicyPara text={definitionsListTitle} />
      <PrivacyPolicyDataList data={interpretationDefinitionsListData} />
    </Box>
  );
};

export default InterpretationDefinitions;
