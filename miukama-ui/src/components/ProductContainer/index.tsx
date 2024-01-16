import { Box, IconButton, Typography } from '@mui/material';
import HomePageTitle from '../titles/HomePageTitle';
import { ReactNode } from 'react';
import FilterBox from '../galleries/components/filterBox';
import React from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

interface ProductContainerProps {
  children: ReactNode;
  title: string;
  displayType?: 'list' | 'column';
  setDisplayType?: React.Dispatch<React.SetStateAction<'list' | 'column'>>;
  isFilterBox?: boolean;
  handleViewall?: () => void;
  ViewAllItem?: boolean;
}

export default function ProductContainer({
  children,
  title,
  displayType,
  setDisplayType,
  isFilterBox = false,
  handleViewall,
  ViewAllItem = false,
}: ProductContainerProps) {
  return (
    <Box
      sx={{
        padding: '3rem 0',
      }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          marginBottom: '4rem',
        }}>
        {title !== '' && (
          <div>
            <HomePageTitle title={title} uppercase={true} />
          </div>
        )}

        {isFilterBox ? (
          <Box display="flex" justifyContent="flex-end">
            <Box height="max-content">
              <FilterBox
                displayType={displayType || 'column'}
                setDisplayType={setDisplayType}
              />
            </Box>
          </Box>
        ) : ViewAllItem ? (
          <Box display="flex" justifyContent="flex-end" paddingTop="1rem">
            <Box height="max-content">
              <Box
                onClick={handleViewall}
                display="flex"
                flexDirection="row"
                alignItems="center"
                whiteSpace="nowrap">
                <Typography sx={{ cursor: 'pointer' }} paddingX=".5rem">
                  View All{' '}
                </Typography>
                <IconButton>
                  <ArrowOutwardIcon fontSize="medium" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ) : (
          ''
        )}
      </Box>
      {children}
    </Box>
  );
}
