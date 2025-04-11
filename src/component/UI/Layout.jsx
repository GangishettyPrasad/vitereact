// src/components/Layout.js
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import TopHeader from './TopHeader';
import SideNav from './SideNav';

const drawerWidth = 240;

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TopHeader />
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${70}px`,
          marginTop: '64px', // height of AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
