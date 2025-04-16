// src/components/Layout.js
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import TopHeader from './TopHeader';
import SideNav from './SideNav';
import { Outlet } from 'react-router-dom'; // 👈 import Outlet

const drawerWidth = 240;

const Layout = () => {
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
        <Outlet /> {/* 👈 This renders the nested route components */}
      </Box>
    </Box>
  );
};

export default Layout;
