import { Box, Typography } from '@mui/material';

export default function HomePageTitle({
  title,
  uppercase,
}: {
  title: string;
  uppercase: boolean;
}) {
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          textTransform: uppercase ? 'uppercase' : 'none',
          marginBottom: '28px',
          fontSize: '42px',
          lineHeight: '56px',
        }}>
        {title}
      </Typography>
      <Box
        sx={{
          height: '2px',
          background:
            'linear-gradient(to right, #A01117 20%, #FFFFFF 20% 100%)',
        }}
      />
    </>
  );
}
