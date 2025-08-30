
import React, { useContext  , useEffect, useState} from 'react'
import { Routes , Route} from 'react-router-dom'
import CreateProject from './CreateProject'
import { ProjectCreator } from './Store/ProjectCreator';
import LinearProgress from "@mui/material/LinearProgress";


import Card from '../component/Card';
import HomePage from './HomePage';
import { convertToString } from './lib/dateCorrector.jsx';
import MainMassage from './HomePage/MainMassage.jsx';
import { toast } from 'react-toastify';
import { Authenticatioin } from './Store/AuthenticateUser.jsx';
import { useActivityLog } from './Store/useActivityLog.jsx';

const HomeP = () =>  { 
 const {projects , getProject} =  ProjectCreator();
 const [notification , setNotifications] = useState([])
//  const {unreadCount , getUnreadCount} = useActivityLog();
 const unreadCount = useActivityLog((state) => state.unreadCount);

  const {socket} = Authenticatioin();
 const {getNotification , leaveNotification } = useActivityLog();
//  const socket = useActivityLog(state => state.socket);


   useEffect(() => {
    getProject();
  }, [getProject]);




//  useEffect(() => {
//     getNotification(projects)

//     return () => leaveNotification(projects)
//  }, [projects])


 useEffect(() => {
  console.log('INSIDE MAINBODY')

    
  

  if (!socket) return; // wait for socket
  if (!projects || projects.length === 0) return; // wait for projects
  
  console.log('SOCKET' + socket)
  console.log('PROJECTS' + projects)
  getNotification(projects , socket);

  return () => leaveNotification(projects);
}, [projects, socket]);



  // console.log('unread count ' + unreadCount)




  return (<div className='flex-1'>
        this is the main part of the application
   <div>
      <h2>Projects for Member</h2>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
             
             <Card 
                  id={project._id}
                   title={project.title} 
                   dueDate={convertToString(project.dueDate)}
                   description={project.description} 
                   status={project.status}
                   createdBy={project.createdBy.fullName} 
                   progress={25}
                   unreadCount={unreadCount?.[project._id] || 0}
                    />
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}

      
    </div>
    <div className='border flex-col w-72 p-2 m-2'>
      <div className="flex justify-between">
        <h1>Title</h1>
        <h1>dueDate</h1>
      </div>
      <h1>description of the main season at the same</h1>
    
    <div className="flex justify-between">      
        <h1>status</h1> 
        <h1>createdBy</h1>
    </div>

 <LinearProgress
        variant="buffer"
        value={25}       
      />

    </div>




   
     
   

   
    </div>) }


  
    

const MainBody = () => {

   const [image , setImage] = useState("");

    const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Base64 string is set here
    };
    reader.readAsDataURL(file); // converts file → base64 string
  };

  return (

     <div className='flex-1  overflow-y-auto overflow-x-hidden border-green-200 border-4 p-2'>
      

      
{/* <input type="file" className='m-36'
 onChange={(e) => handleFileInput(e)}/>

 <button onClick={() => console.log('IMAGE'+ image)}>log Image</button> */}

      <Routes>
       <Route path='/' element = {<HomeP/>}/>
       <Route path='/home' element = {<HomeP/>}/>
       <Route path="/home/detail/:id/*" element={<HomePage/>} />
       <Route path='/create_project' element = {<CreateProject/>}/>
       <Route path='/message/*' element = {<MainMassage/>}/>
      </Routes>
      </div>

    

  )
}

export default MainBody