import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

import ReactIndex from './react/ReactIndex';
import ReactDataTable from './reactdatatable/ReactDataTable';
import ReactHookForm from './UseForm/ReactHookForm';

function MyTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="React" />
        <Tab label="React Data Table" />
        <Tab label="React Form" />
      </Tabs>

      {value === 0 && <TabPanel>  <ReactIndex/></TabPanel>}
      {value === 1 && <TabPanel>   <ReactDataTable/></TabPanel>}
      {value === 2 && <TabPanel> <ReactHookForm/></TabPanel>}
    </Box>
  );
}

function TabPanel({ children }) {
  return (
    <Box p={2}>
      <Typography component="div">{children}</Typography>
    </Box>
  );
}

export default MyTabs;
