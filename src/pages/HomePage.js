import React from 'react';
import Box from '@mui/system/Box';
import Container from '@mui/material/Container';

function HomePage() {
  return (
    <Container>
    <Box
      sx={{
        position:"fixed",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
      }}
    >
      <img src="https://cdn.midjourney.com/9615a323-ff88-4a4b-af31-8a8bf1c7d51f/0_2.png" alt="Ocean" />
    </Box>
  </Container>

  );
}

export default HomePage;
