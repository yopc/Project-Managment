import React , {useState}  from 'react'
import { Link, Routes, Route, useParams } from 'react-router-dom';
import {
  PanelsTopLeft, NotepadText, LayoutList, CalendarCheck,
  LayoutDashboard, CalendarDays, Workflow, MessageCircleMore, Paperclip, Repeat2,
  Bell
} from 'lucide-react';

import Profile from '../component/Profile';
import { ProjectCreator } from './Store/ProjectCreator';
import { useEffect } from 'react';
import { Authenticatioin } from './Store/AuthenticateUser';
import Overview from './HomePage/Overview';
import Calendar  from './HomePage/Calender';
import Files from './HomePage/Files';
import Message from './HomePage/Message';
import Plan from './HomePage/Plan';
import WorkflowPage from './HomePage/WorkflowPage';
import Tasks from './HomePage/Tasks';
import Member from './HomePage/Member';
import TaskDetail from './HomePage/TaskDetail';
import MainMassage from './HomePage/MainMassage';
import Button from './components/ui/Button';
import Dialog from './components/ui/Dialog';
import { NavLink } from 'react-router-dom';
import Badge from './components/ui/Badge';



const HomePage = () => {

  const {projectDetail , getProjectById, updateProject , errorMessage , setErrorMessage} =  ProjectCreator();
  const {currentEmployee , getCurrentEmployee} = Authenticatioin();
  const [image , setImage] = useState("");
   const [showDialog, setShowDialog] = useState(false);
   
     const [formData, setFormData] = useState({
         title: '',
         status: '',
         startDate: '',
         description: ''
       });
   
     useEffect(() => {
     if (projectDetail) {
       setFormData({
         title: projectDetail.title,
         status: projectDetail.status,
         startDate: projectDetail.startDate,
         description: projectDetail.description
       });
     }
   }, [projectDetail]);
   
   

  useEffect(() =>{
    getCurrentEmployee();
  }, [])

  const { id } = useParams();
  console.log(id)
    useEffect(() => {
      getProjectById(id);
    }, [id , getProjectById]);


    console.log('title' + projectDetail?.title)

    

    
    const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Data:", formData);
    updateProject(formData , id);
  };      
  // const src = `data:${currentEmployee?.profilePicture.contentType};base64,${currentEmployee?.profilePicture.data}`
  return (
    <div className="flex-1 flex flex-col">
       
      <div className="flex-col bg-blue-950 text-white">
      
          <div className='flex justify-between w-full px-4 py-1 gap-2'>
            <div className="flex items-center gap-3 min-w-0">
              <div className='flex gap-1 items-center min-w-0'>
                <PanelsTopLeft color="#f2f2f2" strokeWidth={2} size={25} className='flex-shrink-0' fill='#87cefa' />               
                <span className='truncate'>{projectDetail?.title}</span>                
              </div>
             <Badge status={projectDetail?.status}>               
              </Badge>
            </div>
            <Button
              variant='outline'
              onClick={() => setShowDialog(!showDialog)}
              size={'sm'}
              className='text-black'>  
                edit
              </Button>
          </div>

          <Dialog
          isOpen = {showDialog}
          onClose={() => {setShowDialog(false); setErrorMessage(null)}}
          title="Edit Project"
          style={'w-800'}
          footer={
            <div className='flex items-end gap-2 w-full '>
               <Button size="sm" onClick={() => {setShowDialog(false) , setErrorMessage(null)}}>cancle</Button>
               <Button size="sm" onClick= {(e) => handleSubmit(e)}>update</Button>
            </div>
          }>
          <div className="flex flex-col gap-1 text-black">
         <label for='title'>title</label>
         <input id='title' name='title' className='border border-black' value={formData.title} onChange={(e) => handleChange(e)}/>
        {/* <input name='status' className='border border-black' onChange={(e) => handleChange(e)}/> */}
         <label for = 'projectStatus'>Select Project Status</label>
         <select name = 'status' id = 'projectStatus' value={formData.status} onChange={(e) => handleChange(e)}>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
         </select>
         <label for='date'>Date</label>
        <input id='date' type='date' name='startDate' value={formData.startDate} className='border border-black' onChange={(e) => handleChange(e)}/>
        <textarea type='text' name='description' className='border-black border h-40' value={formData.description}  placeholder='desciption' onChange={(e) => handleChange(e)}/>
        {errorMessage && <span className='font-roboto text-sm text-red-300'>{errorMessage}</span>}
          </div>
          </Dialog>
          {/* Navigation links */}
         <div className='flex justify-between border-t overflow-x-auto scrollbar-hide'> 
           




<div className="flex gap-4 border-gray-400 mx-4 py-2 text-sm whitespace-nowrap">
  <NavLink
    to={`/home/detail/${id}/overview`}
    className={({ isActive }) =>
      `flex items-center gap-1 ${isActive ? "text-blue-500" : "text-white"} hover:text-blue-500`
    }
  >
    <NotepadText size={18} /> Overview
  </NavLink>

  <NavLink
    to={`/home/detail/${id}/tasks`}
    className={({ isActive }) =>
      `flex items-center gap-1 ${isActive ? "text-blue-500" : "text-white"} hover:text-blue-500`
    }
  >
    <LayoutList size={18} /> Tasks
  </NavLink>

  <NavLink
    to={`/home/detail/${id}/calendar`}
    className={({ isActive }) =>
      `flex items-center gap-1 ${isActive ? "text-blue-500" : "text-white"} hover:text-blue-500`
    }
  >
    <CalendarCheck size={18} /> Calendar
  </NavLink>

  <NavLink
    to={`/home/detail/${id}/workflow`}
    className={({ isActive }) =>
      `flex items-center gap-1 ${isActive ? "text-blue-500" : "text-white"} hover:text-blue-500`
    }
  >
    <Workflow size={18} /> Workflow
  </NavLink>

  <NavLink
    to={`/home/detail/${id}/message`}
    className={({ isActive }) =>
      `flex items-center gap-1 ${isActive ? "text-blue-500" : "text-white"} hover:text-blue-500`
    }
  >
    <Bell size={18} /> Notification
  </NavLink>
</div>

          
         </div>
        </div>

        <div className=" flex-1 p-4 overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path={`/overview`}element={<Overview id={id} />} />
            <Route path={`/`}element={<Overview id={id} />} />
            <Route path={`/tasks`} element={<Tasks />} />
            <Route path={`/calendar`} element={<Calendar id={id}/>} />
           
            <Route path={`/workflow`}element={<WorkflowPage id = {id} />} />
            <Route path={`/message`} element={<Message  id = {id}/>} />
           
            <Route path={`/member`} element={<Member />} />
            <Route path={`/taskDetail/:taskId`} element={<TaskDetail/>} />
            <Route path={`message/*`} element={<MainMassage/>} />
          </Routes>




        </div>
      </div>
  )
}

export default HomePage