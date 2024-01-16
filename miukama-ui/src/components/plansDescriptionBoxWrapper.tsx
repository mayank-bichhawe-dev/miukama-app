import React from 'react';
import { Box } from '@mui/material';
import PlansDescriptionBox from './plansDescriptionBox/PlansContainer';

const PlansDescriptionBoxWrapper = () => {
  const PlansData = [
    {
      description:
        'Individual hobbyist who likes to create list of equipments what he/she owns',
      categories: 'Pre-Defined',
      items: '100',
      users: '1 x user account',
      galleries: 'Private Gallery',
      loanInformation: false,
      valueFields: false,
      wishlist: false,
      marketplace: false,
    },
    {
      description:
        'Collector, who wants to define the value and categories to items he/she is collecting',
      categories: 'Pre Defined + Own',
      items: '1000',
      users: '1 x user account',
      galleries: 'Private & Public Gallery',
      loanInformation: false,
      valueFields: true,
      wishlist: true,
      marketplace: true,
    },
    {
      description:
        'Museum with basic level of catalog items. Several users can be allocated to use the collection',
      categories: 'Pre Defined + Own',
      items: '2000',
      users: '3 x user account',
      galleries: 'Private & Public Gallery',
      loanInformation: true,
      valueFields: true,
      wishlist: true,
      marketplace: true,
    },
    {
      description:
        "Museum with significant amount of catalog items. Possibilities to use API's to get cataloged items used at other services",
      categories: 'Pre Defined + Own',
      items: '5000',
      users: 'teams up to 20 users',
      galleries: 'Private & Public Gallery',
      loanInformation: true,
      valueFields: true,
      wishlist: true,
      marketplace: true,
    },
    {
      description:
        'Musem with significant amount of catelog items. Possibility to use different user levels and all options what the system has.',
      categories: 'Pre Defined + Own',
      items: '5000+',
      users: 'Pre Defined',
      galleries: 'Private & Public Gallery',
      loanInformation: true,
      valueFields: true,
      wishlist: true,
      marketplace: true,
    },
  ];

  const moduleName = {
    description: 'Description',
    categories: 'Categories',
    items: 'Items',
    users: 'Users',
    galleries: 'Galleries',
    loanInformation: 'Loan Information',
    valueFields: 'value Fields',
    wishlist: 'Wishlist',
    marketplace: 'Market Place',
  };

  return (
    <Box
      padding="9px"
      borderRadius="5px"
      sx={{ backgroundColor: '#B20000', display: 'inherit' }}>
      <Box padding="20px">
        {/* <PlansDescriptionBox planData={moduleName} highLight /> */}
      </Box>
      <Box sx={{ background: '#FFFFFF', borderRadius: '5px' }}>
        <Box sx={{ display: 'flex', padding: '22px 19px 22px 19px' }}>
          {/* {PlansData.map((data, index) => {
            return <PlansDescriptionBox key={index} planData={data} />;
          })} */}
        </Box>
      </Box>
    </Box>
  );
};

export default PlansDescriptionBoxWrapper;
