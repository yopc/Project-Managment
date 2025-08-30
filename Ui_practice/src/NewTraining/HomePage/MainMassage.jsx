import React, { useEffect } from 'react'
import { Authenticatioin } from '../Store/AuthenticateUser'
import Profile from '../../component/Profile.jsx'
import { Link, Route, Routes } from "react-router-dom"
import ChatPage from '../chat/ChatPage.jsx'
import { useMessage } from '../Store/useMessage.jsx'

const MainMassage = () => {
  const { employees, getAllEmployee } = Authenticatioin()
  const {setSelectedUser, clearUnread , unreadBySender} = useMessage()




  useEffect(() => {
      getAllEmployee()


    }, [])


   const { getUnreadCounts } = useMessage();

  useEffect(() => {
    getUnreadCounts();  // 👈 fetch unread counts when sidebar mounts
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
     <div className='w-1/4 h-screen overflow-y-auto'>
       <div >
        {employees.map((employee) =>
        
       {  
         const perChat = unreadBySender[employee._id] || 0
        return (
         
          <Link
            key={employee._id}
            to={`/message/detail/${employee._id}`}  // ✅ relative link
            className="flex border border-gray-400 rounded-lg p-2 items-center justify-between hover:bg-gray-100"
            onClick={() => {setSelectedUser(employee._id)
              }
            }
          >
           <div className='flex'>
               <Profile imageSrc={employee.profilePicture} styleProp={'w-10 h-10'} />
            <div>
              <p>{employee.fullName}</p>
              <p>{employee.JobTitle}</p>

              
             
            </div>
           </div>
 
             {perChat > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                {perChat} 
              </span>
            )}
          </Link>
        )})}
      </div>
     </div>

      {/* Chat area */}
      <div className='border border-red-300 flex-1 h-screen'>
      
       <Routes>
          <Route path="detail/:id" element={<ChatPage />} />

       </Routes>
      </div>
    </div>
  )
}

export default MainMassage
