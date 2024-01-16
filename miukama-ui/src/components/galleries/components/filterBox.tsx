import { Box, Button } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import React from 'react';
import styles from './FilterBox.module.css';

interface FilterBoxProps {
  displayType: 'list' | 'column';
  setDisplayType?: React.Dispatch<React.SetStateAction<'list' | 'column'>>;
}

const FilterBox = ({ displayType, setDisplayType }: FilterBoxProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: '6px',
        justifyContent: 'flex-end',
        backgroundColor: '#571918',
      }}
      className={styles.filter_box}>
      <Button
        size="large"
        sx={{ height: '40px', minWidth: '40px', width: '40px' }}
        onClick={() => setDisplayType && setDisplayType('column')}
        className={displayType === 'column' ? styles.active : ''}>
        <AppsIcon fontSize="large" />
      </Button>
      <Button
        size="large"
        sx={{ height: '40px', minWidth: '40px', width: '40px' }}
        className={displayType === 'list' ? styles.active : ''}
        onClick={() => setDisplayType && setDisplayType('list')}>
        <ListIcon fontSize="large" />
      </Button>
    </Box>
  );
};
export default FilterBox;
