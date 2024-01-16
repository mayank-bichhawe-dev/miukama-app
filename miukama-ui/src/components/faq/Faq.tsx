'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import styles from './faq.module.css';
import { getFaqData } from '@/api/faqApi/faq';
import Accordion from '../accordian/accordian';
import Banner from '../banner/banner';
import SignupBanner from '../signupbanner/SignupBanner';
import { KeyPrefix, TFunction } from 'i18next';

interface AccordionData {
  question: string;
  answer: string;
}

const Faq: React.FC<{
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}> = ({ t }) => {
  const [accordianData, setAccordianData] = useState<AccordionData[]>([]);

  useEffect(() => {
    fetchAccordianData();
  }, []);

  const fetchAccordianData = async () => {
    try {
      const { data } = await getFaqData();
      setAccordianData(data.data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Banner
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
        fontSize="40px"
        fontWeight={500}
      />
      <Container maxWidth="xl">
        <Box className={styles.container}>
          <Typography variant="h4" className={styles.title}>
            {t('faq.title')}
          </Typography>
          <Typography variant="body1" className={styles.description}>
            {t('faq.description1')}
            <br />
            {t('faq.description2')}
            <br /> {t('faq.description3')}
          </Typography>
        </Box>
        <Grid container spacing={3.9} className={styles.gridContainer}>
          {accordianData.length > 0
            ? accordianData.map((data, index) => (
                <Grid item xs={11} md={9} key={index}>
                  <Accordion
                    title={`${index + 1 < 10 ? '0' : null}${index + 1}: ${
                      data.question
                    }`}
                    content={data.answer}
                    key={index}
                  />
                </Grid>
              ))
            : null}
        </Grid>
        <SignupBanner t={t} />
      </Container>
    </>
  );
};

export default Faq;
