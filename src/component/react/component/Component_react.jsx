import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Component_react = (props) => {
   

    return (
        <>
            <h1 style = {{marginTop : " 30px"}}>React Component</h1>
            <div>
                <ol>
                    <li>
                        component in react 1. the component name ist letter must be capital
                        whenever export that component its exportable component i.e  importing component in that component its accessing this function
                    </li>
                    <li>
                        import Component_react from './Component/Component_react';
                        {/* <Component_react></Component_react> */}
                        syntax for accessing into another component
                    </li>
                </ol>
            </div>
            <h2>nested components </h2>
           
            <h1>
                jsx Rules
            </h1>
            <div>
                <ol>
                    <li>javascript syntax extention write html and js code in one place</li>
                    <li>
                        wrappped in one tag and write code in that tag 
                    </li>
                    <li>
                        varables or expressions write {`in {} like {varable name and expressions 
                        like 2+4 
                        or (true ) ? {} : {} 
                        or (true) && {} 
                        }`}
                    </li>
                    <li>in jsx one tag is one element</li>
                    <li>css class names write className </li>
                     <li> js evnents write like camel case onClick {`()=>{}`}</li>
                </ol>
            </div>
           

            <h5> back to react <Link   to = '/'>react</Link> </h5>




        </>
    )
}

export default Component_react