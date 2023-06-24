import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


function Header({ onMenuClick }) {
  return (
    <AppBar position="static" style={{ zIndex: 1300 }}>
      <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          OceanLocks
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
