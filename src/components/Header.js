import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import cabemarLogo from "../cabemar_logo-removebg.png";

function Header({ onMenuClick, loggedIn, account }) {
  return (
    <AppBar position="static" style={{ zIndex: 1300 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <img
          src={cabemarLogo}
          alt="Cabemar Logo"
          style={{ width: "40px", height: "40px", marginRight: "8px" }}
        />
        <Typography variant="h6" component="div">
          OceanLocks
        </Typography>
        {loggedIn && (
          <Typography
            variant="body1"
            color="inherit"
            sx={{ marginLeft: "auto", marginRight: "8px" }}
          >
            Olá, {account}!
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
