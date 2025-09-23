// // import React, { useEffect } from 'react'
// // import { ProjectCreator } from '../Store/ProjectCreator'
// // import { Link, useParams } from 'react-router-dom';
// // import { convertToString } from '../lib/dateCorrector.jsx';
// // import Profile from '../../component/Profile'
// // import { Authenticatioin } from '../Store/AuthenticateUser.jsx';
// // import {io} from 'socket.io-client'

// // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";




// // const Overview = ({id}) => {
   
// //   let userId;
// //   const {loadDetail , projectDetail , getProjectById} = ProjectCreator();
  
// //      const data = [
// //     { name: "Progress", value: projectDetail.progress }
// //   ];


    



// //   return (
// //     <div>
// //    {loadDetail ?   
// //     <div className="flex items-center justify-center h-64">
// //         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
// //      </div>
// //    : 
// //    <div className="p-8 bg-gray-50 min-h-screen">
// //        {/* Page Title */}
// //         <div className='flex gap-1 mb-3'>
// //           <h2 className="text-sm font-semibold text-gray-600">Created At :</h2>
// //           <p className="text-gray-400 text-sm">{convertToString(projectDetail.createdAt)}</p>
// //            <h2 className="text-sm font-semibold text-gray-600 ml-1" >Status</h2>
// //           <p className="text-sm font-bold text-blue-600">{projectDetail.status}</p>
// //         </div>
// //       {/* Project Summary Card */}
// //       <div className="bg-white rounded-2xl shadow-lg p-6  md:grid-cols-2 gap-6 mb-8">
       
// //         <div>
// //           <h2 className="text-lg font-semibold text-gray-600">Progress</h2>
// //        <h2 className="text-lg font-semibold text-gray-600">Progress</h2>
// // <div className='w-full h-16'> {/* fixed height */}
// //   <ResponsiveContainer width="100%" height="100%" >
// //     <BarChart
// //       data={[{ name: "Progress", value: projectDetail.progress ?? 0 }]}
// //       layout="vertical"
// //       margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
// //       className='bg-green-50'
// //     >
// //       <XAxis type="number" domain={[0, 100]} hide />
// //       <YAxis type="category" dataKey="name" hide />
// //       <Tooltip formatter={(val) => `${val}%`} />

// //       <Bar dataKey="value" barSize={30} radius={[10, 10, 10, 10]}>
// //         <Cell fill={projectDetail.progress >= 100 ? "#22c55e" : "#6366f1"} />
// //       </Bar>
// //     </BarChart>
// //   </ResponsiveContainer>
// // </div>



// //            <h2 className="text-lg font-semibold text-gray-600">description</h2>
// //           <p className="text-xl font-bold text-green-600">{projectDetail.description}</p>
// //         </div>
// //         <div>
     
         
// //         </div>
       
// //         <div>
// //           <h2 className="text-lg font-semibold text-gray-600">Updated At</h2>
// //           <p className="text-gray-800">{convertToString(projectDetail.updatedAt)}</p>
// //         </div>
// //         <div>
// //           <h2 className="text-lg font-semibold text-gray-600">Start Date</h2>
// //           <p className="text-gray-800">{convertToString(projectDetail.startDate)}</p>
// //         </div>
// //       </div>

// //       {/* Members Section */}
// //       <div className="bg-white rounded-2xl shadow-lg p-6">
// //           <div className='flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow'>
// //          {<Profile imageSrc={projectDetail.createdBy.profilePicture} styleProp={'w-8 h-8'}/> }
// //                       <h2 className="text-lg font-semibold text-gray-600">Owner</h2>
// //           </div>

// //         <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Members</h2>      
// //              <Link
// //               className = 'px-2 py-1 bg-blue-600 text-white rounded-sm'
// //               to={`/home/detail/${id}/member`}>add member</Link>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {projectDetail.members.map((m, index) => {
// //             const profilePic = m.user.profilePicture;         
// //             return (
// //               <div
// //                 key={index}
// //                 className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
// //               >
// //                 {profilePic ? (
// //                   <Profile imageSrc={profilePic} styleProp={"w-12 h-12 rounded-full"} />
// //                 ) : (
// //                   <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
// //                     No Pic
// //                   </div>
// //                 )}
// //                 <div>
// //                   <p className="text-lg font-semibold text-gray-800">{m.user.fullName}</p>
// //                   <p className="text-sm text-gray-500">{m.role || "Member"}</p>
// //                 </div>

              
// //               </div>
// //             );
// //           })}

        
     
// //         </div>
// //       </div>
// //   </div> }
// //   </div>
// //   )
// // }

// // export default Overview




// import React, { useState , useEffect, useMemo} from 'react';
// import { Link } from 'react-router-dom';
// import { ProjectCreator } from '../Store/ProjectCreator';
// import { convertToString } from '../lib/dateCorrector.jsx';
// import Profile from '../../component/Profile';
// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
// import Button from '../components/ui/Button.jsx';
// import { Pencil } from 'lucide-react';
// import TextArea from '../components/ui/TextArea.jsx';
// import Dialog from '../components/ui/Dialog.jsx';

// const statusStyles = {
//   Active: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
//   Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
//   Completed: 'bg-green-50 text-green-700 ring-1 ring-blue-200',
//   OnHold: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200',
//   Cancelled: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
// };

// const Overview = ({ id }) => {
//   const { loadDetail, projectDetail , getProjectById,errorMessage,setErrorMessage, updateProject } = ProjectCreator();
//   const [isEdit , setIsEdit] = useState(false)
//   const title = projectDetail?.title || 'Project Overview';
//   const status = projectDetail?.status || 'Pending';
//   const progress = Math.min(100, Math.max(0, Number(projectDetail?.progress) || 0));
//   const createdAt = projectDetail?.createdAt ? convertToString(projectDetail.createdAt) : '—';
//   const updatedAt = projectDetail?.updatedAt ? convertToString(projectDetail.updatedAt) : '—';
//   const startDate = projectDetail?.startDate ? convertToString(projectDetail.startDate) : '—';
//   const owner = projectDetail?.createdBy;
//   const members = Array.isArray(projectDetail?.members) ? projectDetail.members : [];
//      const [showDialog, setShowDialog] = useState(false);
  
//   const description = projectDetail?.description || 'No description provided.';
//   const [editedDisc , setEditedDesc] = useState(projectDetail?.description);
  
//   // Update the state when projectDetail changes
// useEffect(() => {
//   if (id) {
//     getProjectById(id);
//   }
// }, []);


  
  
//  const progressData = useMemo(
//   () => [{ name: 'Progress', value: progress }],
//   [progress]
// );


//   const [formData, setFormData] = useState({
//       title: '',
//       status: '',
//       startDate: '',
//       description: ''
//     });

// //   useEffect(() => {
// //   if (projectDetail) {
// //     setFormData({
// //       title: projectDetail.title,
// //       status: projectDetail.status,
// //       startDate: projectDetail.startDate,
// //       description: projectDetail.description
// //     });
// //   }
// // }, [projectDetail]);



// useEffect(() => {
//   if (projectDetail) {
//     setFormData(prev => {
//       // Only set if prev is empty (initial load), so typing won't reset it
//       if (!prev.title && !prev.status && !prev.startDate && !prev.description) {
//         return {
//           title: projectDetail.title || '',
//           status: projectDetail.status || '',
//           startDate: projectDetail.startDate || '',
//           description: projectDetail.description || ''
//         };
//       }
//       return prev;
//     });
//   }
// }, [projectDetail]);



//     const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };


//    const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Project Data:", formData);
//     updateProject(formData , id);
//   }; 

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {loadDetail ? (
//         <div className="flex items-center justify-center h-[60vh]">
//           <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//         </div>
//       ) : (
//         <div className="mx-auto max-w-7xl p-6 lg:p-10">
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
//                 <span>Created</span>
//                 <span className="font-medium text-gray-700">{createdAt}</span>
//                 <span className="h-4 w-px bg-gray-300" />
//                 <span>Status</span>
//                 <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status] || statusStyles.Pending}`}>
//                   {status}
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">

//               <Button
//               variant='outline'
//               onClick={() => setShowDialog(!showDialog)}
//               size={'sm'}
//               className='text-black'>  
//                 edit
//               </Button>
              
//               <Link
//                 to={`/home/detail/${id}/member`}
//                 className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 Add Member
//               </Link>
//             </div>
//           </div>
//                   <Dialog
//           isOpen = {showDialog}
//           onClose={() => {setShowDialog(false); setErrorMessage(null)}}
//           title="Edit Project"
//           style={'w-800'}
//           footer={
//             <div className='flex items-end gap-2 w-full '>
//                <Button size="sm" onClick={() => {setShowDialog(false) , setErrorMessage(null)}}>cancle</Button>
//                <Button size="sm" onClick= {(e) => handleSubmit(e)}>update</Button>
//             </div>
//           }>
//           <div className="flex flex-col gap-1 text-black">
//          <label for='title'>title</label>
//          <input id='title' name='title' className='border border-black' value={formData.title} onChange={(e) => handleChange(e)}/>
//         {/* <input name='status' className='border border-black' onChange={(e) => handleChange(e)}/> */}
//          <label for = 'projectStatus'>Select Project Status</label>
//          <select name = 'status' id = 'projectStatus' value={formData.status} onChange={(e) => handleChange(e)}>
//               <option value="Planning">Planning</option>
//               <option value="In Progress">In Progress</option>
//               <option value="On Hold">On Hold</option>
//               <option value="Completed">Completed</option>
//               <option value="Cancelled">Cancelled</option>
//          </select>
//          <label for='date'>Date</label>
//         <input id='date' type='date' name='startDate' value={formData.startDate} className='border border-black' onChange={(e) => handleChange(e)}/>
//         <textarea type='text' name='description' className='border-black border h-40' value={formData.description}  placeholder='desciption' onChange={(e) => handleChange(e)}/>
//         {errorMessage && <span className='font-roboto text-sm text-red-300'>{errorMessage}</span>}
//           </div>
//           </Dialog>

//           <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
//             <div className="lg:col-span-8">
//               <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
//                 <div className="border-b border-gray-100 px-6 py-4">
//                   <h2 className="text-sm font-semibold text-gray-700">Summary</h2>
//                 </div>
//                 <div className="grid gap-6 p-6 md:grid-cols-2">
//                   <div className="flex flex-col gap-4">
//                     <div>
//                       <div className="flex items-center justify-between">
//                         <h3 className="text-sm font-medium text-gray-600">Progress</h3>
//                         <span className="text-xs font-semibold text-indigo-600">{progress}%</span>
//                       </div>
//                       <div className="mt-3 w-full rounded-xl bg-indigo-50 p-3">
//                         <div className="h-24 w-full">
//                           {/* <ResponsiveContainer width="100%" height="120px">
//                         <BarChart
//                               data={progressData}
//                               layout="vertical"
//                               margin={{ top: 8, right: 16, left: 16, bottom: 8 }}
//                             >
//                               <XAxis type="number" domain={[0, 100]} />
//                               <YAxis type="category" dataKey="name" />
//                               <Tooltip formatter={(val) => `${val}%`} />
//                               <Bar dataKey="value" barSize={28} radius={[14, 14, 14, 14]}>
//                                 <Cell fill={progress >= 100 ? '#16a34a' : '#4f46e5'} />
//                               </Bar>
//                             </BarChart>                           
//                           </ResponsiveContainer> */}


//                           {/* <ResponsiveContainer width="100%" height="100%">
//                             <BarChart
//                               data={progressData}
//                               layout="vertical"
//                               margin={{ top: 8, right: 16, left: 16, bottom: 8 }}
//                             >
//                               <XAxis type="number" domain={[0, 100]} hide/>
//                               <YAxis type="category" dataKey="name" hide />
//                               <Tooltip formatter={(val) => `${val}%`} />
//                               <Bar dataKey="value" barSize={28} radius={[14, 14, 14, 14]}>
//                                 <Cell fill={progress >= 100 ? '#16a34a' : '#4f46e5'} />
//                               </Bar>
//                             </BarChart>
//                           </ResponsiveContainer> */}


//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-sm font-medium text-gray-600">Description</h3>
//                       <p className="mt-2 text-sm leading-6 text-gray-800">{description}</p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="rounded-xl border border-gray-100 p-4">
//                       <p className="text-xs text-gray-500">Updated</p>
//                       <p className="mt-1 text-sm font-semibold text-gray-800">{updatedAt}</p>
//                     </div>
//                     <div className="rounded-xl border border-gray-100 p-4">
//                       <p className="text-xs text-gray-500">Start Date</p>
//                       <p className="mt-1 text-sm font-semibold text-gray-800">{startDate}</p>
//                     </div>
//                     <div className="rounded-xl border border-gray-100 p-4 col-span-2">
//                       <p className="text-xs text-gray-500">Owner</p>
//                       <div className="mt-2 flex items-center gap-3">
//                         {owner?.profilePicture ? (
//                           <Profile imageSrc={owner.profilePicture} styleProp={'w-9 h-9 rounded-full'} />
//                         ) : (
//                           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600">
//                             —
//                           </div>
//                         )}
//                         <div>
//                           <p className="text-sm font-semibold text-gray-900">{owner?.fullName || 'Unknown'}</p>
//                           <p className="text-xs text-gray-500">Project Owner</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>              
//             </div>

//             <div className="lg:col-span-4">
//               <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
//                 <div className="border-b border-gray-100 px-6 py-4">
//                   <h2 className="text-sm font-semibold text-gray-700">Details</h2>
//                 </div>
//                 <div className="p-6 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">Status</span>
//                     <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status] || statusStyles.Pending}`}>
//                       {status}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">Progress</span>
//                     <span className="text-sm font-semibold text-gray-900">{progress}%</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">Members</span>
//                     <span className="text-sm font-semibold text-gray-900">{members.length}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
//             <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-sm font-semibold text-gray-700">Description</h2>
//                <div>

//             {/* <Button size='sm' variant='outline' className='flex items-center gap-1'
//               onClick={() => setIsEdit(!isEdit)}>
//             <Pencil size={13}/>
//               edit
//             </Button>   
//              {  isEdit &&   <Button size='sm' variant='outline' className='flex items-center gap-1'
//               onClick={() => updateDescription(editedDisc)}>
//                save
//               </Button>} */}
              
//                </div>
//             </div>
//             { isEdit ?  
//             <TextArea 
//             description={editedDisc} 
//             handleChange={(e) => setEditedDesc(e.target.value)}/>
//             :
//             <div className='flex items-center m-6 p-2'>
//                <p className="mt-2 text-sm leading-6 text-gray-800">{description}</p>
//             </div>
//             }
//           </div>

//           <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
//             <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-sm font-semibold text-gray-700">Project Members</h2>
//               <Link
//                 to={`/home/detail/${id}/member`}
//                 className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
//               >
//                 Manage
//               </Link>
//             </div>
//             <div className="p-6">
//               {members.length === 0 ? (
//                 <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-200 p-10 text-center">
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">No members yet</p>
//                     <p className="mt-1 text-sm text-gray-500">Invite your team to collaborate on this project.</p>
//                     <Link
//                       to={`/home/detail/${id}/member`}
//                       className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
//                     >
//                       Add Member
//                     </Link>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                   {members.map((m, index) => {
//                     const profilePic = m?.user?.profilePicture;
//                     const fullName = m?.user?.fullName || 'Unnamed User';
//                     const role = m?.role || 'Member';
//                     return (
//                       <div
//                         key={index}
//                         className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 hover:shadow-sm"
//                       >
//                         {profilePic ? (
//                           <Profile imageSrc={profilePic} styleProp={'w-12 h-12 rounded-full'} />
//                         ) : (
//                           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-600">
//                             —
//                           </div>
//                         )}
//                         <div className="min-w-0">
//                           <p className="truncate text-sm font-semibold text-gray-900">{fullName}</p>
//                           <p className="text-xs text-gray-500">{role}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Overview;





import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProjectCreator } from '../Store/ProjectCreator';
import { convertToString } from '../lib/dateCorrector.jsx';
import Profile from '../../component/Profile';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import Button from '../components/ui/Button.jsx';
import TextArea from '../components/ui/TextArea.jsx';
import Dialog from '../components/ui/Dialog.jsx';
import LinearProgress from '@mui/material/LinearProgress';

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Completed: 'bg-green-50 text-green-700 ring-1 ring-blue-200',
  OnHold: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200',
  Cancelled: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
};

/* Memoized chart component:
   - fixed pixel height wrapper (prevents ResponsiveContainer from repeatedly measuring)
   - isAnimationActive={false} (reduces layout thrash)
   - React.memo to avoid rerenders from parent typing
*/
const ProgressChart = React.memo(function ProgressChart({ progress }) {
  const data = useMemo(() => [{ name: 'Progress', value: progress }], [progress]);

  return (
    <div style={{ width: '100%', height: 120 /* fixed height in px */ }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 16, bottom: 8 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip formatter={(val) => `${val}%`} />
          <Bar dataKey="value" barSize={28} radius={[14, 14, 14, 14]} isAnimationActive={false}>
            <Cell fill={progress >= 100 ? '#16a34a' : '#4f46e5'} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
ProgressChart.displayName = 'ProgressChart';

const Overview = ({ id }) => {
  const { loadDetail, projectDetail, getProjectById, errorMessage, setErrorMessage, updateProject } = ProjectCreator();

  const [isEdit, setIsEdit] = useState(false);
  const title = projectDetail?.title || 'Project Overview';
  const status = projectDetail?.status || 'Pending';

  // local progress state that we capture only once (first time projectDetail.progress is available)
  const [progress, setProgress] = useState(0);
  const initialProgressCaptured = useRef(false);

  useEffect(() => {
    if (projectDetail?.progress != null && !initialProgressCaptured.current) {
      const p = Math.min(100, Math.max(0, Number(projectDetail.progress) || 0));
      setProgress(p);
      initialProgressCaptured.current = true; // ensure we only set once
    }
  }, [projectDetail?.progress]);

  const createdAt = projectDetail?.createdAt ? convertToString(projectDetail.createdAt) : '—';
  const dueDate = projectDetail?.createdAt ? convertToString(projectDetail.dueDate) : '—';
  const updatedAt = projectDetail?.updatedAt ? convertToString(projectDetail.updatedAt) : '—';
  const startDate = projectDetail?.startDate ? convertToString(projectDetail.startDate) : '—';
  const owner = projectDetail?.createdBy;
  const members = Array.isArray(projectDetail?.members) ? projectDetail.members : [];
  const [showDialog, setShowDialog] = useState(false);

  const description = projectDetail?.description || 'No description provided.';
  const [editedDisc, setEditedDesc] = useState(projectDetail?.description);

  // load project once on mount
  useEffect(() => {
    if (id) getProjectById(id);
    // intentionally empty deps so it fetches once; if you want to refetch when id changes, add [id]
  }, []); // eslint-disable-line

  // chart data memo
  const progressData = useMemo(() => [{ name: 'Progress', value: progress }], [progress]);

  // form data is initialized when user opens the edit dialog to avoid resetting while typing
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    startDate: '',
    description: ''
  });

  // when opening edit dialog, initialize form from projectDetail (one time)
  const openEditDialog = () => {
    setFormData({
      title: projectDetail?.title ?? '',
      status: projectDetail?.status ?? '',
      startDate: projectDetail?.startDate ?? '',
      description: projectDetail?.description ?? ''
    });
    setShowDialog(true);
    setErrorMessage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // optionally, if the user updates progress in the form, reflect it in the chart
    // e.g. if formData.progress exists: setProgress(Number(formData.progress) || progress)
    updateProject(formData, id);
    setShowDialog(false);
  };

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
              <Button variant="outline" onClick={openEditDialog} size={'sm'} className="text-black">
                edit
              </Button>

              <Link
                to={`/home/detail/${id}/member`}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add Member
              </Link>
            </div>
          </div>

          <Dialog
            isOpen={showDialog}
            onClose={() => {
              setShowDialog(false);
              setErrorMessage(null);
            }}
            title="Edit Project"
            style={'w-800'}
            footer={
              <div className="flex items-end gap-2 w-full ">
                <Button size="sm" onClick={() => { setShowDialog(false); setErrorMessage(null); }}>
                  cancel
                </Button>
                <Button size="sm" onClick={(e) => handleSubmit(e)}>update</Button>
              </div>
            }
          >
            <div className="flex flex-col gap-1 text-black">
              <label htmlFor="title">title</label>
              <input id="title" name="title" className="border border-black" value={formData.title} onChange={(e) => handleChange(e)} />
              <label htmlFor="projectStatus">Select Project Status</label>
              <select name="status" id="projectStatus" value={formData.status} onChange={(e) => handleChange(e)}>
                <option value="">-- Select --</option>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <label htmlFor="date">Date</label>
              <input id="date" type="date" name="startDate" value={formData.startDate} className="border border-black" onChange={(e) => handleChange(e)} />
              <textarea name="description" className="border-black border h-40" value={formData.description} placeholder="description" onChange={(e) => handleChange(e)} />
              {errorMessage && <span className="font-roboto text-sm text-red-300">{errorMessage}</span>}
            </div>
          </Dialog>

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
                        <span className="text-xs font-semibold text-indigo-600">{projectDetail?.progress}%</span>
                      </div>
                      <div className="mt-3 w-full rounded-xl bg-indigo-50 p-3">
                        <div className="h-24 w-full items-center justify-center">
                          {/* <-- use memoized ProgressChart with fixed height */}
                          {/* <ProgressChart progress={progress} /> */}

                           <LinearProgress
                                    variant="determinate"
                                    value={projectDetail?.progress}
                                    sx={{
                                      height: 50,
                                    
                                      borderRadius: 6,
                                      backgroundColor: "#f1f5f9",
                                      "& .MuiLinearProgress-bar": {
                                        backgroundColor: "#3b82f6",
                                      },
                                    }}
                                  />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-600">Due Date</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-800">{dueDate}</p>
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
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600">—</div>
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
                    <span className="text-sm font-semibold text-gray-900">{projectDetail?.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Members</span>
                    <span className="text-sm font-semibold text-gray-900">{members.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* rest of page (description, members) unchanged */}
          <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Description</h2>
            </div>
            {isEdit ? (
              <TextArea description={editedDisc} handleChange={(e) => setEditedDesc(e.target.value)} />
            ) : (
              <div className="flex items-center m-6 p-2">
                <p className="mt-2 text-sm leading-6 text-gray-800">{description}</p>
              </div>
            )}
          </div>

          <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Project Members</h2>
              <Link to={`/home/detail/${id}/member`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Manage</Link>
            </div>
            <div className="p-6">
              {members.length === 0 ? (
                <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-200 p-10 text-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">No members yet</p>
                    <p className="mt-1 text-sm text-gray-500">Invite your team to collaborate on this project.</p>
                    <Link to={`/home/detail/${id}/member`} className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">Add Member</Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((m, index) => {
                    const profilePic = m?.user?.profilePicture;
                    const fullName = m?.user?.fullName || 'Unnamed User';
                    const role = m?.role || 'Member';
                    return (
                      <div key={index} className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 hover:shadow-sm">
                        {profilePic ? (
                          <Profile imageSrc={profilePic} styleProp={'w-12 h-12 rounded-full'} />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-600">—</div>
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
