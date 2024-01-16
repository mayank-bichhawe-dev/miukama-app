import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

export default function FieldLayout({
  children,
  label,
  error = '',
  showError = false,
  noMargin = false,
}: {
  children: ReactNode;
  label: string;
  error?: string;
  showError?: boolean;
  noMargin?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: '1.25rem auto',
        gap: '.625rem',
        marginBottom: noMargin ? '0rem' : '1rem',
      }}>
      <Typography component="label" variant="body1">
        {label}
      </Typography>
      {children}
      {error && showError ? (
        <Typography variant="caption" color="#B20000">
          {error}
        </Typography>
      ) : null}
    </Box>
  );
}
