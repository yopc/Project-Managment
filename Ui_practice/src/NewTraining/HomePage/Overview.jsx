// import React, { useEffect } from 'react'
// import { ProjectCreator } from '../Store/ProjectCreator'
// import { Link, useParams } from 'react-router-dom';
// import { convertToString } from '../lib/dateCorrector.jsx';
// import Profile from '../../component/Profile'
// import { Authenticatioin } from '../Store/AuthenticateUser.jsx';
// import {io} from 'socket.io-client'

// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";




// const Overview = ({id}) => {
   
//   let userId;
//   const {loadDetail , projectDetail , getProjectById} = ProjectCreator();
  
//      const data = [
//     { name: "Progress", value: projectDetail.progress }
//   ];


    



//   return (
//     <div>
//    {loadDetail ?   
//     <div className="flex items-center justify-center h-64">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
//      </div>
//    : 
//    <div className="p-8 bg-gray-50 min-h-screen">
//        {/* Page Title */}
//         <div className='flex gap-1 mb-3'>
//           <h2 className="text-sm font-semibold text-gray-600">Created At :</h2>
//           <p className="text-gray-400 text-sm">{convertToString(projectDetail.createdAt)}</p>
//            <h2 className="text-sm font-semibold text-gray-600 ml-1" >Status</h2>
//           <p className="text-sm font-bold text-blue-600">{projectDetail.status}</p>
//         </div>
//       {/* Project Summary Card */}
//       <div className="bg-white rounded-2xl shadow-lg p-6  md:grid-cols-2 gap-6 mb-8">
       
//         <div>
//           <h2 className="text-lg font-semibold text-gray-600">Progress</h2>
//        <h2 className="text-lg font-semibold text-gray-600">Progress</h2>
// <div className='w-full h-16'> {/* fixed height */}
//   <ResponsiveContainer width="100%" height="100%" >
//     <BarChart
//       data={[{ name: "Progress", value: projectDetail.progress ?? 0 }]}
//       layout="vertical"
//       margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
//       className='bg-green-50'
//     >
//       <XAxis type="number" domain={[0, 100]} hide />
//       <YAxis type="category" dataKey="name" hide />
//       <Tooltip formatter={(val) => `${val}%`} />

//       <Bar dataKey="value" barSize={30} radius={[10, 10, 10, 10]}>
//         <Cell fill={projectDetail.progress >= 100 ? "#22c55e" : "#6366f1"} />
//       </Bar>
//     </BarChart>
//   </ResponsiveContainer>
// </div>



//            <h2 className="text-lg font-semibold text-gray-600">description</h2>
//           <p className="text-xl font-bold text-green-600">{projectDetail.description}</p>
//         </div>
//         <div>
     
         
//         </div>
       
//         <div>
//           <h2 className="text-lg font-semibold text-gray-600">Updated At</h2>
//           <p className="text-gray-800">{convertToString(projectDetail.updatedAt)}</p>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-600">Start Date</h2>
//           <p className="text-gray-800">{convertToString(projectDetail.startDate)}</p>
//         </div>
//       </div>

//       {/* Members Section */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//           <div className='flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow'>
//          {<Profile imageSrc={projectDetail.createdBy.profilePicture} styleProp={'w-8 h-8'}/> }
//                       <h2 className="text-lg font-semibold text-gray-600">Owner</h2>
//           </div>

//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Members</h2>      
//              <Link
//               className = 'px-2 py-1 bg-blue-600 text-white rounded-sm'
//               to={`/home/detail/${id}/member`}>add member</Link>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {projectDetail.members.map((m, index) => {
//             const profilePic = m.user.profilePicture;         
//             return (
//               <div
//                 key={index}
//                 className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
//               >
//                 {profilePic ? (
//                   <Profile imageSrc={profilePic} styleProp={"w-12 h-12 rounded-full"} />
//                 ) : (
//                   <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//                     No Pic
//                   </div>
//                 )}
//                 <div>
//                   <p className="text-lg font-semibold text-gray-800">{m.user.fullName}</p>
//                   <p className="text-sm text-gray-500">{m.role || "Member"}</p>
//                 </div>

              
//               </div>
//             );
//           })}

        
     
//         </div>
//       </div>
//   </div> }
//   </div>
//   )
// }

// export default Overview




import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectCreator } from '../Store/ProjectCreator';
import { convertToString } from '../lib/dateCorrector.jsx';
import Profile from '../../component/Profile';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Completed: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  OnHold: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200',
  Cancelled: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
};

const Overview = ({ id }) => {
  const { loadDetail, projectDetail } = ProjectCreator();

  const title = projectDetail?.name || 'Project Overview';
  const status = projectDetail?.status || 'Pending';
  const progress = Math.min(100, Math.max(0, Number(projectDetail?.progress) || 0));
  const description = projectDetail?.description || 'No description provided.';
  const createdAt = projectDetail?.createdAt ? convertToString(projectDetail.createdAt) : '—';
  const updatedAt = projectDetail?.updatedAt ? convertToString(projectDetail.updatedAt) : '—';
  const startDate = projectDetail?.startDate ? convertToString(projectDetail.startDate) : '—';
  const owner = projectDetail?.createdBy;
  const members = Array.isArray(projectDetail?.members) ? projectDetail.members : [];

  const progressData = [{ name: 'Progress', value: progress }];

  return (
    <div className="min-h-screen bg-gray-50">
      {loadDetail ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="mx-auto max-w-7xl p-6 lg:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>Created</span>
                <span className="font-medium text-gray-700">{createdAt}</span>
                <span className="h-4 w-px bg-gray-300" />
                <span>Status</span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status] || statusStyles.Pending}`}>
                  {status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={`/home/detail/${id}/member`}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add Member
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                <div className="border-b border-gray-100 px-6 py-4">
                  <h2 className="text-sm font-semibold text-gray-700">Summary</h2>
                </div>
                <div className="grid gap-6 p-6 md:grid-cols-2">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-600">Progress</h3>
                        <span className="text-xs font-semibold text-indigo-600">{progress}%</span>
                      </div>
                      <div className="mt-3 w-full rounded-xl bg-indigo-50 p-3">
                        <div className="h-24 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={progressData}
                              layout="vertical"
                              margin={{ top: 8, right: 16, left: 16, bottom: 8 }}
                            >
                              <XAxis type="number" domain={[0, 100]} hide />
                              <YAxis type="category" dataKey="name" hide />
                              <Tooltip formatter={(val) => `${val}%`} />
                              <Bar dataKey="value" barSize={28} radius={[14, 14, 14, 14]}>
                                <Cell fill={progress >= 100 ? '#16a34a' : '#4f46e5'} />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-600">Description</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-800">{description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-gray-100 p-4">
                      <p className="text-xs text-gray-500">Updated</p>
                      <p className="mt-1 text-sm font-semibold text-gray-800">{updatedAt}</p>
                    </div>
                    <div className="rounded-xl border border-gray-100 p-4">
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="mt-1 text-sm font-semibold text-gray-800">{startDate}</p>
                    </div>
                    <div className="rounded-xl border border-gray-100 p-4 col-span-2">
                      <p className="text-xs text-gray-500">Owner</p>
                      <div className="mt-2 flex items-center gap-3">
                        {owner?.profilePicture ? (
                          <Profile imageSrc={owner.profilePicture} styleProp={'w-9 h-9 rounded-full'} />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600">
                            —
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{owner?.fullName || 'Unknown'}</p>
                          <p className="text-xs text-gray-500">Project Owner</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                <div className="border-b border-gray-100 px-6 py-4">
                  <h2 className="text-sm font-semibold text-gray-700">Details</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status] || statusStyles.Pending}`}>
                      {status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-semibold text-gray-900">{progress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Members</span>
                    <span className="text-sm font-semibold text-gray-900">{members.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Project Members</h2>
              <Link
                to={`/home/detail/${id}/member`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Manage
              </Link>
            </div>
            <div className="p-6">
              {members.length === 0 ? (
                <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-200 p-10 text-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">No members yet</p>
                    <p className="mt-1 text-sm text-gray-500">Invite your team to collaborate on this project.</p>
                    <Link
                      to={`/home/detail/${id}/member`}
                      className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                    >
                      Add Member
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((m, index) => {
                    const profilePic = m?.user?.profilePicture;
                    const fullName = m?.user?.fullName || 'Unnamed User';
                    const role = m?.role || 'Member';
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 hover:shadow-sm"
                      >
                        {profilePic ? (
                          <Profile imageSrc={profilePic} styleProp={'w-12 h-12 rounded-full'} />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-600">
                            —
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">{fullName}</p>
                          <p className="text-xs text-gray-500">{role}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;