import { Box, Paper, Typography, Button } from '@mui/material';

export default function CarouselCard(props: {
  item: { imgName: string; title: string; description: string };
}) {
  const { imgName, title, description } = props.item;
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="row"
      sx={{
        width: 410,
        height: 550,
        backgroundImage: `url(/${imgName})`,
        backgroundSize: 'cover',
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
            <Button variant="outlined" color="secondary" size="small">
              Read Article
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
