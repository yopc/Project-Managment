// // import React, { useContext, useEffect, useState } from 'react'
// // import Profile from '../Profile'
// // import { MenuIcon } from '../Icons'
// // import { ToggleContext } from '../Context'
// // import { Link, Routes, Route } from 'react-router-dom';
// // import { NotepadText, LayoutList, CalendarCheck, LayoutDashboard, Workflow, MessageCircleMore,Paperclip , CalendarDays , PanelsTopLeft,Repeat2} from 'lucide-react';


// // const Overview = () => <div className='p-4'>📋 Overview content</div>;
// // const Tasks = () => <div className='p-4'>✅ Task list and description</div>;
// // const Calendar = () => <div className='p-4'>📅 Calendar view</div>;
// // const Plan = () => <div className='p-4'>🧭 Project plan</div>;
// // const WorkflowPage = () => <div className='p-4'>🔄 Workflow details</div>;
// // const Message = () => <div className='p-4'>💬 Message center</div>;
// // const Files = () => <div className='p-4'>📎 File repository</div>;

// // const MainContent = () => {
// //   const {toggle,toggler} = useContext(ToggleContext);
// //   console.log('toggle inside main conent' + toggle)
// //   return (
// //    <div className={`flex flex-col h-screen flex-1 flex-grow ${toggle ? 'ml-0' : '' }`}>
// //   {/* Header */}
// //   <div className="w-full h-16 bg-blue-300 flex items-center justify-between item-center px-4 py-2">
    
// //     <button  onClick={() => {toggler()}}>        
// //     <MenuIcon className='cursor-pointer' />
// //     </button>
    
// //      <div className='flex items-center gap-4 mb-2 '>

// //         <div className='mt-5'>
// //         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
// //         </div>   
  
// //  <Profile styleProp={'w-12 h-12'}/>
// //     </div>

// //   </div>

// //   {/* Main Content */}
// //   <div className=" flex-1   flex flex-col">
// //     <div className="flex-col  bg-neutral-300 ">
    
// //       <div className='flex justify-between w-full px-4 py-1'>

// //         <div className="flex items-center">
// //           <div className='flex gap-1'><PanelsTopLeft color="#f2f2f2"  strokeWidth={2} size={25} fill='#87cefa' />Project name</div>
// //         <span className='bg-green-200 text-sm text-black px-3 py-1 rounded-full leading-tight mx-4'>Completed</span>
// //         </div>
        
// //         <div className="flex items-center">
// //           <div className="mb-3 mx-4 flex">
// //         <Profile styleProp={'w-10 h-10'}/>
// //         <Profile styleProp={'w-10 h-10 '}/>
// //         <Profile styleProp={'w-10 h-10  '}/>
// //         <Profile styleProp={'w-10 h-10  '}/></div>
       
// //         <button className='flex bg-blue-500 text-white rounded p-1'><Repeat2 color="#f2f2f2" /> Share</button>
        
// //         </div>
      
// //       </div>

// //       <div className='flex gap-4 border-s-violet-500 mx-4'>
// //         <div className='flex items-center'> <NotepadText strokeWidth={1} size={18}/>overview</div>
// //         <div className='flex items-center'><LayoutList strokeWidth={1} size={18}/>tasks</div>
// //         <div className='flex items-center'><CalendarCheck strokeWidth={1} size={18}/>calander</div>
// //         <div className='flex items-center'> <LayoutDashboard strokeWidth={1} size={18}/>plan</div>
// //         <div className='flex items-center'> <CalendarDays strokeWidth={1} size={18}/>calander</div>
// //         <div className='flex items-center'><Workflow strokeWidth={1} size={18} />workflow</div>
// //         <div className='flex items-center'><MessageCircleMore strokeWidth={1} size={18}/>message</div>
// //         <div className='flex items-center'> <Paperclip strokeWidth={1} size={18}/>file</div>
// //         <hr/>   
// //       </div>

// //     </div>
 

   
// //   </div>
// // </div>

// //   )
// // }

// // export default MainContent



// // import React, { useContext } from 'react';
// // import Profile from '../Profile';
// // import { MenuIcon } from '../Icons';
// // import { ToggleContext } from '../Context';
// // import {
// //   NotepadText,
// //   LayoutList,
// //   CalendarCheck,
// //   LayoutDashboard,
// //   Workflow,
// //   MessageCircleMore,
// //   Paperclip,
// //   CalendarDays,
// //   PanelsTopLeft,
// //   Repeat2
// // } from 'lucide-react';

// // const MainContent = () => {
// //   const { toggle, toggler } = useContext(ToggleContext);

// //   return (
// //     <div className={`flex flex-col h-screen flex-grow transition-all duration-300 ${toggle ? 'ml-0' : ''} `}>
// //       {/* Header */}
// //       <div className="w-full h-16 bg-blue-600 flex items-center justify-between px-4 shadow-md">
// //         {/* Left: Sidebar Toggle */}
// //         <button onClick={toggler}>
// //           <MenuIcon className="cursor-pointer text-white" />
// //         </button>

// //         {/* Right: Notification + Profile */}
// //         <div className="flex items-center gap-4">
// //           <div className="text-white">
// //             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
// //               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //               <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
// //               <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
// //             </svg>
// //           </div>
// //           <Profile styleProp="w-10 h-10" />
// //         </div>
// //       </div>

// //       {/* Body */}
// //       <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
// //         {/* Top project info */}
// //         <div className="flex justify-between items-center mb-6">
// //           <div className="flex items-center gap-4">
// //             <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
// //               <PanelsTopLeft size={24} fill="#87cefa" strokeWidth={2} />
// //               Project Alpha
// //             </div>
// //             <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
// //               Completed
// //             </span>
// //           </div>

// //           <div className="flex items-center gap-3">
// //             <Profile styleProp="w-10 h-10" />
// //             <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md transition">
// //               <Repeat2 size={18} />
// //               Share
// //             </button>
// //           </div>
// //         </div>

// //         {/* Navigation Tabs */}
// //         <div className="flex items-center gap-6 border-b border-gray-300 pb-2 mb-4 text-sm font-medium text-gray-600">
// //           <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
// //             <NotepadText size={18} strokeWidth={1.5} /> Overview
// //           </div>
// //           <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
// //             <LayoutList size={18} strokeWidth={1.5} /> Tasks
// //           </div>
// //           <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
// //             <CalendarCheck size={18} strokeWidth={1.5} /> Calendar
// //           </div>
// //           <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
// //             <LayoutDashboard size={18} strokeWidth={1.5} /> Plan
// //           </div>
// //           <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
// //             <CalendarDays size={18} strokeWidth={1.5} /> Schedule
// //           </div>
// //           <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
// //             <Workflow size={18} strokeWidth={1.5} /> Workflow
// //           </div>
// //           <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
// //             <MessageCircleMore size={18} strokeWidth={1.5} /> Messages
// //           </div>
// //           <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
// //             <Paperclip size={18} strokeWidth={1.5} /> Files
// //           </div>
// //         </div>

// //         {/* Divider */}
// //         <hr className="mb-4 border-gray-300" />

// //         {/* Main Dashboard Content */}
// //         <div className="bg-white shadow-sm rounded-md p-6 min-h-[200px]">
// //           <p className="text-gray-700 text-base">Main dashboard content goes here...</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MainContent;



// import { useContext } from 'react';
// import { ToggleContext } from '../Context.jsx';
// import { Link, Routes, Route } from 'react-router-dom';
// import {
//   PanelsTopLeft, NotepadText, LayoutList, CalendarCheck,
//   LayoutDashboard, CalendarDays, Workflow, MessageCircleMore, Paperclip, Repeat2
// } from 'lucide-react';
// import {MenuIcon} from '../Icons';
// import Profile from '../Profile';
// import HomePage from '../../NewTraining/HomePage.jsx';


// // Dummy pages for routing

// const Home = () => <div className='p-4'>Home</div>;
// const File = () => <div className='p-4'>file</div>;

// const MainContent = () => {
//   const { toggle, toggler } = useContext(ToggleContext);

//   return (
//     <div className={`flex flex-col h-screen flex-1 flex-grow ${toggle ? 'ml-0' : ''}`}>
//       {/* Header */}
//       <div className="w-full h-16 bg-blue-300 flex items-center justify-between px-4 py-2">
//         <button onClick={() => toggler()}>
//           <MenuIcon className='cursor-pointer' />
//         </button>
       
//         <div className='flex items-center gap-4 mb-2'>
//           <div className='mt-5'>
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
//               <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
//             </svg>
//           </div>
//           <Profile styleProp={'w-12 h-12'} />
//         </div>
//       </div>

//       {/* Content */}
//       <div className='flex flex-1'>
//       <Routes>
//         <Route path='/home' element = {<Home/>}/>
//         <Route path='/workspace/*' element = {<HomePage/>}/>
//         <Route path='/file' element = {<File/>}/>
//       </Routes>
//       </div>
   

//     </div>
//   );
// };

// export default MainContent;

