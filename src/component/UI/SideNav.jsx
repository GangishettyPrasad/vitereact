// src/components/SideNav.js
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  ListItemButton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import { PiFileJsxBold } from "react-icons/pi";
import { FaSquareJs } from "react-icons/fa6";
import { RiReactjsFill } from "react-icons/ri";
import { FaGit } from "react-icons/fa6";

const drawerWidth = 240;

const SideNav = () => {
  const menuItems = [
    { text: 'HTML', path: '/dashboard/html', icon: <FaSquareJs /> },
    { text: 'CSS', path: '/dashboard/css', icon: <FaSquareJs /> },
    { text: 'JavaScript', path: '/dashboard/jsindex', icon: <FaSquareJs /> },
    { text: 'JSX', path: '/dashboard/jsx', icon: <PiFileJsxBold /> },
    { text: 'React', path: '/dashboard/mytabs', icon: <RiReactjsFill /> },
    { text: 'GIT', path: '/dashboard/git', icon: <FaGit /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  '&.active': {
                    backgroundColor: '#e0e0e0', // Active tab background
                    fontWeight: 'bold',         // Optional: bold text
                    borderLeft: '4px solid #1976d2', // Optional: left border
                    color: '#1976d2', // Optional: change text color
                  },
                }}
              >
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
