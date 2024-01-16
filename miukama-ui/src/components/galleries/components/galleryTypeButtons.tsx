import { Box, Button } from '@mui/material';
import React from 'react';
import { KeyPrefix, TFunction } from 'i18next';

interface GalleryTypeButtonsProps {
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

const GalleryTypeButtons = ({
  t,
  isPrivate,
  setIsPrivate,
}: GalleryTypeButtonsProps) => {
  const galleryStyle = {
    display: 'flex',
    paddingTop: '32px',
    paddingBottom: '32px',
    justifyContent: 'flex-end',
  };

  return (
    <Box sx={galleryStyle}>
      <Button
        size="small"
        variant={isPrivate ? 'outlined' : 'contained'}
        color={isPrivate ? 'secondary' : 'primary'}
        sx={{ ml: '24px', textTransform: 'inherit' }}
        onClick={() => setIsPrivate(false)}>
        {t('gallery.button.public')}
      </Button>
      <Button
        variant={isPrivate ? 'contained' : 'outlined'}
        size="small"
        onClick={() => setIsPrivate(true)}
        color={isPrivate ? 'primary' : 'secondary'}
        sx={{ ml: '1rem', textTransform: 'inherit' }}>
        {t('gallery.button.private')}
      </Button>
    </Box>
  );
};
export default GalleryTypeButtons;
