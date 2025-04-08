// src/components/SideNav.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { Settings } from '@mui/icons-material';
import { ListItemButton } from '@mui/material';

const drawerWidth = 240;

const SideNav = () => {
  const menuItems = [
    { text: 'React', path: '/', icon: <HomeIcon /> },
   
    { text: 'JavaScript', path: '/settings', icon: <Settings /> },
  
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
          <ListItemButton component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNav;
