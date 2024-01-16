import { Box, Container, Typography } from '@mui/material';
import Banner from '../banner/banner';

export default function CommingSoon({
  title,
  withBanner = true,
}: {
  title: string;
  withBanner: boolean;
}) {
  return (
    <>
      {withBanner ? (
        <Banner
          title={title}
          subtitle={`${title} page will be available soon`}
          fontSize="40px"
          fontWeight={600}
        />
      ) : null}
      <Container maxWidth="xl">
        <Box
          sx={{
            padding: '5rem 0',
            textAlign: 'center',
          }}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="body1">
            Please check after some time for this page
          </Typography>
        </Box>
      </Container>
    </>
  );
}
