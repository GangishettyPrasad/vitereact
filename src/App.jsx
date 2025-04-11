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
import GitGuide from './component/git/GitDuide';
import JsArrayMethodsDemo from './component/JS/JsArrayMethodsDemo';
import ReactArrayMethods from './component/JS/ReactArrayMethods';
import SpreadOperatorGuide from './component/JS/SpreadOperatorGuide';
import MapMethodGuide from './component/JS/MapMethodGuide';
import FilterGuide from './component/JS/FilterGuide';
import DestructuringGuide from './component/JS/DestructuringGuide';
import SpreadOperatorGuidee from './component/JS/SpreadOperatorGuidee';
import ArraysGuide from './component/JS/ArraysGuide';
import JSObjectsGuide from './component/JS/JSObjectsGuide';
import FunctionsGuide from './component/JS/FunctionsGuide';
import NestedArraysWithObjects from './component/JS/NestedArraysWithObjects';
import EventsGuide from './component/JS/EventsGuide';
import NestedArraysWithObjectsGuide from './component/JS/NestedArraysWithObjectsGuide';
import ExecutionContextGuide from './component/JS/ExecutionContextGuide';
import AdvancedCrudGuide from './component/JS/AdvancedCrudGuide';
import ReactStateGuide from './component/JS/ReactStateGuide';
import OptionalChainingGuide from './component/JS/OptionalChainingGuide';
import PromisesAsyncGuide from './component/JS/PromisesAsyncGuide';
import NestedCRUDGuide from './component/JS/NestedCRUDGuide';
import OptionalChainingGuidee from './component/JS/OptionalChainingGuidee';
import NullishCoalescingGuide from './component/JS/NullishCoalescingGuide';
import PromisesAsyncGuidee from './component/JS/PromisesAsyncGuidee';
import AsyncAwaitGuide from './component/JS/AsyncAwaitGuide';
import PromiseChainingGuide from './component/JS/PromiseChainingGuide';
import ReactCoreGuide from './component/JS/ReactCoreGuide';


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
          <Route path="/html" element={ <> <h3>Html Page Still Not Started </h3> <h4>Please Waitt .....</h4></> } />
          <Route path="/css" element={<> <h3>CSS Page Still Not Started </h3> <h4>Please Waitt .....</h4></>} />
          <Route path="/jsx" element={<> <h3>JSX Page Still Not Started </h3> <h4>Please Waitt .....</h4></>} />
          <Route path="/git" element={  <GitGuide />} />

         
          <Route path="*" element={<Navigate to="/" replace />} />
{/* js  */}

          <Route path="JsArrayMethodsDemo" element={  <JsArrayMethodsDemo />} />
          <Route path="ReactArrayMethods" element={  <ReactArrayMethods />} />
          <Route path="SpreadOperatorGuide" element={  <SpreadOperatorGuide />} />
          <Route path="MapMethodGuide" element={  <MapMethodGuide />} />
          <Route path="FilterGuide" element={  <FilterGuide />} />
          <Route path="DestructuringGuide" element={  <DestructuringGuide />} />
          <Route path="SpreadOperatorGuidee" element={  <SpreadOperatorGuidee />} />
          <Route path="ArraysGuide" element={  <ArraysGuide />} />
          <Route path="JSObjectsGuide" element={  <JSObjectsGuide />} />
          <Route path="FunctionsGuide" element={  <FunctionsGuide />} />
          <Route path="NestedArraysWithObjects" element={  <NestedArraysWithObjects />} />
          <Route path="EventsGuide" element={  <EventsGuide />} />
          <Route path="NestedArraysWithObjectsGuide" element={  <NestedArraysWithObjectsGuide />} />
          <Route path="ExecutionContextGuide" element={  <ExecutionContextGuide />} />
          <Route path="ReactStateGuide" element={  <ReactStateGuide />} />
          <Route path="AdvancedCrudGuide" element={  <AdvancedCrudGuide />} />
          <Route path="OptionalChainingGuide" element={  <OptionalChainingGuide />} />
          <Route path="PromisesAsyncGuide" element={  <PromisesAsyncGuide />} />
          <Route path="NestedCRUDGuide" element={  <NestedCRUDGuide />} />
          <Route path="OptionalChainingGuidee" element={  <OptionalChainingGuidee />} />
          <Route path="NullishCoalescingGuide" element={  <NullishCoalescingGuide />} />
          <Route path="PromisesAsyncGuidee" element={  <PromisesAsyncGuidee />} />
          <Route path="AsyncAwaitGuide" element={  <AsyncAwaitGuide />} />
          <Route path="PromiseChainingGuide" element={  <PromiseChainingGuide />} />
          <Route path="ReactCoreGuide" element={  <ReactCoreGuide />} />
          
            
          
        </Routes>
       
      </Layout>
    </Router>
  );
}

export default App;


