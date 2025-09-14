import React, { useEffect } from 'react'
import { Authenticatioin } from '../Store/AuthenticateUser'
import Profile from '../../component/Profile.jsx'
import { Link, Route, Routes } from "react-router-dom"
import ChatPage from '../chat/ChatPage.jsx'
import { useMessage } from '../Store/useMessage.jsx'

// const MainMassage = () => {
//   const { employees, getAllEmployee } = Authenticatioin()
//   const {setSelectedUser, clearUnread , unreadBySender} = useMessage()




//   useEffect(() => {
//       getAllEmployee()


//     }, [])


//    const { getUnreadCounts } = useMessage();

//   useEffect(() => {
//     getUnreadCounts();  // 👈 fetch unread counts when sidebar mounts
//   }, []);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//      <div className='w-1/4 h-screen overflow-y-auto'>
//        <div >
//         {employees.map((employee) =>
        
//        {  
//          const perChat = unreadBySender[employee._id] || 0
//         return (
         
//           <Link
//             key={employee._id}
//             to={`/message/detail/${employee._id}`}  // ✅ relative link
//             className="flex border border-gray-400 rounded-lg p-2 items-center justify-between hover:bg-gray-100"
//             onClick={() => {setSelectedUser(employee._id)
//               }
//             }
//           >
//            <div className='flex'>
//                <Profile imageSrc={employee.profilePicture} styleProp={'w-10 h-10'} />
//             <div>
//               <p>{employee.fullName}</p>
//               <p>{employee.JobTitle}</p>              
             
//             </div>
//            </div>
 
//              {perChat > 0 && (
//               <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
//                 {perChat} 
//               </span>
//             )}
//           </Link>
//         )})}
//       </div>
//      </div>

//       {/* Chat area */}
//       <div className='border border-red-300 flex-1 h-screen'>
      
//        <Routes>
//           <Route path="detail/:id" element={<ChatPage />} />

//        </Routes>
//       </div>
//     </div>
//   )
// }



const MainMassage = () => {
  const { employees, getAllEmployee } = Authenticatioin()
  const {setSelectedUser, clearUnread , unreadBySender} = useMessage()

  useEffect(() => {
      getAllEmployee()
  }, [])

  const { getUnreadCounts } = useMessage();

  useEffect(() => {
    getUnreadCounts();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 pt-0">
      {/* Enhanced Sidebar */}
      <div className='w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm'>
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        </div>
        
        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {employees.map((employee) => {
            const perChat = unreadBySender[employee._id] || 0;
            return (
              <Link
                key={employee._id}
                to={`/message/detail/${employee._id}`}
                className="flex items-center p-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 group hover:translate-x-1"
                onClick={() => setSelectedUser(employee._id)}
              >
                {/* Profile Picture Container */}
                <div className="relative flex-shrink-0 mr-4">
                  <Profile 
                    imageSrc={employee.profilePicture} 
                    styleProp={'w-12 h-12 rounded-full object-cover ring-2 ring-gray-100'} 
                  />
                  {/* Online Status Indicator */}
                 </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {employee.fullName}
                    </h3>
                   
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate">
                      {employee.JobTitle}
                    </p>
                    
                    {/* Unread Badge */}
                    {perChat > 0 && (
                      <div className="flex-shrink-0 ml-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full shadow-sm">
                          {perChat > 99 ? '99+' : perChat}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className='flex-1 bg-gray-50'>
        <Routes>
          <Route path="detail/:id" element={<ChatPage />} />
        </Routes>
      </div>
    </div>
  )
}
export default MainMassage



