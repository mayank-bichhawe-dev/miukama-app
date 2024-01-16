import React, { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { SelectPlanProps } from '@/interfaces/plans';
import { selectBuyPlan } from '@/api/planApi/plan';
import { UserLoginContext } from '@/app/[lng]/layout';

const SelectPlan: React.FC<SelectPlanProps> = ({ plans }) => {
  const { setAlertMessages, alertMessages } = useContext(UserLoginContext);
  const handleBuyPlan = async (planId: number, planType: string) => {
    const data = await selectBuyPlan(planId, planType);
    setAlertMessages([
      ...alertMessages,
      { type: data.data.success, message: data.data.message },
    ]);
    setTimeout(() => {
      setAlertMessages([]);
    }, 2000);
  };
  return (
    <>
      {plans?.map((plan, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Box>
              <Typography
                variant="body1"
                sx={{ lineHeight: '20px', paddingBottom: '5px' }}>
                {plan.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, fontSize: '18px', lineHeight: '22px' }}>
                {plan.planCost}
              </Typography>
              <Button
                onClick={() => handleBuyPlan(plan.planId, plan.planType)}
                variant="contained"
                sx={{
                  marginTop: '13px',
                  fontSize: '12px',
                  fontWeight: '400',
                  lineHeight: '15px',
                  borderRadius: '5px',
                  padding: '10px 0px 10px 0px',
                  width: '100%',
                  minWidth: '100px',
                  textTransform: 'none',
                }}>
                {plan.buttonText}
              </Button>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default SelectPlan;
