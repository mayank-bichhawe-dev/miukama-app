import { Box, Typography } from '@mui/material';
import React from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const s3ImageBaseUrl = process.env.NEXT_PUBLIC_S3_IMAGE_BASE_URL;

function ImageRowItem({ params }: { params: GridRenderCellParams }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="auto 1fr"
      width="100%"
      alignItems="center"
      columnGap="10px">
      <Box
        sx={{
          textAlign: 'center',
          background:
            'linear-gradient(to top,#000000 65%,transparent 65% 100%)',
          minWidth: '41px',
        }}>
        {params.row.imagePath || params.row.imagePath ? (
          <img
            src={`${s3ImageBaseUrl}${params.row.imagePath}`}
            alt={'product image'}
            height="30px"
            width="27px"
          />
        ) : (
          <DescriptionOutlinedIcon />
        )}
      </Box>
      <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        variant="subtitle1">
        {params.value}
      </Typography>
    </Box>
  );
}

export default ImageRowItem;
