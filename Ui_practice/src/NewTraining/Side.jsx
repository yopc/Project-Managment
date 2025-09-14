import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { ToggleContext } from '../component/Context';
import { House, FolderCheck, MessageCircleMore } from 'lucide-react';
import logo from '../assets/images/logo.jpg';
import Profile from '../component/Profile';
import { Authenticatioin } from './Store/AuthenticateUser';
import { useEffect } from 'react';
import { useMessage } from './Store/useMessage';

const navItems = [
  { label: 'Home', icon: <House size={20} />, to: '/home' },
  { label: 'Report', icon: <FolderCheck size={20} />, to: '/catalog' },
  { label: 'Messege', icon: <MessageCircleMore size={20} />, to: '/message' },
];

const Side = () => {
  const { toggle } = useContext(ToggleContext);
  const {currentEmployee , getCurrentEmployee} = Authenticatioin();

  const { unreadCount , subscribe,unreadTotal} = useMessage();
// const unreadCount = useMessage((state) => state.unreadCount);

useEffect(() => {
  subscribe()
  console.log("Unread count updated:", unreadCount);
  
  // return () => unsubscribeFromMessages()
 
}, []);




  

  useEffect(()=> {
    getCurrentEmployee();
    
  }, [getCurrentEmployee])



   const { getUnreadCounts } = useMessage();

  useEffect(() => {
    getUnreadCounts();  // 👈 fetch unread counts when sidebar mounts
  }, []);
  
// const src = `data:${currentEmployee.profilePicture.contentType};base64,${currentEmployee.profilePicture.data}`
// const src = `data:${currentEmployee?.profilePicture.contentType};base64,${currentEmployee?.profilePicture.data}`

return (
    <div
      className={`h-screen flex flex-col justify-between  transition-all duration-300 bg-gradient-to-b from-slate-800 to-slate-900 text-white shadow-lg ${
        toggle ? 'w-52' : 'w-16'
      }`}
    >
      <div>

      {/* Logo + Title */}
      <div className="flex flex-col items-center py-6 px-4 gap-2">
        <img
          src={logo}
          alt="Logo"
          className={`rounded-full transition-all duration-300 ${
            toggle ? 'w-20 h-20' : 'w-8 h-8'
          }`}
        />
        
        {toggle && <h1 className="text-lg font-semibold text-blue-400 text-center">Project Manager</h1>}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col  px-2">
        {navItems.map((item) => (
          <Link
          key={item.label}
          to={item.to}
          className={`flex items-center   gap-3 p-3 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer `}
          >
            <div className='flex gap-2'>
               {item.icon}
            {toggle && <span className="text-sm font-medium">{item.label}</span>}            
            
            </div>
          
          <div>
               
              {item.label === 'Messege' && unreadTotal > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadTotal}
                </span>
              )}
          </div>

         


          </Link>
        ))}
      </nav>
        </div>

      {/* Footer / Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex flex-col items-center text-center">
          
          {toggle ? 
            <>
              <Profile styleProp= {"w-10 h-10"} imageSrc={currentEmployee?.profilePicture}/>
              <p className="text-xs mt-2 font-medium text-gray-300">{currentEmployee?.email}</p>
              <p className="text-[10px] mt-1 text-gray-500 leading-tight">
               Interactive Project Management Solution with Real-Time Features
              </p>
          

            </>
            : <Profile
              styleProp={'w-8 h-8'}              
              imageSrc={
                currentEmployee?.profilePicture
                  ?  currentEmployee.profilePicture
                  : "./src/assets/images/person_four.jpg" // fallback image
              }
            />



          }
        </div>

      </div>
    </div>
  );
};

export default Side;
