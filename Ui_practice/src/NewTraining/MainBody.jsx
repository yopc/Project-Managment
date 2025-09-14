
import React, { useContext  , useEffect, useState, useMemo} from 'react'
import { Routes , Route} from 'react-router-dom'
import CreateProject from './CreateProject'
import { ProjectCreator } from './Store/ProjectCreator';
import LinearProgress from "@mui/material/LinearProgress";
import {Search, LayoutGrid, Table as TableIcon} from "lucide-react"

import Card from '../component/Card';
import HomePage from './HomePage';
import { convertToString } from './lib/dateCorrector.jsx';
import MainMassage from './HomePage/MainMassage.jsx';
import { toast } from 'react-toastify';
import { Authenticatioin } from './Store/AuthenticateUser.jsx';
import { useActivityLog } from './Store/useActivityLog.jsx';
import Catalog from './main/Catalog.jsx';
import { Link } from 'react-router-dom';
import Badge2 from './components/ui/Badge2.jsx';


// const HomeP = () =>  { 
//  const {projects , getProject, loadProject} =  ProjectCreator();
//  const [notification , setNotifications] = useState([])

//  const unreadCount = useActivityLog((state) => state.unreadCount);
//   console.log('unread count is ' + unreadCount)
//   const {socket} = Authenticatioin();
//  const {getNotification , leaveNotification } = useActivityLog();



//    useEffect(() => {
//     getProject();
//   }, [getProject]);





//  useEffect(() => {
//   console.log('INSIDE MAINBODY')

    
  

//   if (!socket) return; // wait for socket
//   if (!projects || projects.length === 0) return; // wait for projects
  
//   console.log('SOCKET' + socket)
//   console.log('PROJECTS' + projects)
//   getNotification(projects , socket);

//   return () => leaveNotification(projects);
// }, [projects, socket]);



//   // console.log('unread count ' + unreadCount)




//   return (<div className='flex-1'>

// {   loadProject ?
//       ( <div className="flex items-center justify-center h-[60vh]">
//           <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//         </div>)
//         :       
//      (<div>
//       <h2>Projects for Member</h2>
//       {projects.length > 0 ? (
//         <ul>
//           {projects.map((project) => (
//             <li key={project._id}>
             
//              <Card 
//                   id={project._id}
//                    title={project.title} 
//                    dueDate={convertToString(project.dueDate)}
//                    description={project.description} 
//                    status={project.status}
//                    createdBy={project.createdBy.fullName} 
//                    progress={project.progress}
//                    unreadCount={unreadCount?.[project._id] || 0}
//                     />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No projects found.</p>
//       )}

      
//     </div>)}
  




   
     
   

   
//     </div>) }


const HomeP = () => {
  const { projects, getProject, loadProject } = ProjectCreator();
  const unreadCount = useActivityLog((state) => state.unreadCount);
  const { socket } = Authenticatioin();
  const { getNotification, leaveNotification } = useActivityLog();

  const [view, setView] = useState("card"); // "card" or "table"
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProject();
  }, [getProject]);

  useEffect(() => {
    if (!socket) return;
    if (!projects || projects.length === 0) return;
    getNotification(projects, socket);
    return () => leaveNotification(projects);
  }, [projects, socket]);

  // Filter projects by title
  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  return (
    <div className="flex-1 p-6">
      {loadProject ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Projects for Member</h2>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* View Switch */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setView("card")}
                  className={`px-3 py-2 flex items-center gap-1 ${
                    view === "card" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <LayoutGrid size={16} />
                  Card
                </button>
                <button
                  onClick={() => setView("table")}
                  className={`px-3 py-2 flex items-center gap-1 ${
                    view === "table" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <TableIcon size={16} />
                  Table
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {filteredProjects.length > 0 ? (
            view === "card" ? (
              // GRID VIEW
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProjects.map((project) => (
                  <Card
                    key={project._id}
                    id={project._id}
                    title={project.title}
                    dueDate={convertToString(project.dueDate)}
                    description={project.description}
                    status={project.status}
                    createdBy={project.createdBy.fullName}
                    progress={project.progress}
                    unreadCount={unreadCount?.[project._id] || 0}
                  />
                ))}
              </div>
            ) : (
              // TABLE VIEW (PURE TAILWIND)
              <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Due Date</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Created By</th>
                      <th className="px-4 py-3">Progress</th>
                      <th className="px-4 py-3">Unread</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr
                        key={project._id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium">{project.title}</td>
                        <td className="px-4 py-3">{convertToString(project.dueDate)}</td>
                        <td className="px-4 py-3"><Badge2 status={project.status}/></td>
                        <td className="px-4 py-3">{project.createdBy.fullName}</td>
                        <td className="px-4 py-3">{project.progress}%</td>
                        <td className="px-4 py-3">{unreadCount?.[project._id] || 0}</td>
                        <td className="px-4 py-3">
                          <Link
                            to={`/home/detail/${project._id}/`}
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <p className="text-gray-500 text-center py-10">No projects found.</p>
          )}
        </div>
      )}
    </div>
  );
};




  



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

     <div className='flex-1  overflow-y-auto overflow-x-hidden border-4 '>
      

      

      <Routes>
       <Route path='/' element = {<HomeP/>}/>
       <Route path='/home' element = {<HomeP/>}/>
       <Route path="/home/detail/:id/*" element={<HomePage/>} />
       <Route path='/create_project' element = {<CreateProject/>}/>
       <Route path='/message/*' element = {<MainMassage/>}/>
       <Route path='/catalog' element = {<Catalog/>}/>
      </Routes>
      </div>

    

  )
}

export default MainBody