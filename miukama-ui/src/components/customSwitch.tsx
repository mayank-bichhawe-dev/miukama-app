import React from 'react';
import { Stack, Switch, Typography, styled } from '@mui/material';
import Chip from '@mui/material/Chip';
import { CustomSwitchProp } from '@/interfaces/plans';

const CustomSwitch = ({ setIsYear, isYear }: CustomSwitchProp) => {
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 51,
    height: 21,
    padding: 0,
    display: 'flex',
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(30px)',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#093629',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      color: '#fff',
      width: 17,
      height: 17,
    },
    '& .MuiSwitch-track': {
      borderRadius: '50px',
      opacity: 1,
      backgroundColor: '#093629',
      boxSizing: 'border-box',
    },
  }));
  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsYear(event.target.checked);
  };
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      paddingTop="44px"
      position="relative">
      <Typography variant="subtitle1">Monthly</Typography>
      <AntSwitch
        checked={isYear || false}
        inputProps={{ 'aria-label': 'ant design' }}
        onChange={handelChange}
      />
      <Typography>Yearly</Typography>
      <Chip
        sx={{
          position: 'absolute',
          top: '50%',
          left: '100%',
          borderRadius: '2px',
          height: '20px',
          '& .MuiChip-label': {
            pl: '4px',
            pr: '4px',
          },
          bgcolor: '#B20000',
          fontSize: '12px',
          fontWeight: 400,
        }}
        label="30% Discount"
      />
    </Stack>
  );
};

export default CustomSwitch;
