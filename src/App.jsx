// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './component/UI/Layout';
import Component_react from './component/react/component/Component_react';
import Propsreact from './component/react/component/Propsreact';
import ReactDataTable from './component/reactdatatable/ReactDataTable';

import { Tabs } from '@mui/material';
import Index from './component/JS/Index';

import ReactHookForm from './component/UseForm/ReactHookForm';
import MyTabs from './component/MyTabs';
import DefaultHome from './component/DefaultHome';


function App() {
  document.title = "Prasad";
  return (
    <Router>
      <Layout>
        <Routes>

          <Route path="/" element={<DefaultHome />} /> {/* ✅ Default Route */}

          <Route path="/myTabs" element={<MyTabs />} />
          <Route path="/Propsreact" element={<Propsreact />} />
          <Route path="/jsindex" element={<Index />} />
          <Route path="/componentreact" element={<Component_react />} />
          <Route path="/reactdatatable" element={<ReactDataTable />} />
          <Route path="/reacthookform" element={<ReactHookForm />} />
          <Route path="/tabs" element={<Tabs />} />

          <Route path="/html" element={ <> <h3>Html Page Still Not Started </h3> <h4>Please Wait ....</h4></> } />
          <Route path="/css" element={<> <h3>CSS Page Still Not Started </h3> <h4>Please Wait ....</h4></>} />
          <Route path="/jsx" element={<> <h3>JSX Page Still Not Started </h3> <h4>Please Wait ....</h4></>} />
          <Route path="/git" element={<> <h3>GIT Page Still Not Started </h3> <h4>Please Wait ....</h4></>} />

          <Route path="*" element={<Navigate to="/" replace />} />


        </Routes>
       
      </Layout>
    </Router>
  );
}

export default App;
