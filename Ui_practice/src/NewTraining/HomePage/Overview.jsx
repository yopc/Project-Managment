import React, { useEffect } from 'react'
import { ProjectCreator } from '../Store/ProjectCreator'
import { Link, useParams } from 'react-router-dom';
import { convertToString } from '../lib/dateCorrector.jsx';
import Profile from '../../component/Profile'
import { Authenticatioin } from '../Store/AuthenticateUser.jsx';
import {io} from 'socket.io-client'


const socket = io('http://localhost:5000', 
     { transports: ["websocket"],})

const Overview = ({id}) => {
   
  let userId;
  const {loadDetail , projectDetail , getProjectById} = ProjectCreator();
  

  console.log('id inside the overview' , id)

  useEffect(() => {

    socket.emit("joinProject", id);
    getProjectById(id)

    socket.on("memberAdded", (projectId) => {
         console.log('incoming project id' + projectId)
         console.log('current project id' + id)
       getProjectById()
       console.log('new Project member is added so it fetched in realtime')
      
    });

    socket.on("isbackendListened" , (m) => {
       console.log(m)
    })


    return () => {
      socket.off('memberAdded')
    }

  }, [id])



  return (
    <div>
   {loadDetail ?   
    <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
     </div>
   : 
   <div className="p-8 bg-gray-50 min-h-screen">
       {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Project Overview</h1>
        <div className='flex gap-1 mb-3'>
          <h2 className="text-sm font-semibold text-gray-600">Created At :</h2>
          <p className="text-gray-400 text-sm">{convertToString(projectDetail.createdAt)}</p>
           <h2 className="text-sm font-semibold text-gray-600 ml-1" >Status</h2>
          <p className="text-sm font-bold text-blue-600">{projectDetail.status}</p>
        </div>
      {/* Project Summary Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6  md:grid-cols-2 gap-6 mb-8">
       
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Progress</h2>
          <p className="text-xl font-bold text-green-600">{projectDetail.progress}%</p>

           <h2 className="text-lg font-semibold text-gray-600">description</h2>
          <p className="text-xl font-bold text-green-600">{projectDetail.description}</p>
        </div>
        <div>
     
         
        </div>
       
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Updated At</h2>
          <p className="text-gray-800">{convertToString(projectDetail.updatedAt)}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Start Date</h2>
          <p className="text-gray-800">{convertToString(projectDetail.startDate)}</p>
        </div>
      </div>

      {/* Members Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className='flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow'>
         {<Profile imageSrc={projectDetail.createdBy.profilePicture} styleProp={'w-8 h-8'}/> }
                      <h2 className="text-lg font-semibold text-gray-600">Owner</h2>
          </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Members</h2>      
             <Link
              className = 'px-2 py-1 bg-blue-600 text-white rounded-sm'
              to={`/home/detail/${id}/member`}>add member</Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectDetail.members.map((m, index) => {
            const profilePic = m.user.profilePicture;         
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                {profilePic ? (
                  <Profile imageSrc={profilePic} styleProp={"w-12 h-12 rounded-full"} />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Pic
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold text-gray-800">{m.user.fullName}</p>
                  <p className="text-sm text-gray-500">{m.role || "Member"}</p>
                </div>

              
              </div>
            );
          })}

        
     
        </div>
      </div>
  </div> }
  </div>
  )
}

export default Overview