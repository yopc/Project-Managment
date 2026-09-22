import React, { useEffect } from 'react'
import { Authenticatioin } from '../Store/AuthenticateUser'
import Profile from '../../component/Profile.jsx'
import { Link, Route, Routes, useLocation } from "react-router-dom"
import { MessageCircleMore, UserRound } from 'lucide-react'
import ChatPage from '../chat/ChatPage.jsx'
import { useMessage } from '../Store/useMessage.jsx'

const MainMassage = () => {
  const { employees, getAllEmployee } = Authenticatioin()
  const {setSelectedUser, unreadBySender} = useMessage()
  const location = useLocation()

  const isChatOpen = /\/message\/detail\//.test(location.pathname)

  useEffect(() => {
      getAllEmployee()
  }, [])

  const { getUnreadCounts } = useMessage();

  useEffect(() => {
    getUnreadCounts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-full min-h-0 bg-gray-50 overflow-hidden">
      {/* Conversation List */}
      <div className={`${isChatOpen ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-80 md:max-w-80 md:flex-none bg-white border-r border-gray-200 shadow-sm min-h-0`}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-white flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
          <MessageCircleMore className="text-blue-500" size={22} />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {employees.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 p-8">
              <UserRound size={40} strokeWidth={1.25} />
              <p className="text-sm">No conversations yet</p>
            </div>
          ) : (
            employees.map((employee) => {
              const perChat = unreadBySender[employee._id] || 0;
              return (
                <Link
                  key={employee._id}
                  to={`/message/detail/${employee._id}`}
                  className="flex items-center p-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 group hover:translate-x-1"
                  onClick={() => setSelectedUser(employee._id)}
                >
                  <div className="relative flex-shrink-0 mr-4">
                    <Profile
                      imageSrc={employee.profilePicture}
                      styleProp={'w-12 h-12 rounded-full object-cover ring-2 ring-gray-100'}
                    />
                  </div>

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
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${isChatOpen ? 'flex' : 'hidden'} md:flex flex-1 min-h-0 min-w-0 bg-gray-50`}>
        <Routes>
          <Route path="detail/:id" element={<ChatPage />} />
        </Routes>

        {/* Empty state when no conversation is selected */}
        {!isChatOpen && (
          <div className="hidden md:flex flex-1 flex-col items-center justify-center text-gray-400 gap-3 p-8">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <MessageCircleMore className="text-blue-400" size={40} strokeWidth={1.5} />
            </div>
            <p className="text-lg font-semibold text-gray-500">Your Messages</p>
            <p className="text-sm text-center max-w-xs">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default MainMassage