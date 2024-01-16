import { Box, Typography } from '@mui/material';
import React from 'react';
import { KeyPrefix, TFunction } from 'i18next';

function CopyrightFooter({
  t,
}: {
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}) {
  return (
    <Box display="flex" justifyContent="center">
      <Typography variant="body2">{t('product.footer')}</Typography>
    </Box>
  );
}

export default CopyrightFooter;
