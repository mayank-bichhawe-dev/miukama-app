import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import FilterBox from './filterBox';

interface SearchRowProps {
  displayType?: 'list' | 'column';
  setDisplayType?: React.Dispatch<React.SetStateAction<'list' | 'column'>>;
  children: React.ReactNode;
  buttonLink?: string;
  buttonTitle?: string;
  hideButton?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClickAdd?: (value: string) => void;
}

const SearchRow = ({
  displayType,
  setDisplayType,
  children,
  buttonLink,
  buttonTitle,
  hideButton = false,
  onClickAdd,
}: SearchRowProps) => {
  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      rowSpacing={3}
      sx={{ marginTop: '0px' }}>
      <Grid item xs={12} sm={8} md={8}>
        {children}
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {displayType && (
            <FilterBox
              displayType={displayType}
              setDisplayType={setDisplayType}
            />
          )}
          {!hideButton ? (
            <Button
              variant="outlined"
              size="small"
              sx={{
                ml: '22px',
                color: '#fff',
                textTransform: 'inherit',
                whiteSpace: 'nowrap',
              }}
              onClick={() => onClickAdd && onClickAdd(buttonLink as string)}>
              <AddIcon />
              {buttonTitle}
            </Button>
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
};
export default SearchRow;
