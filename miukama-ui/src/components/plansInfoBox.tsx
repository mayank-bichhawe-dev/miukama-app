import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import SelectPlan from './selectPlan';
import PlansContainer from './plansDescriptionBox/PlansContainer';
import ImageWithIcon from './imageWithText';
import { Userplan, PlansData } from '@/interfaces/plans';
import AlertBox from './alertBox/alertBox';
import { UserLoginContext } from '@/app/[lng]/layout';

const PlansInfoBox: React.FC<PlansData> = ({
  planData,
  masterFeature,
  isYear,
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(0);
  const { alertMessages, setAlertMessages } = useContext(UserLoginContext);
  const selectPlanData = planData?.map((item: Userplan, index) => ({
    title: item?.planName,
    planCost: isYear
      ? `${item.priceInYear ? item.priceInYear.toString() : '0'} Rs / Year`
      : `${item.priceInMonth ? item.priceInMonth.toString() : '0'} Rs / Month`,
    buttonText: index === 0 ? 'Try Now!' : 'choose plan',
    planId: item.id,
    planType: isYear ? 'year' : 'month',
  }));

  const plansInfoValues = masterFeature?.map((featureName) => {
    const values = planData.map((item) => {
      const mapping = item.PlanFeatureMappings.find(
        (mapping) => mapping.featureId === featureName.id,
      );
      return mapping ? mapping.data : '----';
    });

    return {
      property: featureName?.name,
      values,
    };
  });

  const highLightPlansIndex = [Number(highlightedIndex)];

  return (
    <>
      <Box
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          minWidth: '100px',
          pb: '40px',
        }}>
        <Box paddingY="1.25rem">
          <AlertBox
            alertMessages={alertMessages}
            handleAlertClose={() => setAlertMessages([])}></AlertBox>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={' 287px  repeat(5, minmax(150px, 1fr))'}
          paddingBottom="80px">
          <Box>
            <ImageWithIcon />
          </Box>
          <SelectPlan plans={selectPlanData} />
        </Box>
        <Box
          display="flex"
          sx={{
            borderRadius: '5px',
            padding: '10px',
            background: '#B20000',
            width: 'fit-content',
          }}>
          <Box sx={{ borderRadius: '5px' }}>
            <Box>
              <Box>
                {plansInfoValues?.map((item, index) => {
                  return (
                    <PlansContainer
                      key={index}
                      planData={item}
                      displayBorder={
                        index === plansInfoValues.length - 1 ? true : false
                      }
                      firstRow={index === 0}
                      lastRow={index === plansInfoValues.length - 1}
                      highlightIndices={highLightPlansIndex}
                      setHighlightedIndex={setHighlightedIndex}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PlansInfoBox;
