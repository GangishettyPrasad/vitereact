// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './component/Layout';
import Home from './component/Home';
import Settings from './component/Settings';
import Component_react from './component/react/Component_react';
import Propsreact from './component/Propsreact';
import ReactDataTable from './component/reactdatatable/ReactDataTable';


function App() {
  document.title = "Prasad";
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" defalut element={<Home />} />
          <Route path="/Propsreact" element={<Propsreact />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/componentreact" element={ <Component_react />} />
          <Route path="/reactdatatable" element={<ReactDataTable />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
       
      </Layout>
    </Router>
  );
}

export default App;
