import React from 'react';
import { Link } from 'react-router-dom';
import { FcAssistant } from "react-icons/fc";
import { SiReacthookform } from "react-icons/si";
import { TbNumber18Small } from "react-icons/tb";
import MyTabs from '../MyTabs';
const ReactIndex = () => {

 

var a = {
  width : '20px',
  height : '20px',
  color : 'red',
}

  return (
    <div>
   
        <div>
            <h2>  <TbNumber18Small style={a}/> React  <SiReacthookform style={a} /> Topics </h2>
        </div>

       
        <ul>
          <li> <Link   to = '/dashboard/componentreact'>Componentreact</Link></li>
          <li><Link   to = '/dashboard/Propsreact'>Propsreact</Link></li>
        </ul>

    </div>
  );
};

export default ReactIndex;
