
import React, { useContext  , useEffect, useState} from 'react'
import { Routes , Route} from 'react-router-dom'
import CreateProject from './CreateProject'
import { ProjectCreator } from './Store/ProjectCreator';
import LinearProgress from "@mui/material/LinearProgress";

import Box from "@mui/material/Box";
import Card from '../component/Card';
import HomePage from './HomePage';
import { convertToString } from './lib/dateCorrector.jsx';
import MainMassage from './HomePage/MainMassage.jsx';



const HomeP = () =>  { 
 const {projects , getProject} =  ProjectCreator();

   useEffect(() => {
    getProject();
  }, [getProject]);

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