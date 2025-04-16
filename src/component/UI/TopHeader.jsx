// src/components/TopHeader.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Logout from "../login/Logout"
import { useNavigate } from 'react-router-dom';    // step 1 
const TopHeader = () => {
 // const navigate = useNavigate();   // step 1



// step 2 


// const logout = () => {
//   if (window.confirm("Are you sure you want to logout?")) {
//     localStorage.removeItem('isLoggedIn');
//     navigate('/');
//   }
// };

  // <button onClick={logout}>Logout</button>
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Gangishetty Prasad
        </Typography>
        <Logout/>

        {/* <button onClick={logout}>Logout</button>   step 3 */}  


      </Toolbar>
    </AppBar>
  );
};

export default TopHeader;
