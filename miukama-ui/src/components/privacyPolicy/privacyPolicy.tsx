'use client';

import React from 'react';
import PrivacyPolicyHeader from './privacyPolicyHeader';
import TranslationsContentContainer from './translationsContentContainer';
import privacyPolicyDefinitionsPoints from '@/common/privacyPolicyDefinitionsPoints';
import CollectingPersonalData from './collectingPersonalData';
import UsagePersonalData from './usagePersonalData';

const PrivacyPolicy = () => {
  const contentData: string[] = [
    `Last updated: September 06, 2023`,

    `This Privacy Policy describes Our policies and procedures on the
  collection, use and disclosure of Your information when You use the
  Service and tells You about Your privacy rights and how the law protects
  You.`,

    `We use Your Personal data to provide and improve the Service. By using
  the Service, You agree to the collection and use of information in
  accordance with this Privacy Policy. This Privacy Policy has been
  created with the help of the Privacy Policy Generator.`,
  ];

  const definitionsListTitle: string =
    'For the purposes of this Privacy Policy:';

  return (
    <>
      <PrivacyPolicyHeader text="Privacy Policy for miukama" />
      <TranslationsContentContainer
        heading="Privacy Policy"
        contentData={contentData}
        definitionsListTitle={definitionsListTitle}
        interpretationDefinitionsListData={privacyPolicyDefinitionsPoints}>
        <>
          <CollectingPersonalData />
          <UsagePersonalData />
        </>
      </TranslationsContentContainer>
    </>
  );
};

export default PrivacyPolicy;
