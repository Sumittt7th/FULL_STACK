import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <>
    
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Box textAlign="center">
          <Typography variant="h3" gutterBottom>
            Welcome to MyWebsite!
          </Typography>
          <Typography variant="h6" paragraph>
            This is the homepage. You can add more content here, such as features, updates, or news about your website.
          </Typography>
          
          <Button variant="contained" color="primary" href="/about">
            Learn More About Us
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
