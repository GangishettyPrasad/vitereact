// src/components/TopHeader.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const TopHeader = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Gangishetty Prasad
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopHeader;
