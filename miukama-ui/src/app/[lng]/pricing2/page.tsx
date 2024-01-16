'use client';
import React from 'react';
import PlansDescriptionBoxWrapper from '../../../components/plansDescriptionBoxWrapper';
import ImageWithIcon from '@/components/imageWithText';
import Banner from '../../../components/banner/banner';
import styles from './pricing.module.css';
import SelectPlan from '../../../components/selectPlan';
import { Typography, Box } from '@mui/material';

const Pricing = () => {
  const selectPlandata = [
    {
      title: 'Hobbyist',
      planCost: 'Free',
      buttonText: 'Try Now!',
      planId: 0,
      planType: 'year',
    },
    {
      title: 'Collector',
      planCost: '5 EUR / Month',
      buttonText: 'Choose Plan',
      planId: 0,
      planType: 'year',
    },
    {
      title: 'Museum I',
      planCost: '50 EUR / Month',
      buttonText: 'Choose Plan',
      planId: 0,
      planType: 'year',
    },
    {
      title: 'Museum 2',
      planCost: '150 EUR / Month',
      buttonText: 'Choose Plan',
      planId: 0,
      planType: 'year',
    },
    {
      title: 'Museum 3',
      planCost: '500 EUR / Month',
      buttonText: 'Choose Plan',
      planId: 0,
      planType: 'year',
    },
  ];

  return (
    <>
      <Banner
        title={'Pricing'}
        subtitle={'Home/Pricing'}
        fontSize="40px"
        fontWeight={500}
      />
      <Box className={styles.container}>
        <Typography className={styles.title}>
          Frequently Ask Questions
        </Typography>
        <Typography variant="h5" className={styles.description}>
          Find solutions to common problems and queries in our FAQ <br />
          section.Save time and find answers to frequently asked <br />
          questions in our FAQ page.
        </Typography>
      </Box>
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        width="100%"
        marginTop="100px"
        marginBottom="80px"
        alignItems="flex-end">
        <ImageWithIcon />
        <SelectPlan plans={selectPlandata} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        paddingBottom="100px">
        <PlansDescriptionBoxWrapper />
      </Box>
    </>
  );
};

export default Pricing;
