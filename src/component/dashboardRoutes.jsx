// routes.js

import GitGuide from "./git/GitDuide";
import MyTabs from "./MyTabs";
import Index from "./Notes_Documentation/Index";
import Component_react from "./react/component/Component_react";
import Propsreact from "./react/component/Propsreact";
import ReactDataTable from "./reactdatatable/ReactDataTable";
import ReactHookForm from "./UseForm/ReactHookForm";

// import Index from './pages/JS/Index';
// import GitGuide from './pages/GitGuide';
// import MyTabs from './pages/MyTabs';
// import Propsreact from './pages/React/Propsreact';
// import Component_react from './pages/React/Component_react';
// import ReactDataTable from './pages/React/ReactDataTable';
// import ReactHookForm from './pages/React/ReactHookForm';

const dashboardRoutes = [
  {
    path: 'jsindex',
    element: <Index />,
    roles: ['admin', 'user'],
  },
  {
    path: 'git',
    element: <GitGuide />,
    roles: ['admin', 'user'],
  },
  {
    path: 'myTabs',
    element: <MyTabs />,
    roles: ['admin', 'user'],
  },
  {
    path: 'Propsreact',
    element: <Propsreact />,
    roles: ['admin'],
  },
  {
    path: 'componentreact',
    element: <Component_react />,
    roles: ['admin'],
  },
  {
    path: 'reactdatatable',
    element: <ReactDataTable />,
    roles: ['admin'],
  },
  {
    path: 'reacthookform',
    element: <ReactHookForm />,
    roles: ['admin'],
  },
];

export default dashboardRoutes;
