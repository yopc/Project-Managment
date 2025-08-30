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


const HomePage = () => {

  const {projectDetail , getProjectById} =  ProjectCreator();
  const {currentEmployee , getCurrentEmployee} = Authenticatioin();
  const [image , setImage] = useState("");



  useEffect(() =>{
    getCurrentEmployee();
  }, [])

  const { id } = useParams();
  console.log(id)
    useEffect(() => {
      getProjectById(id);
    }, [id , getProjectById]);
         
  // const src = `data:${currentEmployee?.profilePicture.contentType};base64,${currentEmployee?.profilePicture.data}`
  return (
    <div className="flex-1 flex flex-col">
        <div className="flex-col bg-neutral-300">
          {/* Top row */}
          <div className='flex justify-between w-full px-4 py-1'>
            <div className="flex items-center">
              <div className='flex gap-1'>
                <PanelsTopLeft color="#f2f2f2" strokeWidth={2} size={25} fill='#87cefa' />
               
               {projectDetail?.title} 
               
              </div>
              <span className='bg-green-200 text-sm text-black px-3 py-1 rounded-full leading-tight mx-4'>{projectDetail?.status}</span>
            </div>
            <div className="flex items-center">
              <Profile styleProp={'w-10 h-10  mx-4'}  imageSrc={currentEmployee?.profilePicture}/>
              <button className='flex items-center bg-blue-500 text-white rounded px-3 py-1 gap-1'>
                <Repeat2 color="#f2f2f2" /> Share
              </button>
            </div>
          </div>

          {/* Navigation links */}
          <div className='flex gap-4 border-t border-gray-400 mx-4 py-2 text-sm'>
            <Link to={`/home/detail/${id}/overview`} className='flex items-center gap-1 hover:text-blue-500'><NotepadText size={18} /> Overview</Link>
            <Link to={`/home/detail/${id}/tasks`} className='flex items-center gap-1 hover:text-blue-500'><LayoutList size={18} /> Tasks</Link>
            <Link to={`/home/detail/${id}/calendar`} className='flex items-center gap-1 hover:text-blue-500'><CalendarCheck size={18} /> Calendar</Link>
            <Link to={`/home/detail/${id}/plan`} className='flex items-center gap-1 hover:text-blue-500'><LayoutDashboard size={18} /> Plan</Link>
            <Link to={`/home/detail/${id}/workflow`} className='flex items-center gap-1 hover:text-blue-500'><Workflow size={18} /> Workflow</Link>
            <Link to={`/home/detail/${id}/message`}className='flex items-center gap-1 hover:text-blue-500'><Bell size={18} /> Notification</Link>
            <Link to={`/home/detail/${id}/files`} className='flex items-center gap-1 hover:text-blue-500'><Paperclip size={18} /> Files</Link>
          </div>
        </div>

     
        <div className=" flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path={`/overview`}element={<Overview id={id} />} />
            <Route path={`/tasks`} element={<Tasks />} />
            <Route path={`/calendar`} element={<Calendar />} />
            <Route path={`/plan`} element={<Plan />} />
            <Route path={`/workflow`}element={<WorkflowPage />} />
            <Route path={`/message`} element={<Message  id = {id}/>} />
            <Route path={`/files`} element={<Files />} />
            <Route path={`/member`} element={<Member />} />
            <Route path={`/taskDetail/:taskId`} element={<TaskDetail/>} />
            <Route path={`message/*`} element={<MainMassage/>} />
          </Routes>




        </div>
      </div>
  )
}

export default HomePage