// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './component/UI/Layout';
import Component_react from './component/react/component/Component_react';
import Propsreact from './component/react/component/Propsreact';
import ReactDataTable from './component/reactdatatable/ReactDataTable';

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

import ShoppingCartt from './component/Notes_Documentation/ShoppingCart';
import ExampleComponent from './component/Notes_Documentation/ExampleComponent';
import ArrayMethodsDeepGuide from './component/Notes_Documentation/ArrayMethodsDeepGuide';
import ModulesGuideUI from './component/Notes_Documentation/ModulesGuideUI';
import GitDailyWorkflowGuide from './component/Notes_Documentation/GitDailyWorkflowGuide';
import Login from './component/login/Login';
import ProtectedRoute from './component/login/ProtectedRoute';
import LoginWithGuide from './component/Notes_Documentation/LoginWithGuide';
import Rlogin from './component/login/Rlogin';
import RProtectedRoute from './component/login/RProtectedRoute';
import dashboardRoutes from './component/dashboardRoutes';
import Authentication from './component/Notes_Documentation/Authentication';
import RoleBasedRoutingGuide from './component/Notes_Documentation/RoleBasedRoutingGuide';
import MRoleBasedRoutingGuide from './component/Notes_Documentation/MRoleBasedRoutingGuide';
import LoginPageGuide from './component/Notes_Documentation/LoginPageGuide';
import ProtectedRouteGuide from './component/Notes_Documentation/ProtectedRouteGuide';
import AppJSGuide from './component/Notes_Documentation/AppJSGuide';
import DynamicRoutesGuide from './component/Notes_Documentation/DynamicRoutesGuide';
import Redux from './component/Redux/Redux';
import ReduxR from './component/Redux/Redux';
import JsonConcepts from './component/Notes_Documentation/JsonConcepts';
import JSMethods from './component/Notes_Documentation/JSMethods';
import StringMethodss from './component/Notes_Documentation/StringMethodss';
import ObjtMethods from './component/Notes_Documentation/ObjMethods';
import DateM from './component/Notes_Documentation/DateM';
import AsynchronousMethods from './component/Notes_Documentation/AsynchronousMethods';
import ErrorHandling from './component/Notes_Documentation/ErrorHandling';
import ClosureExample from './component/Notes_Documentation/ClosureExample';
import HoistingExample from './component/Notes_Documentation/HoistingExample';
import EventLoopExample from './component/Notes_Documentation/EventLoopExample';
import MediaHandlingExample from './component/Notes_Documentation/MediaHandlingExample';
import MediaHandlingExample1 from './component/Notes_Documentation/MediaHandlingExample1';
import ContentTypeHandlingExample from './component/Notes_Documentation/ContentTypeHandlingExample';
import ContentTypeHandlingExample1 from './component/Notes_Documentation/ContentTypeHandlingExample1';
import APIExample from './component/Notes_Documentation/APIExamplee';
import APIExamplee from './component/Notes_Documentation/APIExamplee';
import EmployeeManagement from './component/Notes_Documentation/EmployeeManagement';
import VoiceManager from './component/Notes_Documentation/VoiceManager';
import VoiceManager1 from './component/Notes_Documentation/VoiceManager1';
import SentimentAnalysis from './component/Notes_Documentation/SentimentAnalysis';
import ImageFetchingExample from './component/Notes_Documentation/ImageFetchingExample';
import FileUploadExample from './component/Notes_Documentation/FileUploadExample';
import MediaPlayer from './component/Notes_Documentation/MediaPlayer';
import TokenLogin from './component/Notes_Documentation/TokenLogin';
import TextAnalysis from './component/Notes_Documentation/TextAnalysis';
import ImageRecognitio from './component/Notes_Documentation/ImageRecognitio';
import SpeechRecognition from './component/Notes_Documentation/SpeechRecognition';
import TextToSpeech from './component/Notes_Documentation/TextToSpeech';
import TextTranslation from './component/Notes_Documentation/TextTranslation';
import ThirdPartyAPI from './component/Notes_Documentation/ThirdPartyAPI';
import Weatherr from './component/Notes_Documentation/Weatherr';
import GoogleAuthh from './component/Notes_Documentation/GoogleAuthh';
import SimpleFlatJsonObject from './component/Notes_Documentation/SimpleFlatJsonObject';
import ArrayOfJsonObjects from './component/Notes_Documentation/ArrayOfJsonObjects';
import NestedJsonObject from './component/Notes_Documentation/NestedJsonObject';
import ArrayOfNestedJsonObjects from './component/Notes_Documentation/ArrayOfNestedJsonObjects';
import ComplexNestedJsonWithTable from './component/Notes_Documentation/ComplexNestedJsonWithTable';
import JsonWithArrayInObject from './component/Notes_Documentation/JsonWithArrayInObject';
import ArrayOfJsonObject from './component/Notes_Documentation/ArrayOfJsonObject';
import NestedArraysAndObjects from './component/Notes_Documentation/NestedArraysAndObjects';
import PaginatedJsonTable from './component/Notes_Documentation/PaginatedJsonTable';
import AuditLogTable from './component/Notes_Documentation/AuditLogTable';
import AuditLogWithNestedData from './component/Notes_Documentation/AuditLogWithNestedData';
import ProductCrud from './component/Notes_Documentation/ProductCrud';
import BankTransactionCrud from './component/Notes_Documentation/BankTransactionCrud';
import ChatMessageCrud from './component/Notes_Documentation/ChatMessageCrud';




function App() {
  document.title = "Prasad";
  return (
  
    <Router>
      <Routes>

        {/* NORMAL USER  */}


        {/* <Route path="/"  element={<Login />} />   */}  
        {/* <Route path="/dashboard"  element={<ProtectedRoute><Layout /></ProtectedRoute>} > */}
        
        {/* <Route path="/dashboard"  element={<RProtectedRoute><Layout /></RProtectedRoute>} >

           html  
          <Route path="html" element={<> <h3>Html Page Still Not Started </h3> <h4>Please Waitt .....</h4></>} />
          
          React 
          <Route path="myTabs" element={<MyTabs />} /> </Route> */}

          
      
        {/* MULTIPLE USERS  */}
        <Route path="/"  element={<Rlogin />} /> 

        
        {/* 🚫 Unauthorized Page */}
        <Route path="/unauthorized" element={<h2>🚫 Access Denied</h2>} />

        
        {/* 🛡️ Protected Dashboard (admin + user) */}
        <Route  path="/dashboard"  element={ <RProtectedRoute allowedRoles={['admin', 'user']}>
                                                <Layout />
                                             </RProtectedRoute>  } >


        {/* 📚 Common Routes (both admin & user) */}


        <Route path="jsx" element={<> <h3>JSX Page Still Not Started </h3> <h4>Please Waitt .....</h4></>} /> 
        <Route path="Authentication" element={<Authentication />} />

        {/* 👤 User-only Page */}


        <Route path="html"  element={
                                      <RProtectedRoute allowedRoles={['user']}>
                                      <> <h3>HTML USER Page Still Not Started </h3> <h4>Please Waitt .....</h4></>
                                      </RProtectedRoute>
                                    } />

          {/* 👑 Admin-only Pages */}

          <Route  path="css"  element={
                                        <RProtectedRoute allowedRoles={['admin']}>
                                        <> <h3>CSS ADMIN Page Still Not Started </h3> <h4>Please Waitt .....</h4></>
                                        </RProtectedRoute>
                                        }  />   
                 

          {/* Auto load routes from config */}

          {dashboardRoutes.map(({ path, element, roles }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <RProtectedRoute allowedRoles={roles}>
                  {element}
                </RProtectedRoute>
              }
            />
          ))}


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

            <Route path="GitDailyWorkflowGuide" element={  <GitDailyWorkflowGuide />} /> 
            <Route path="LoginWithGuide" element={  <LoginWithGuide />} /> 
            <Route path="RoleBasedRoutingGuide" element={  <RoleBasedRoutingGuide />} /> 
            <Route path="MRoleBasedRoutingGuide" element={  <MRoleBasedRoutingGuide />} /> 
            <Route path="LoginPageGuide" element={  <LoginPageGuide />} /> 
            <Route path="ProtectedRouteGuide" element={  <ProtectedRouteGuide />} /> 
            <Route path="AppJSGuide" element={  <AppJSGuide />} /> 
            <Route path="DynamicRoutesGuide" element={  <DynamicRoutesGuide />} /> 

            <Route path="ReduxR" element={  <ReduxR />} /> 
            <Route path="JsonConcepts" element={  <JsonConcepts />} /> 

            <Route path="JSMethods" element={  <JSMethods />} /> 

            <Route path="StringMethodss" element={  <StringMethodss />} /> 
            <Route path="ObjtMethods" element={  <ObjtMethods />} /> 
            <Route path="DateM" element={  <DateM />} /> 
            <Route path="AsynchronousMethods" element={  <AsynchronousMethods />} /> 
            <Route path="ErrorHandling" element={  <ErrorHandling />} /> 
            <Route path="Closure" element={  <ClosureExample />} /> 
            <Route path="HoistingExample" element={  <HoistingExample />} /> 
            <Route path="EventLoopExample" element={  <EventLoopExample />} /> 
            <Route path="MediaHandlingExample" element={  <MediaHandlingExample />} /> 
            <Route path="MediaHandlingExample1" element={  <MediaHandlingExample1 />} /> 
            <Route path="ContentTypeHandlingExample" element={  <ContentTypeHandlingExample />} /> 

            <Route path="ContentTypeHandlingExample1" element={  <ContentTypeHandlingExample1 />} /> 

            <Route path="APIExamplee" element={  <APIExamplee />} /> 
            <Route path="EmployeeManagement" element={  <EmployeeManagement />} /> 
            <Route path="VoiceManager" element={  <VoiceManager />} /> 
            <Route path="VoiceManager1" element={  <VoiceManager1 />} /> 
            <Route path="SentimentAnalysis" element={  <SentimentAnalysis />} /> 
            <Route path="ImageFetchingExample" element={  <ImageFetchingExample />} /> 

            <Route path="FileUploadExample" element={  <FileUploadExample />} /> 
            <Route path="MediaPlayer" element={  <MediaPlayer />} /> 
           
            <Route path="TokenLogin" element={  <TokenLogin />} /> 
            <Route path="TextAnalysis" element={  <TextAnalysis />} /> 
            <Route path="ImageRecognitio" element={  <ImageRecognitio />} /> 
            <Route path="SpeechRecognition" element={  <SpeechRecognition />} /> 
    
            <Route path="TextToSpeech" element={  <TextToSpeech />} /> 
            <Route path="TextTranslation" element={  <TextTranslation />} /> 
            <Route path="ThirdPartyAPI" element={  <ThirdPartyAPI />} /> 

            <Route path="GoogleAuthh" element={  <GoogleAuthh />} /> 
           
{/* json data !!!! below */}



            <Route path="SimpleFlatJsonObject" element={  <SimpleFlatJsonObject />} /> 
            <Route path="ArrayOfJsonObjects" element={  <ArrayOfJsonObjects />} /> 
            <Route path="NestedJsonObject" element={  <NestedJsonObject />} /> 
            <Route path="ArrayOfNestedJsonObjects" element={  <ArrayOfNestedJsonObjects />} /> 
            <Route path="ComplexNestedJsonWithTable" element={  <ComplexNestedJsonWithTable />} /> 
            <Route path="JsonWithArrayInObject" element={  <JsonWithArrayInObject />} /> 
            <Route path="ArrayOfJsonObject" element={  <ArrayOfJsonObject />} /> 
            <Route path="NestedArraysAndObjects" element={  <NestedArraysAndObjects />} /> 
            <Route path="PaginatedJsonTable" element={  <PaginatedJsonTable />} /> 
            <Route path="ProductCrud" element={  <ProductCrud />} /> 
            <Route path="BankTransactionCrud" element={  <BankTransactionCrud />} /> 
            <Route path="AuditLogTable" element={  <AuditLogTable />} /> 
            <Route path="AuditLogWithNestedData" element={  <AuditLogWithNestedData />} /> 
            
            <Route path="ChatMessageCrud" element={  <ChatMessageCrud />} /> 
            
            
            
       
          {/* html  */}
           {/* <Route path="html" element={<> <h3>Html Page Still Not Started </h3> <h4>Please Waitt .....</h4></>} /> */}
          {/* css  */} 
           {/* <Route path="css" element={<> <h3>CSS Page Still Not Started </h3> <h4>Please Waitt .....</h4></>} /> */}
          {/* js */}   
           {/* <Route path="jsindex" element={<Index />} />  */}
          {/* jsx */}  
           
          {/* GIT */}  
           {/* <Route path="git" element={  <GitGuide />} />  */}
          {/* React */} 
          {/* <Route path="myTabs" element={<MyTabs />} /> */}
 
            {/* REACT  */}
            {/* <Route path="Propsreact" element={<Propsreact />} />
            <Route path="componentreact" element={<Component_react />} />
            <Route path="reactdatatable" element={<ReactDataTable />} />
            <Route path="reacthookform" element={<ReactHookForm />} />  */}
           
           {/* <Route path="/" element={<DefaultHome />} /> ✅ Default Route */}


        </Route>
      
        </Routes>    
    
    </Router>
  );
}

export default App;


