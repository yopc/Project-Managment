import React, { useReducer, useState } from 'react'
import './App.css'
import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons"
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import MainContent from './component/MainContent/MainContent';
import Context, { ToggleContext } from './component/Context';
import SidebarTraining from './component/SidebarTraining';
import UploadImage from './component/UploadImage';
import FileUploader from './component/UploadMultipleDoc';
import FileGallery from './component/FileGallery';
import Signup from './Page/Signup';
import UserList from './component/User';
import CardPractice from './component/CardPractice';
import EmployeeRegistration from './component/EmployeeRegistration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerificationSuccessfullPage from './component/VerificationSuccessfullPage';
import Dashboard from './NewTraining/Dashboard.jsx';
import Continer from './NewTraining/Continer.jsx';
import PopupButton from '../src/component/PopupButton.jsx'
import { Authenticatioin } from './NewTraining/Store/AuthenticateUser.jsx';
import MainMassage from './NewTraining/HomePage/MainMassage.jsx';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
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
   <Route path="/login" element={!authUser ? <CardPractice /> : <Navigate to="/" />} />
   <Route path="/signup" element={ <EmployeeRegistration/>} />
  
  </Routes>
 
  
 

 
   <ToastContainer />
 

  </>
    );
}



{/* <Signup/> */}
  // <UploadImage/>
  // <FileUploader/>
  // <FileGallery/>

  

//  <Routes>
//     <Route path="/email-verified" element={ <VerificationSuccessfullPage/>} />
//      <Route path='/login' element={<CardPractice/>}/>
//      <Route path='/employee' element={<FileGallery/>}/>
//      <Route path='/home' element={<HomePage/>}/>
//   </Routes>




// perfectly working example

  // <Context>

  //  <div className='flex w-screen h-screen'>
  //     <Sidebar/> 
  //     {/* <SidebarTraining/> */}
  //     {/* <MainContent/> */}
  //       <Routes>
  //     <Route path="/*" element={<MainContent />} />
  //     <Route path="/" element={<Navigate to="/overview" replace />} />
  //   </Routes>
  //   </div>
  //   </Context>


