// src/components/SideNav.js
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  ListItemButton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import { PiFileJsxBold } from "react-icons/pi";
import { FaSquareJs, FaGit, FaTerminal, FaCode, FaPython } from "react-icons/fa6";
import { RiReactjsFill } from "react-icons/ri";
import { MdWork, MdMenuBook } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";

const drawerWidth = 240;

const SideNav = () => {
  const menuItems = [
    { text: 'Frontend UI Masterclass', path: '/dashboard/frontend-masterclass', icon: <FaLaptopCode /> },
    { text: 'HRMS Developer Learning Hub', path: '/dashboard/learning-hub', icon: <MdMenuBook /> },
    { text: 'Python Basics to Advance', path: '/dashboard/python-basics-to-advance', icon: <MdMenuBook /> },
    { text: 'Django & SQL Basics to Advance', path: '/dashboard/django-sql-basics-to-advance', icon: <MdMenuBook /> },
    { text: 'JavaScript', path: '/dashboard/jsindex', icon: <FaSquareJs /> },
    { text: 'JSX', path: '/dashboard/jsx', icon: <PiFileJsxBold /> },
    { text: 'React', path: '/dashboard/mytabs', icon: <RiReactjsFill /> },
    { text: 'GIT', path: '/dashboard/git', icon: <FaGit /> },
    { text: 'Redux', path: '/dashboard/ReduxR', icon:<RiReactjsFill /> },
    { text: 'CMD Commands', path: '/dashboard/cmd', icon: <FaTerminal /> },
    { text: 'Phase 1: React Roadmap', path: '/dashboard/chatbot-guide', icon: <RiReactjsFill /> },
    { text: 'JS Interview Q&A', path: '/dashboard/JSInterviewQuestions', icon: <FaSquareJs /> },
    { text: 'JS Tutorial', path: '/dashboard/JSTutorial', icon: <FaSquareJs /> },
    { text: 'HRMS - Project Concepts', path: '/dashboard/ProjectTutorial', icon: <MdWork /> },
    { text: 'Phase 2: Code Walkthrough (HRMS)', path: '/dashboard/PageWiseCodeGuide', icon: <MdWork /> },
    { text: 'Phase 3: Coding Boilerplate', path: '/dashboard/Phase3CodeGuide', icon: <MdWork /> },
    { text: 'Phase 4: Core HRMS Modules', path: '/dashboard/Phase4CodeGuide', icon: <MdWork /> },
    { text: 'Phase 5: External Libraries', path: '/dashboard/ExternalLibrariesGuide', icon: <MdWork /> },
    { text: 'Project Boilerplate', path: '/dashboard/project-boilerplate', icon: <FaCode /> },
    { text: 'Python Backend', path: '/dashboard/python-backend', icon: <FaPython /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  '&.active': {
                    backgroundColor: '#e0e0e0', // Active tab background
                    fontWeight: 'bold',         // Optional: bold text
                    borderLeft: '4px solid #1976d2', // Optional: left border
                    color: '#1976d2', // Optional: change text color
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNav;
