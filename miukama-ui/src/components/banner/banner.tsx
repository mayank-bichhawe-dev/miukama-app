import React from 'react';
import { Typography, Box } from '@mui/material';
import styles from './banner.module.css';

interface BannerComponentProps {
  title: string;
  subtitle: string;
  fontSize?: string;
  fontWeight?: number;
}

const Banner: React.FC<BannerComponentProps> = ({
  title,
  subtitle,
  fontSize,
  fontWeight,
}) => (
  <Box
    sx={{
      height: '330px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
      backgroundImage: "url('/banner.png')",
      backgroundColor: '#B20000',
    }}
    className={styles.bannerBox}>
    <Typography
      variant="h1"
      sx={{ fontSize, fontWeight, lineHeight: '54px', marginBottom: '20px' }}>
      {title}
    </Typography>
    <Typography variant="h5" sx={{ lineHeight: '29px' }}>
      {subtitle}
    </Typography>
  </Box>
);

export default Banner;
