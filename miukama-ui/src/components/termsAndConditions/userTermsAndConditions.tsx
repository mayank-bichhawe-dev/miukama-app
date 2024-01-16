'use client';

import React from 'react';
import PrivacyPolicyHeader from '../privacyPolicy/privacyPolicyHeader';
import TranslationsContentContainer from '../privacyPolicy/translationsContentContainer';
import termsAndConditionDefinitionsPoints from '@/common/termsAndConditionDefinitionsPoints';
import TermsAndConditionsTextContainer from './termsAndConditionsTextContainer';
import termsAndConditionContentData from '@/common/termsAndConditionCommonText';

const UserTermsAndConditions = () => {
  const contentData: string[] = [
    `Last updated: September 06, 2023`,
    `Please read these terms and conditions carefully before using Our Service.`,
  ];

  return (
    <>
      <PrivacyPolicyHeader text="Terms and Conditions for miukama" />
      <TranslationsContentContainer
        heading={'Terms and Conditions'}
        contentData={contentData}
        definitionsListTitle="For the purposes of these Terms and Conditions:"
        interpretationDefinitionsListData={termsAndConditionDefinitionsPoints}>
        {termsAndConditionContentData.map((content) => (
          <TermsAndConditionsTextContainer
            heading={content.heading}
            contentData={content.dataArray}
            key={content.heading}
          />
        ))}
      </TranslationsContentContainer>
    </>
  );
};

export default UserTermsAndConditions;
