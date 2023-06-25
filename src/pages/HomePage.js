import React from "react";
import Box from "@mui/system/Box";
import Container from "@mui/material/Container";

function HomePage() {
  return (
    <Container>
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
          backgroundColor: "#86CFD5",
        }}
      ></Box>
    </Container>
  );
}

export default HomePage;
