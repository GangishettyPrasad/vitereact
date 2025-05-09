import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import { FcAssistant } from "react-icons/fc";
import { SlPencil } from "react-icons/sl";
const Index = () => {

  

var a = {
  width : '30px',
  height : '30px',
  color : 'yellow',
}

  return (
    <div>
      <h2><FcAssistant style={a}/>JavaScript  </h2>
      <ol>
        <h3>topics <SlPencil style={{color : "blue"}}/> </h3>
      </ol>
      
      <ul>

        <li><Link   to = '/dashboard/ArraysGuide'>Arrays Guide</Link></li>
        <li><Link   to = '/dashboard/NestedArraysWithObjects'>NestedArraysWithObjects</Link></li>
        <li><Link   to = '/dashboard/NestedArraysWithObjectsGuide'>NestedArraysWithObjectsGuide</Link></li>
        <li><Link   to = '/dashboard/NestedArraysWithObjectsGuide_exmp'>NestedArraysWithObjectsGuide_exmp</Link></li>
        <li><Link   to = '/dashboard/NestedArraysInReact'>NestedArraysInReact</Link></li>
        <li><Link   to = '/dashboard/JsArrayMethodsDemo'> Intro Js ArrayMethods </Link></li>
        <li><Link   to = '/dashboard/ReactArrayMethods'>How to Use In React  _ArrayMethods</Link></li>
        <li><Link   to = '/dashboard/MapMethodGuide'>MapMethodGuide</Link></li>
        <li><Link   to = '/dashboard/FilterGuide'>FilterGuide</Link></li>
        <li><Link   to = '/dashboard/ArrayMethodsDeep'>ArrayMethods Reaming</Link></li>

        
<br/><br/>
        <li><Link   to = '/dashboard/JSObjectsGuide'> Objects Guide</Link></li>
        <li><Link   to = '/dashboard/NestedObjeExplanation'>NestedObjeExplanation</Link></li>

        <li><Link   to = '/dashboard/NestedObjectsWithArrays'>NestedObjectsWithArrays</Link></li>
        <li><Link   to = '/dashboard/NestedObjInReact'>NestedObjInReact</Link></li>
<br/><br/> 

        <li><Link   to = '/dashboard/AdvancedCrudGuide'>AdvancedCrudGuide</Link></li>
        <li><Link   to = '/dashboard/NestedCRUDGuide'>NestedCRUDGuide</Link></li>

<br/><br/> 

        <li><Link   to = '/dashboard/FunctionsGuide'>FunctionsGuide</Link></li>
        <li><Link   to = '/dashboard/EventsGuide'>EventsGuide</Link></li>
<br/>
        <li><Link   to = '/dashboard/JsonConcepts'>JsonConcepts</Link></li>

        <li><Link   to = '/dashboard/JSMethods'>JSMethods</Link></li>
<br/>    
      </ul>


      <h2> </h2>


      <h2><FcAssistant style={a}/>JavaScript - ES6 </h2>
      <ol>
        <h3>topics <SlPencil style={{color : "blue"}}/> </h3>
      </ol>
      
      <ul>
      <li><Link   to = '/dashboard/VariableDeclarations'>VariableDeclarations</Link></li>
      <li><Link   to = '/dashboard/ArrowFunctionsGuide'>ArrowFunctionsGuide</Link></li>
      <li><Link   to = '/dashboard/TemplateLiteralsGuide'>TemplateLiteralsGuide</Link></li>

      <li><Link   to = '/dashboard/Destructuring'>Destructuring</Link></li>
 
      <li><Link   to = '/dashboard/SpreadOperatorExample'>SpreadOperatorExample</Link></li>
      <li><Link   to = '/dashboard/ShoppingCart'>ShoppingCart example</Link></li>
      <li><Link   to = '/dashboard/ExampleComponent'>obj literals and enhanced objs</Link></li>

      
      
        <li><Link   to = '/dashboard/SpreadOperatorGuide'>SpreadOperatorGuide</Link></li>
        <li><Link   to = '/dashboard/DestructuringGuide'>DestructuringGuide </Link></li>
        <li><Link   to = '/dashboard/SpreadOperatorGuidee'>SpreadOperatorGuidee</Link></li>

<br/><br/> 
        <li><Link   to = '/dashboard/OptionalChainingGuide'>OptionalChainingGuide</Link></li>
        <li><Link   to = '/dashboard/OptionalChainingGuidee'>OptionalChainingGuidee</Link></li>
        <li><Link   to = '/dashboard/NullishCoalescingGuide'>NullishCoalescingGuide</Link></li>


        <li><Link   to = '/dashboard/ExecutionContextGuide'>ExecutionContextGuide</Link></li>
    
        <li><Link   to = '/dashboard/PromisesAsyncGuide'>PromisesAsyncGuide</Link></li>
        <li><Link   to = '/dashboard/PromisesAsyncGuidee'>PromisesAsyncGuidee</Link></li>
        <li><Link   to = '/dashboard/AsyncAwaitGuide'>AsyncAwaitGuide</Link></li>
        <li><Link   to = '/dashboard/PromiseChainingGuide'>PromiseChainingGuide</Link></li>
        <li><Link   to = '/dashboard/Closure'>Closure</Link></li>
        <li><Link   to = '/dashboard/HoistingExample'>HoistingExample</Link></li>
        <li><Link   to = '/dashboard/EventLoopExample'>EventLoopExample</Link></li>

      

        
      </ul>


      <h2><FcAssistant style={a}/>  React  </h2>
      <ol>
        <h3>topics <SlPencil style={{color : "blue"}}/> </h3>
      </ol>
      
      <ul>
      <li><Link   to = '/dashboard/ReactStateGuide'>ReactStateGuide</Link></li>
      <li><Link   to = '/dashboard/ModulesGuideUI'>ModulesGuideUI</Link></li>

      
        <li><Link   to = '/dashboard/ReactCoreGuide'>ReactCoreGuide</Link></li>
        <li><Link   to = '/dashboard/JSXRenderingGuide'>JSXRenderingGuide</Link></li>
        <li><Link   to = '/dashboard/JSXConditionalRenderingGuide'>JSXConditionalRenderingGuide</Link></li>
        <li><Link   to = '/dashboard/PropsGuide'>PropsGuide</Link></li>
        <li><Link   to = '/dashboard/UseStateCompleteGuide'>UseStateCompleteGuide</Link></li>
        <li><Link   to = '/dashboard/FullReactUseStateAndJSXExamples'>FullReactUseStateAndJSXExamples</Link></li>
        <li><Link   to = '/dashboard/UseEffectMasterGuide'>UseEffectMasterGuide</Link></li>
        <li><Link   to = '/dashboard/UseEffectFullVisualDoc'>UseEffectFullVisualDoc</Link></li>
      <li><Link   to = '/dashboard/GitDailyWorkflowGuide'>GitDailyWorkflowGuide</Link></li>

      </ul>
      <h2><FcAssistant style={a}/>  JSON DATA    </h2>
      <ol>
        <h3>Topics <SlPencil style={{color : "blue"}}/> </h3>
      </ol>
      
      <ul>
      <li><Link   to = '/dashboard/SimpleFlatJsonObject'>SimpleFlatJsonObject</Link></li>
      
     
      
<br/><br/> 
<br/><br/> 
</ul>
      <h2><FcAssistant style={a}/>  Genral   </h2>
      <ol>
        <h3>Topics <SlPencil style={{color : "blue"}}/> </h3>
      </ol>
      
      <ul>
      <li><Link   to = '/dashboard/LoginWithGuide'>LoginWithGuide</Link></li>
      <li><Link   to = '/dashboard/Authentication'>Authentication</Link></li>
      <li><Link   to = '/dashboard/RoleBasedRoutingGuide'>RoleBasedRoutingGuide</Link></li>
      <li><Link   to = '/dashboard/MRoleBasedRoutingGuide'>MRoleBasedRoutingGuide</Link></li>
      <li><Link   to = '/dashboard/LoginPageGuide'>1.LoginPageGuide</Link></li>
      <li><Link   to = '/dashboard/ProtectedRouteGuide'>2.ProtectedRouteGuide</Link></li>
      <li><Link   to = '/dashboard/AppJSGuide'>3.AppJSGuide</Link></li>

      <li><Link   to = '/dashboard/DynamicRoutesGuide'>4.DynamicRoutesGuide</Link></li>
      
<br/><br/> 
<br/><br/> 
      <li><Link   to = '/dashboard/MediaHandlingExample'>MediaHandlingExample</Link></li>
      <li><Link   to = '/dashboard/MediaHandlingExample1'>MediaHandlingExample1</Link></li>
      <li><Link   to = '/dashboard/ContentTypeHandlingExample'>ContentTypeHandlingExample</Link></li>
      <li><Link   to = '/dashboard/ContentTypeHandlingExample1'>ContentTypeHandlingExample1</Link></li>

      <li><Link   to = '/dashboard/APIExamplee'>APIExample</Link></li>

      <li><Link   to = '/dashboard/EmployeeManagement'>EmployeeManagement</Link></li>
       
      <li><Link   to = '/dashboard/VoiceManager'>VoiceManager</Link></li>
      <li><Link   to = '/dashboard/VoiceManager1'>VoiceManager1</Link></li>
      
     apis AI /ML 

     <li><Link   to = '/dashboard/SentimentAnalysis'>SentimentAnalysis</Link></li>

     <li><Link   to = '/dashboard/ImageFetchingExample'>ImageFetchingExample</Link></li>
     <li><Link   to = '/dashboard/FileUploadExample'>FileUploadExample</Link></li>
     <li><Link   to = '/dashboard/MediaPlayer'>MediaPlayer</Link></li>

     <li><Link   to = '/dashboard/TokenLogin'>TokenLogin</Link></li>
   
      <>1. Text-based APIs (NLP - Sentiment Analysis)    </> 
       <li><Link   to = '/dashboard/TextAnalysis'>TextAnalysis</Link></li>
      <>2. Image Recognition APIs (Clarifai) </>
      <li><Link   to = '/dashboard/ImageRecognitio'>ImageRecognitio</Link></li>
      <>3. Speech Recognition APIs (Google Speech-to-Text)</>
      <li><Link   to = '/dashboard/SpeechRecognition'>SpeechRecognition</Link></li>
      <>4. Text-to-Speech APIs (IBM Watson) </>
      <li><Link   to = '/dashboard/TextToSpeech'>TextToSpeech</Link></li>
      <>5. Translation APIs (Google Cloud Translation)</>
      <li><Link   to = '/dashboard/TextTranslation'>TextTranslation</Link></li>

      <> third party apis integrate </>
      <li><Link   to = '/dashboard/ThirdPartyAPI'>ThirdPartyAPI</Link></li>
    
      </ul>
   
      
      
    

   



    </div>
  );
};

export default Index;
