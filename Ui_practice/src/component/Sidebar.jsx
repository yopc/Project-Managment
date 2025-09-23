// // import React, { useContext, useEffect, useState } from 'react';
// // import { House, Folder, RotateCcw, File, Users } from 'lucide-react';
// // import Profile from './Profile';
// // import { ToggleContext } from './Context';

// // const Sidebar = () => {
// //   const { toggle } = useContext(ToggleContext);
// //   const [sidebarWidth, setSidebarWidth] = useState('w-48');

// //   useEffect(() => {
// //     setSidebarWidth(toggle ? 'w-48' : 'w-16 items-center');
// //   }, [toggle]);

// //   return (
// //     <div className={`bg-neutral-100 min-h-screen flex flex-col  justify-between shadow-md transform transition-all duration-300 ease-in-out ${sidebarWidth} overflow-hidden`}>
     
// //       <div>

// //         <div className='flex border-b-2 ml-4 mt-4 w-full'>Task App</div>

// //       {/* Navigation */}
// //       <nav className="mt-6 flex flex-col gap-2 overflow-y-auto mt-24">
// //         <SidebarItem icon={<House size={20} strokeWidth={1} />} label="Home" showLabel={toggle} />
// //         <SidebarItem icon={<Folder size={20} strokeWidth={1} />} label="Folder" showLabel={toggle}>
// //           <SidebarSubItem label="Documents" show={toggle} />
// //           <SidebarSubItem label="Projects" show={toggle} />
// //           <SidebarSubItem label="Downloads" show={toggle} />
// //         </SidebarItem>
// //         <SidebarItem icon={<RotateCcw size={20} strokeWidth={1} />} label="Recent" showLabel={toggle} />
// //         <SidebarItem icon={<File size={20} strokeWidth={1} />} label="File" showLabel={toggle}>
// //           <SidebarSubItem label="Reports" show={toggle} />
// //           <SidebarSubItem label="Logs" show={toggle} />
// //         </SidebarItem>
// //         <SidebarItem icon={<Users size={20} strokeWidth={1} />} label="Member" showLabel={toggle} />
// //       </nav>
   
// //  </div>

// //  <div>
// //       {/* Profile */}
// //       <div className="flex items-center justify-center mt-4 transition-all duration-300 ease-in-out">
// //         <Profile styleProp={toggle ? 'w-20 h-20' : 'w-10 h-10'} name={toggle ? 'John Dao' : ''} />
// //       </div>

// //       {/* Footer */}
// //       <footer className={`mt-6 text-xs text-center text-gray-500 pb-2 transition-all duration-300 ${toggle ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
// //         © 2025 MyApp<br />All rights reserved
// //       </footer>
// //  </div>
// //     </div>
// //   );
// // };

// // const SidebarItem = ({ icon, label, children, showLabel }) => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const hasChildren = !!children;

// //   return (
// //     <div>
// //       <div
// //         className="flex items-center p-2 rounded-lg hover:bg-blue-300 cursor-pointer transition justify-between"
// //         onClick={() => hasChildren && setIsOpen(!isOpen)}
// //       >
// //         <div className="flex items-center">
// //           {icon}
// //           {showLabel && <span className="ml-2 font-medium text-sm text-gray-700">{label}</span>}
// //         </div>
// //         {hasChildren && showLabel && (
// //           <span className="text-xs text-gray-500">{isOpen ? '-' : '+'}</span>
// //         )}
// //       </div>

// //       {hasChildren && isOpen && showLabel && (
// //         <div className="ml-6 mt-1 flex flex-col gap-1 transition-all duration-200">
// //           {children}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const SidebarSubItem = ({ label, show }) => {
// //   if (!show) return null;
// //   return (
// //     <div className="pl-2 py-1 rounded hover:bg-blue-100 text-sm text-gray-600 cursor-pointer">
// //       {label}
// //     </div>
// //   );
// // };

// // export default Sidebar;


// import React, { useContext, useEffect, useState } from 'react';
// import { House, Folder, RotateCcw, File, Users } from 'lucide-react';
// import Profile from './Profile';
// import { ToggleContext } from './Context';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   const { toggle } = useContext(ToggleContext);
//   const [sidebarWidth, setSidebarWidth] = useState('w-48');

//   useEffect(() => {
//     setSidebarWidth(toggle ? 'w-60' : 'w-16 items-center');
//   }, [toggle]);

//   return (
//     <div
//       className={`min-h-screen flex flex-col justify-between transition-all duration-300 ease-in-out 
//       ${sidebarWidth} overflow-hidden text-white 
//       bg-gradient-to-b from-[#0a0f1cbd] via-[#161c27] to-black shadow-lg font-sans`}
//     >
//       {/* Top Logo or App Name */}
//       <div>
//         <div className="text-2xl font-bold px-4 pt-6 pb-4 border-b border-white-900 tracking-wide">
//           {toggle ? 'Task App' : '📝'}
//         </div>

//         {/* Navigation */}
//         <nav className="mt-6 flex flex-col gap-1 text-sm font-medium">
       
//          <Link to = '/home' > <SidebarItem icon={<House size={20} />} label="Home" showLabel={toggle} /></Link> 
//          <Link to = '/workspace/'>
//            <SidebarItem icon={<Folder size={20} />} label="Workspace" showLabel={toggle}>
//             <SidebarSubItem label="Task1" show={toggle} />
//             <SidebarSubItem label="Task2" show={toggle} />
//             <SidebarSubItem label="Task3" show={toggle} />
//           </SidebarItem>
//            </Link>
        
//           <SidebarItem icon={<Users size={20} />} label="Member" showLabel={toggle} />
       
//           <SidebarItem icon={<RotateCcw size={20} />} label="Reports" showLabel={toggle} />
//          <Link to = '/file' >
//          <SidebarItem icon={<File size={20} />} label="Logs" showLabel={toggle}>
//             <SidebarSubItem label="Reports" show={toggle} />
//             <SidebarSubItem label="Logs" show={toggle} />
//           </SidebarItem>
//           </Link>
          
//         </nav>
//       </div>

//       {/* Profile and Footer */}
//       <div>
//         {/* Profile */}
//         <div className="flex items-center justify-center mt-4 transition-all duration-300 ease-in-out">
//           <Profile styleProp={toggle ? 'w-16 h-16' : 'w-10 h-10'} name={toggle ? 'John Dao' : ''} />
//         </div>

//         {/* Footer */}
//         <footer
//           className={`mt-4 text-xs text-center text-gray-400 pb-4 transition-all duration-300 ${
//             toggle ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
//           }`}
//         >
//           © 2025 MyApp<br />All rights reserved
//         </footer>
//       </div>
//     </div>
//   );
// };

// const SidebarItem = ({ icon, label, children, showLabel }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const hasChildren = !!children;

//   return (
//     <div>
//       <div
//         className="flex items-center justify-between px-4 py-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-white hover:text-black"
//         onClick={() => hasChildren && setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center space-x-2">
//           {icon}
//           {showLabel && <span>{label}</span>}
//         </div>
//         {hasChildren && showLabel && (
//           <span className="text-sm">{isOpen ? '−' : '+'}</span>
//         )}
//       </div>

//       {hasChildren && isOpen && showLabel && (
//         <div className="ml-8 mt-1 flex flex-col gap-1 transition-all duration-200">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// const SidebarSubItem = ({ label, show }) => {
//   if (!show) return null;
//   return (
//     <div className="px-3 py-1 rounded-md cursor-pointer text-gray-300 hover:bg-white hover:text-black transition-all">
//       {label}
//     </div>
//   );
// };

// export default Sidebar;
