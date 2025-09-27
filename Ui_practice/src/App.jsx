import React, { useReducer, useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Context, { ToggleContext } from './component/Context';
import EmployeeRegistration from './Page/EmployeeRegistration.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Continer from './NewTraining/Continer.jsx';
import { Authenticatioin } from './NewTraining/Store/AuthenticateUser.jsx';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import ChangePassword from './Page/ChangePassword.jsx';
import LoginPage from './Page/LoginPage.jsx';
const socket = io("http://localhost:5000"); 

export default function App() {

  
  

 useEffect(() => {
    socket.on("data", (msg) => {
      console.log(msg);
    });

    // cleanup listener when component unmounts
    return () => {
      socket.off("data");
    };
  }, []);


const {authUser} = Authenticatioin();

  
  
 return (
  <>

  <Routes>
     <Route path="/*" element={authUser ? <Context>
      <Continer/>
  </Context> : <Navigate to="/login" />} />
   <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
   <Route path="/signup" element={ <EmployeeRegistration/>} />
   <Route path="/change-password/:token" element={<ChangePassword />} />
  </Routes>
 
  
 

 
   <ToastContainer />
 

  </>
    );
}

