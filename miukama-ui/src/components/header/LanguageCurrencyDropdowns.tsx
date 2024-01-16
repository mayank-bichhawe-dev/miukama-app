import React from 'react';
import { languageList } from './headerConfiguration';
import { MenuList } from '@/interfaces/menu';
import MenuSelect from '../MenuSelect';
import { Box } from '@mui/material';

interface LanguageCurrencyDropdownsProps {
  preferredLng: string;
}

const LanguageCurrencyDropdowns: React.FC<LanguageCurrencyDropdownsProps> = ({
  preferredLng,
}) => {
  // const [selectCurrency] = React.useState<MenuList[]>(currencyList);
  const [selectLanguage] = React.useState<MenuList[]>(languageList);

  return (
    <>
      <Box
        sx={{
          flexGrow: 0,
          mt: 'auto',
          mb: 'auto',
          display: { xs: 'none', md: 'flex' },
        }}>
        <MenuSelect selectItem={selectLanguage} preferredLng={preferredLng} />
      </Box>
      <Box
        sx={{
          height: '1.8rem',
          mt: 'auto',
          mb: 'auto',
          // borderLeft: '1px solid #717171',
          display: { xs: 'none', md: 'flex' },
        }}
      />
      <Box
        sx={{
          flexGrow: 0,
          mt: 'auto',
          mb: 'auto',
          pl: '.5rem',
          display: { xs: 'none', md: 'flex', ml: '10px' },
        }}>
        {/* <MenuSelect selectItem={selectCurrency} preferredLng={preferredLng} /> */}
      </Box>
    </>
  );
};

export default LanguageCurrencyDropdowns;
