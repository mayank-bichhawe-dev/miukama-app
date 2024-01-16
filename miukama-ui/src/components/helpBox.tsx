import React, { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { UserLoginContext } from '@/app/[lng]/layout';

const HelpBox = () => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);

  return (
    <Box
      sx={{
        textAlign: 'center',
        background: 'linear-gradient(to top,#000000 90%,transparent 90% 100%)',
        p: '20px',
        pt: 0,
      }}>
      <img
        src="/help-circle.png"
        style={{
          background: '#fff',
          borderRadius: '50%',
          marginBottom: '14px',
        }}
      />
      <Typography variant="body2">Need Help with Miukama?</Typography>
      <Button
        onClick={() => router.push(`${langugeRoute}/contactUs`)}
        size="small"
        sx={{
          textTransform: 'none',
          padding: '12px 24px',
          border: '1.193px solid #FFF',
          mt: '23px',
        }}>
        Go to help center
      </Button>
    </Box>
  );
};
export default HelpBox;
