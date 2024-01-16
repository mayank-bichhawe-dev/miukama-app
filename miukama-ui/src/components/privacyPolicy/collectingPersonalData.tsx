'use-client';

import { Box } from '@mui/material';
import React from 'react';
import PrivacyPolicyHeading from './privacyPolicyHeading';
import PrivacyPolicyDataList from './privacyPolicyDataList';
import PrivacyPolicyPara from './privacyPolicyPara';

const CollectingPersonalData = () => {
  const personalDataPoint: string[] = [
    'Email address',
    'First name and last name',
    'Phone number',
    'Address, State, Province, ZIP/Postal code, City',
    'Usage Data',
  ];

  const socialMediaServicesData: string[] = [
    'Google',
    'Facebook',
    'Instagram',
    'Twitter',
    'LinkedIn',
  ];

  const usageDataContents: string[] = [
    `Usage Data is collected automatically when using the Service.`,

    `Usage Data may include information such as Your Device Internet Protocol
    address (e.g. IP address), browser type, browser version, the pages of
    our Service that You visit, the time and date of Your visit, the time
    spent on those pages, unique device identifiers and other diagnostic
    data.`,

    `When You access the Service by or through a mobile device, We may
    collect certain information automatically, including, but not limited
    to, the type of mobile device You use, Your mobile device unique ID, the
    IP address of Your mobile device, Your mobile operating system, the type
    of mobile Internet browser You use, unique device identifiers and other
    diagnostic data.`,

    `When You access the Service by or through a mobile device, We may
    collect certain information automatically, including, but not limited
    to, the type of mobile device You use, Your mobile device unique ID, the
    IP address of Your mobile device, Your mobile operating system, the type
    of mobile Internet browser You use, unique device identifiers and other
    diagnostic data.`,

    `We may also collect information that Your browser sends whenever You
    visit our Service or when You access the Service by or through a mobile
    device.`,
  ];

  const socialMediaServicesContent: string[] = [
    `If You decide to register through or otherwise grant us access to a
    Third-Party Social Media Service, We may collect Personal data that is
    already associated with Your Third-Party Social Media Services account,
    such as Your name, Your email address, Your activities or Your contact
    list associated with that account.`,

    `You may also have the option of sharing additional information with the
    Company through Your Third-Party Social Media Service account. If You
    choose to provide such information and Personal Data, during
    registration or otherwise, You are giving the Company permission to use,
    share, and store it in a manner consistent with this Privacy Policy.`,
  ];

  return (
    <Box>
      <PrivacyPolicyHeading text="Collecting and Using Your Personal Data" />
      <PrivacyPolicyHeading
        text="Types of Data Collected"
        variant="h2"
        fontSize="32px"
        lineHeight="48px"
      />
      <PrivacyPolicyHeading
        text="Personal Data"
        variant="h3"
        fontSize="24px"
        lineHeight="36px"
      />

      <PrivacyPolicyPara
        text="While using Our Service, We may ask You to provide Us with certain
        personally identifiable information that can be used to contact or
        identify You. Personally identifiable information may include, but is
        not limited to:"
      />
      <PrivacyPolicyDataList data={personalDataPoint} />
      <PrivacyPolicyHeading
        text="Usage Data"
        variant="h3"
        fontSize="24px"
        lineHeight="36px"
      />

      {usageDataContents.map((content, index) => (
        <PrivacyPolicyPara text={content} key={index} />
      ))}

      <PrivacyPolicyHeading
        text="Information from Third-Party Social Media Services"
        variant="h3"
        fontSize="24px"
        lineHeight="36px"
      />

      <PrivacyPolicyPara
        text="The Company allows You to create an account and log in to use the
        Service through the following Third-party Social Media Services:"
      />

      <PrivacyPolicyDataList data={socialMediaServicesData} />

      {socialMediaServicesContent.map((content, i) => (
        <PrivacyPolicyPara text={content} key={i} />
      ))}
    </Box>
  );
};

export default CollectingPersonalData;
