import React from 'react'
import { Authenticatioin } from '../Store/AuthenticateUser'
import { useEffect , useState} from 'react';
import Profile from '../../component/Profile.jsx'
import { ProjectCreator } from '../Store/ProjectCreator.jsx';
import { useActivityLog } from '../Store/useActivityLog.jsx';
import { convertToString } from '../lib/dateCorrector.jsx';

const Message = ({id}) => {

  const {activities , activityForProject,markAsRead, getUnreadCount, getActivityByProjectId} =  useActivityLog();
  const {authUser} = Authenticatioin();
  useEffect(() => {
    // getActivityForCurrentUser();   
    getActivityByProjectId(id)

    markAsRead(id).then(() => getUnreadCount())
  }, [id])


  
 
//  useEffect(() => {
//     if (! || !socket) return;

//     // 👉 Join the project room
//     socket.emit("joinProject", id);
//     console.log("Joined project room:", id);

//     // 👉 Listen for notifications inside this project
//     const handler = (notif) => {
//       console.log("📩 Project update:", notif);
//       toast.info(notif.description || notif.action);
//     };

//     socket.on("projectNotification", handler);

//     return () => {
//       // 👉 Cleanup when leaving the page
//       socket.emit("leaveProject", id);
//       socket.off("projectNotification", handler);
//       console.log("Left project room:", id);
//     };
//   }, [id, socket]);

   console.log('parent project id  ' + activityForProject.readBy)

   activityForProject.map((a) => {
    a.readBy.forEach(
      (a) => console.log('reader' + a + "userId" + authUser?._id)
    )
   })

  return (
    <div className='p-6 space-y-5 grid grid-cols-3 gap-x-1 '>

      {
        activityForProject.map((a) => (
          <div className='flex-col space-y-1 p-6 border border-gray-300 rounded-md relative'>

            <div className='flex gap-2  p-1 absolute border border-grey-500 -top-4 left-4 bg-white  rounded-lg'>
            <Profile imageSrc={a.user.profilePicture} styleProp={'h-8 w-8'}/>
            <h1>{a.user.fullName}</h1>         
            {/* <h1>{a.parentProject}</h1>          */}
           

            </div>
        
            <div className='text-sm'>{a.details.description}</div>          
            {/* <h1 className=''>{a.resource.title}</h1>           */}
             <h3>{convertToString(a.createdAt)}</h3>
            
{Array.isArray(a.readBy) && authUser?.employee._id ? (
  !a.readBy.some(userId => userId?.toString() === authUser?.employee._id.toString()) ? (
    <h1>new</h1>
  ) : null
) : null}



          </div>
        ))
      }
    </div>
  )
}

export default Message