'use-client';

import { Box } from '@mui/material';
import React from 'react';
import InterpretationDefinitions from './InterpretationDefinitions';
import PrivacyPolicyContactUs from './privacyPolicyContactUs';
import TermsAndConditionsTextContainer from '../termsAndConditions/termsAndConditionsTextContainer';

interface TranslationsContentContainerProps {
  heading: string;
  contentData: string[];
  definitionsListTitle: string;
  interpretationDefinitionsListData: string[];
  children: React.ReactNode;
}

const TranslationsContentContainer = ({
  heading,
  contentData,
  definitionsListTitle,
  interpretationDefinitionsListData,
  children,
}: TranslationsContentContainerProps) => {
  return (
    <Box
      sx={{
        paddingTop: '8px',
        borderTop: '1px solid #eee',
      }}>
      <Box
        sx={{
          position: 'relative',
          width: '90%',
          maxWidth: '1024px',
          margin: '0 auto',
        }}>
        <Box>
          <TermsAndConditionsTextContainer
            heading={heading}
            contentData={contentData}
          />
          <InterpretationDefinitions
            definitionsListTitle={definitionsListTitle}
            interpretationDefinitionsListData={
              interpretationDefinitionsListData
            }
          />
          {children}
          <PrivacyPolicyContactUs />
        </Box>
      </Box>
    </Box>
  );
};

export default TranslationsContentContainer;
