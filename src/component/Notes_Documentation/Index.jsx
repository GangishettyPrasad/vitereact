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

        <li><Link   to = '/ArraysGuide'>Arrays Guide</Link></li>
        <li><Link   to = '/NestedArraysWithObjects'>NestedArraysWithObjects</Link></li>
        <li><Link   to = '/NestedArraysWithObjectsGuide'>NestedArraysWithObjectsGuide</Link></li>
        <li><Link   to = '/NestedArraysWithObjectsGuide_exmp'>NestedArraysWithObjectsGuide_exmp</Link></li>
        <li><Link   to = '/NestedArraysInReact'>NestedArraysInReact</Link></li>
        <li><Link   to = '/JsArrayMethodsDemo'> Intro Js ArrayMethods </Link></li>
        <li><Link   to = '/ReactArrayMethods'>How to Use In React  _ArrayMethods</Link></li>
        <li><Link   to = '/MapMethodGuide'>MapMethodGuide</Link></li>
        <li><Link   to = '/FilterGuide'>FilterGuide</Link></li>
        <li><Link   to = '/ArrayMethodsDeep'>ArrayMethods Reaming</Link></li>

        
<br/><br/>
        <li><Link   to = '/JSObjectsGuide'> Objects Guide</Link></li>
        <li><Link   to = '/NestedObjeExplanation'>NestedObjeExplanation</Link></li>

        <li><Link   to = '/NestedObjectsWithArrays'>NestedObjectsWithArrays</Link></li>
        <li><Link   to = '/NestedObjInReact'>NestedObjInReact</Link></li>
<br/><br/> 

        <li><Link   to = '/AdvancedCrudGuide'>AdvancedCrudGuide</Link></li>
        <li><Link   to = '/NestedCRUDGuide'>NestedCRUDGuide</Link></li>

<br/><br/> 

        <li><Link   to = '/FunctionsGuide'>FunctionsGuide</Link></li>
        <li><Link   to = '/EventsGuide'>EventsGuide</Link></li>
<br/>
        
      </ul>


      <h2> </h2>


      <h2><FcAssistant style={a}/>JavaScript - ES6 </h2>
      <ol>
        <h3>topics <SlPencil style={{color : "blue"}}/> </h3>
      </ol>
      
      <ul>
      <li><Link   to = '/VariableDeclarations'>VariableDeclarations</Link></li>
      <li><Link   to = '/ArrowFunctionsGuide'>ArrowFunctionsGuide</Link></li>
      <li><Link   to = '/TemplateLiteralsGuide'>TemplateLiteralsGuide</Link></li>

      <li><Link   to = '/Destructuring'>Destructuring</Link></li>
 
      <li><Link   to = '/SpreadOperatorExample'>SpreadOperatorExample</Link></li>
      <li><Link   to = '/ShoppingCart'>ShoppingCart example</Link></li>
      <li><Link   to = '/ExampleComponent'>obj literals and enhanced objs</Link></li>

      
      
        <li><Link   to = '/SpreadOperatorGuide'>SpreadOperatorGuide</Link></li>
        <li><Link   to = '/DestructuringGuide'>DestructuringGuide </Link></li>
        <li><Link   to = '/SpreadOperatorGuidee'>SpreadOperatorGuidee</Link></li>

<br/><br/> 
        <li><Link   to = '/OptionalChainingGuide'>OptionalChainingGuide</Link></li>
        <li><Link   to = '/OptionalChainingGuidee'>OptionalChainingGuidee</Link></li>
        <li><Link   to = '/NullishCoalescingGuide'>NullishCoalescingGuide</Link></li>


        <li><Link   to = '/ExecutionContextGuide'>ExecutionContextGuide</Link></li>
    
        <li><Link   to = '/PromisesAsyncGuide'>PromisesAsyncGuide</Link></li>
        <li><Link   to = '/PromisesAsyncGuidee'>PromisesAsyncGuidee</Link></li>
        <li><Link   to = '/AsyncAwaitGuide'>AsyncAwaitGuide</Link></li>
        <li><Link   to = '/PromiseChainingGuide'>PromiseChainingGuide</Link></li>

      </ul>


      <h2><FcAssistant style={a}/>  React  </h2>
      <ol>
        <h3>topics <SlPencil style={{color : "blue"}}/> </h3>
      </ol>
      
      <ul>
      <li><Link   to = '/ReactStateGuide'>ReactStateGuide</Link></li>
      <li><Link   to = '/ModulesGuideUI'>ModulesGuideUI</Link></li>

      
        <li><Link   to = '/ReactCoreGuide'>ReactCoreGuide</Link></li>
        <li><Link   to = '/JSXRenderingGuide'>JSXRenderingGuide</Link></li>
        <li><Link   to = '/JSXConditionalRenderingGuide'>JSXConditionalRenderingGuide</Link></li>
        <li><Link   to = '/PropsGuide'>PropsGuide</Link></li>
        <li><Link   to = '/UseStateCompleteGuide'>UseStateCompleteGuide</Link></li>
        <li><Link   to = '/FullReactUseStateAndJSXExamples'>FullReactUseStateAndJSXExamples</Link></li>
        <li><Link   to = '/UseEffectMasterGuide'>UseEffectMasterGuide</Link></li>
        <li><Link   to = '/UseEffectFullVisualDoc'>UseEffectFullVisualDoc</Link></li>
      </ul>





   
      

    

   



    </div>
  );
};

export default Index;
