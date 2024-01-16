'use client';

import { Box, Button, Paper, Typography } from '@mui/material';

export default function CarouselItem({
  imgName,
  title,
  description,
  externalLink,
}: {
  imgName: string;
  title: string;
  description: string;
  externalLink: string;
}) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="row"
      sx={{
        minWidth: 310,
        minHeight: 550,
        height: '100%',
        width: '100%',
        maxWidth: 450,
        mx: 'auto',
        background: "url('" + imgName + "')",
        backgroundSize: '100% 100%',
      }}
      key={imgName}>
      <Box
        height="100%"
        width="90%"
        display="flex"
        justifyContent="end"
        flexDirection="column"
        paddingBottom="10px">
        <Paper
          elevation={3}
          sx={{
            backgroundColor: 'transparent',
            backdropFilter: 'blur(20px)',
            padding: '15px',
            minHeight: '225px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {description}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              href={externalLink}>
              Read Article
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
