import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomSwitch from '../customSwitch';
import PlansInfoBox from '../plansInfoBox';
import { getPlan } from '@/api/planApi/plan';
import { Userplan, Featureprop } from '@/interfaces/plans';

function UserPlans() {
  const [planData, setPlanData] = useState<Userplan[]>([]);
  const [masterFeature, setMasterFeature] = useState<Featureprop[]>([]);
  const [isYear, setIsYear] = useState<boolean>(false);

  const getData = async () => {
    try {
      const response = await getPlan();
      if (response) {
        const plans = response.data.data.plansData;
        const allmasterFeature = response.data.data.feature;
        setPlanData(plans);
        setMasterFeature(allmasterFeature);
      }
    } catch (error) {
      console.error('Error fetching plan data:', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: '100px',
          pb: '50px',
          flexDirection: 'column',
          textAlign: 'center',
        }}>
        <Typography
          sx={{
            fontSize: '30px',
            fontWeight: 700,
            lineHeight: '37px',
            marginBottom: '13px',
          }}>
          Choose a collector plan to register yourself..!
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: '16px',
            fontWeight: '400px',
            lineHeight: '26px',
            textAlign: 'center',
          }}>
          Find solutions to common problems and queries in our FAQ section. Save
          time <br />
          and find answers to frequently asked questions in our FAQ page. <br />{' '}
        </Typography>
        <CustomSwitch setIsYear={setIsYear} isYear={isYear} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        pb="100px"
        pt="44px">
        <PlansInfoBox
          planData={planData}
          masterFeature={masterFeature}
          isYear={isYear}
        />
      </Box>
    </Box>
  );
}

export default UserPlans;
