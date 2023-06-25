import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <List>
        {['Home', 'Donation', 'Tracking', 'Certification', 'Donation Interative'].map((text, index) => (
          <ListItem button key={text} component={Link} to={index === 0 ? '/' : `/${text.toLowerCase()}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
