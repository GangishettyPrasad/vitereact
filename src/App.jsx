// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './component/UI/Layout';
import Component_react from './component/react/component/Component_react';
import Propsreact from './component/react/component/Propsreact';
import ReactDataTable from './component/reactdatatable/ReactDataTable';

import { Tabs } from '@mui/material';
import Index from './component/Notes_Documentation/Index';

import ReactHookForm from './component/UseForm/ReactHookForm';
import MyTabs from './component/MyTabs';
import DefaultHome from './component/DefaultHome';
import GitGuide from './component/git/GitDuide';
import JsArrayMethodsDemo from './component/Notes_Documentation/JsArrayMethodsDemo';
import ReactArrayMethods from './component/Notes_Documentation/ReactArrayMethods';
import SpreadOperatorGuide from './component/Notes_Documentation/SpreadOperatorGuide';
import MapMethodGuide from './component/Notes_Documentation/MapMethodGuide';
import FilterGuide from './component/Notes_Documentation/FilterGuide';
import DestructuringGuide from './component/Notes_Documentation/DestructuringGuide';
import SpreadOperatorGuidee from './component/Notes_Documentation/SpreadOperatorGuidee';
import ArraysGuide from './component/Notes_Documentation/ArraysGuide';
import JSObjectsGuide from './component/Notes_Documentation/JSObjectsGuide';
import FunctionsGuide from './component/Notes_Documentation/FunctionsGuide';
import NestedArraysWithObjects from './component/Notes_Documentation/NestedArraysWithObjects';
import EventsGuide from './component/Notes_Documentation/EventsGuide';
import NestedArraysWithObjectsGuide from './component/Notes_Documentation/NestedArraysWithObjectsGuide';
import ExecutionContextGuide from './component/Notes_Documentation/ExecutionContextGuide';
import AdvancedCrudGuide from './component/Notes_Documentation/AdvancedCrudGuide';
import ReactStateGuide from './component/Notes_Documentation/ReactStateGuide';
import OptionalChainingGuide from './component/Notes_Documentation/OptionalChainingGuide';
import PromisesAsyncGuide from './component/Notes_Documentation/PromisesAsyncGuide';
import NestedCRUDGuide from './component/Notes_Documentation/NestedCRUDGuide';
import OptionalChainingGuidee from './component/Notes_Documentation/OptionalChainingGuidee';
import NullishCoalescingGuide from './component/Notes_Documentation/NullishCoalescingGuide';
import PromisesAsyncGuidee from './component/Notes_Documentation/PromisesAsyncGuidee';
import AsyncAwaitGuide from './component/Notes_Documentation/AsyncAwaitGuide';
import PromiseChainingGuide from './component/Notes_Documentation/PromiseChainingGuide';
import ReactCoreGuide from './component/Notes_Documentation/ReactCoreGuide';
import JSXRenderingGuide from './component/Notes_Documentation/JSXRenderingGuide';
import JSXConditionalRenderingGuide from './component/Notes_Documentation/JSXConditionalRenderingGuide';
import PropsGuide from './component/Notes_Documentation/PropsGuide';
import UseStateCompleteGuide from './component/Notes_Documentation/UseStateCompleteGuide';
import FullReactUseStateAndJSXExamples from './component/Notes_Documentation/FullReactUseStateAndJSXExamples';
import UseEffectMasterGuide from './component/Notes_Documentation/UseEffectMasterGuide';
import UseEffectFullVisualDoc from './component/Notes_Documentation/UseEffectFullVisualDoc';
import NestedObjectsWithArrays from './component/Notes_Documentation/NestedObjectsWithArrays';
import NestedObjeExplanation from './component/Notes_Documentation/NestedObjeExplanation';
import NestedArraysWithObjectsGuide_exmp from './component/Notes_Documentation/NestedArraysWithObjectsGuide_exmp';
import NestedArraysInReact from './component/Notes_Documentation/NestedArraysInReact';
import NestedObjInReact from './component/Notes_Documentation/NestedObjInReact';
import VariableDeclarations from './component/Notes_Documentation/VariableDeclarations';
import ArrowFunctionsGuide from './component/Notes_Documentation/ArrowFunctionsGuide';
import TemplateLiteralsGuide from './component/Notes_Documentation/TemplateLiteralsGuide';
import Destructuring from './component/Notes_Documentation/Destructuring';
import SpreadOperatorExample from './component/Notes_Documentation/SpreadOperatorExample';
import { ShoppingCart } from '@mui/icons-material';
import ShoppingCartt from './component/Notes_Documentation/ShoppingCart';
import ExampleComponent from './component/Notes_Documentation/ExampleComponent';
import ArrayMethodsDeepGuide from './component/Notes_Documentation/ArrayMethodsDeepGuide';
import ModulesGuideUI from './component/Notes_Documentation/ModulesGuideUI';



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
          <Route path="JSXRenderingGuide" element={  <JSXRenderingGuide />} />
          <Route path="JSXConditionalRenderingGuide" element={  <JSXConditionalRenderingGuide />} />
          <Route path="PropsGuide" element={  <PropsGuide />} />
          <Route path="UseStateCompleteGuide" element={  <UseStateCompleteGuide />} />
          <Route path="FullReactUseStateAndJSXExamples" element={  <FullReactUseStateAndJSXExamples />} />

          <Route path="UseEffectMasterGuide" element={  <UseEffectMasterGuide />} />
          <Route path="UseEffectFullVisualDoc" element={  <UseEffectFullVisualDoc />} />
          <Route path="NestedObjectsWithArrays" element={  <NestedObjectsWithArrays />} />
          <Route path="NestedObjeExplanation" element={  <NestedObjeExplanation />} />

          <Route path="NestedArraysWithObjectsGuide_exmp" element={  <NestedArraysWithObjectsGuide_exmp />} />
          
          <Route path="NestedArraysInReact" element={  <NestedArraysInReact />} />
          <Route path="NestedObjInReact" element={  <NestedObjInReact />} />
          <Route path="VariableDeclarations" element={  <VariableDeclarations />} />
          <Route path="ArrowFunctionsGuide" element={  <ArrowFunctionsGuide />} />
          <Route path="TemplateLiteralsGuide" element={  <TemplateLiteralsGuide />} />
            
          <Route path="Destructuring" element={  <Destructuring />} />
          <Route path="SpreadOperatorExample" element={  <SpreadOperatorExample />} />
          <Route path="ShoppingCart" element={  <ShoppingCartt />} />
          <Route path="ExampleComponent" element={  <ExampleComponent />} />
          <Route path="ArrayMethodsDeep" element={  <ArrayMethodsDeepGuide />} />
          <Route path="ModulesGuideUI" element={  <ModulesGuideUI />} />

      
                
          
        </Routes>
       
      </Layout>
    </Router>
  );
}

export default App;


