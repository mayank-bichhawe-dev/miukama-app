import { Box, Paper, Typography, Grid } from '@mui/material';
import styles from '../signupbanner/SignupBanner.module.css';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../breadcrumbs/breadcrumbs';
import { getContact } from '@/api/contact/contact';
import { ContactProps } from '@/interfaces/contact';

function HelpAndContact() {
  const [contactData, setContactData] = useState<ContactProps[]>([]);

  const getAllContact = async () => {
    const { data } = await getContact();
    if (data.success) {
      setContactData(data.data.rows);
    }
  };
  useEffect(() => {
    getAllContact();
  }, []);

  return (
    <Box paddingBottom="4rem">
      <Breadcrumb title="ContactUs" data={[{ title: 'Home', link: '/' }]} />

      <Grid
        container
        sx={{
          minHeight: 230,
          marginTop: '6rem',
          background: '#B20000',
          backgroundImage: "url('" + 'faqsignup.png' + "')",
        }}>
        <Grid
          item
          xs={6}
          md={9}
          className={styles.content}
          sx={{ paddingLeft: '200px', paddingTop: '70px' }}>
          <Typography variant="h6">Get In Touch With Us</Typography>
          <Typography variant="body2">
            Want to get in touch? We would love to hear from you.Here how you
            can reach us....
          </Typography>
        </Grid>
        <Grid item md={3} xs={6} className={styles.sideImage}>
          <Box className={styles.box2}>
            <img src="/myproject.png" alt="" />
          </Box>
        </Grid>
      </Grid>

      <Box
        height="60%"
        width="100%"
        display="flex"
        justifyContent="space-evenly"
        flexDirection="row">
        {contactData.map((detail, index) => {
          return (
            <Paper
              key={detail.contact}
              elevation={3}
              sx={{
                backgroundColor: 'transparent',
                backdropFilter: 'blur(20px)',
                padding: '15px',
                minHeight: '180px',
                maxWidth: '350px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: '-80px',
              }}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {detail.name}
                </Typography>
                <Box textAlign="center">
                  {' '}
                  {index === 1 ? (
                    <MapsUgcIcon fontSize="large" />
                  ) : (
                    <AddIcCallIcon fontSize="large" />
                  )}
                </Box>
                <Typography variant="body2" gutterBottom>
                  {detail.description}
                </Typography>
              </Box>
              <Typography fontSize="body1">{detail.contact}</Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}

export default HelpAndContact;
