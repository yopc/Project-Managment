    import React, { useRef } from 'react'
    import { useEffect } from 'react';
    import { useParams } from 'react-router-dom'
    
    import useTaskStore from '../Store/taskStore';
    import { ProjectCreator } from '../Store/ProjectCreator';
    import Profile from '../../component/Profile';
import { useState } from 'react';
import { convertToString } from '../lib/dateCorrector';

import Badge from '../components/ui/Badge.jsx'
import { Calendar, 
  Clock, 
  FileText, 
  Download, 
  UserPlus, 
  Upload,
  AlertCircle,
  CheckCircle,
  Timer,
  CircleX} from 'lucide-react'

 const assignees = [
    {
      id: "emp-1",
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      role: "Senior Developer"
    },
    {
      id: "emp-2", 
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      role: "UI/UX Designer"
    },
    {
      id: "emp-3",
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", 
      role: "Backend Developer"
    }
  ];

  
  const Avatar = ({ src, alt, fallback }) => {
    const handleImageError = (e) => {
      const target = e.target
      const fallbackElement = target.nextElementSibling 
      target.style.display = 'none';
      if (fallbackElement) {
        fallbackElement.style.display = 'flex';
      }
    };

    return (
      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hidden items-center justify-center font-medium text-sm">
          {fallback}
        </div>
      </div>
    );
  };
 const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": 
        return <CheckCircle className="h-4 w-4" />;
      case "In Progress": 
        return <Timer className="h-4 w-4" />;
      case "Pending": 
        return <AlertCircle className="h-4 w-4" />;
      default: 
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed": 
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "In Progress": 
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "Pending": 
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      default: 
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const CardHeader = ({ children , className}) => (
    //flex-col 
  <div className={` flex space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
  );

   const CardTitle = ({ children }) => (
    <h3 className="font-semibold leading-none tracking-tight">
      {children}
    </h3>
  )

  const CardContent = ({ children, className = ""}) => (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );




   const Button = ({ 
    children, 
    variant = "default", 
    size = "default", 
    className = "",
    onClick
  }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variantStyles = {
      default: "bg-gray-900 text-white hover:bg-gray-800 shadow dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200",
      outline: "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-100",
      ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
    };
    
    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-md px-3",
      lg: "h-11 rounded-md px-8"
    };
    
    return (
      <button 
        className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.default} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  // Custom Card Component
  const Card = ({ children, className = "" }) => (
    <div className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 ${className}`}>
      {children}
    </div>
  );
    const TaskDetail = () => {
    const {id, taskId} = useParams();
    console.log('task id is ' + taskId)
    const {task , getTaskById, assignEmployeeToTask , addSubmition} = useTaskStore()
    const {projectDetail , getProjectById} = ProjectCreator();
    const [selectedMember , setSelectedMember] = useState([]);
    const [selectedFiles , setSelectedFiles] = useState([])
    const fileInputRef = useRef(null);
    const [toggleSelectEmployee, setToggleSelectEmployee] = useState(false);

        // useEffect(() => {
        //   getTaskById(taskId)
        // }, [taskId])

        useEffect(() => {
            getProjectById(id)
        },[id])    

        useEffect(() => {
            getTaskById(taskId)
        },[])
    
    projectDetail.members.map((m) => (
        console.log('logged id of member '+m.user._id)
    ))
    function toggleSelection(id , isChecked){
        
        setSelectedMember((prev) => 
         isChecked ?
         [...prev , id]
        : selectedMember.filter((m) => (m !== id)))
    }
    console.log('selected employee == ' + selectedMember)
   

  const handleRemoveFile = (indexToRemove) => {
      setSelectedFiles((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
  };
  
   task?.assignees.forEach((a) => {
      console.log('full name '+a.fullName)
      console.log('jop title '+a.JopTitle)
   })
    
    return (
//         <div>
//             <button
//              className = "bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
//              onClick={() => (assignEmployeeToTask(taskId , selectedMember))}>assigne</button>
//             <input type="file" 
//               name='submmitedFiles'
//               onChange={(e) => (setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]))}
//               multiple
//             />
//              <div>
//                    {selectedFiles.length > 0 && (
//                     <button onClick={() => addSubmition(taskId, selectedFiles)}>
//                        Submmit File
//                     </button>
//                 )}
//              </div>
//             {selectedFiles.map((file, index) => 
//              <div> <h1>{file.name}</h1>
//              <button onClick={() => handleRemoveFile(index)}>remove</button>
//              </div>
//              )}

//                 <h1>{task?.title}</h1>
//                 <h1>{task?._id}</h1>
//              {Array.isArray(task?.submitedFile) && task.submitedFile.length > 0 ? (
//   task.submitedFile.map((file, index) => {
//     if (!file?.data) return null; // skip empty files

//     const keyIndex = file.data.indexOf("data");
//     const fileName =
//       keyIndex !== -1 ? file.data.substring(0, keyIndex).trim() : `file-${index}`;
//     const data =
//       keyIndex !== -1 ? file.data.substring(keyIndex).trim() : file.data;

//     return (
//       <div key={index}>
//         <a href={data} download={fileName || `file-${index}`}>
//           {fileName}
//         </a>
//         <h1>{file?.uploadedBy.fullName}</h1>
//         <h1>{convertToString(file?.date)}</h1>
//       </div>
//     );
//   })
// ) : (
//   <p>No submitted files</p>
// )}


//             {projectDetail?.members.map((m) => (
            
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
//                 <input
//                      name='memberid'
//                      type='checkbox'
//                      checked = {selectedMember.some((memId) => memId === m.user._id)}
//                      onChange={(e) => toggleSelection(m.user._id,e.target.checked)}/>
//                 <Profile imageSrc={m.user.profilePicture} styleProp={'w-8 h-8'}/>
//                  <div>
//                   <p className="text-lg font-semibold text-gray-800">{m.user.fullName}</p>
//                   <p className="text-sm text-gray-500">{m.role || "Member"}</p>
//                  </div>

//              </div>
//              </div>
            
//             // <img src={m.user.profilePicture}/>
            
            
            
//             ))} 
            
//         </div>


   <div className="max-w-6xl mx-auto p-6 space-y-6">
<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
  {/* Left side */}
  <div className="space-y-2">
    <div className="flex flex-wrap items-center gap-3">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold font-roboto text-gray-900 dark:text-gray-100">
       {task?.title}
      </h1>
      <Badge variant="destructive">
       {task?.priority}
      </Badge>
    </div>

    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
      <span className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        <h5 className="font-roboto">Due: {convertToString(task?.updatedAt)}</h5>
      </span>
    </div>
  </div>

  {/* Right side */}
  <div className="flex items-center gap-3">
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full whitespace-nowrap ${getStatusStyles(
        task?.status
      )}`}
    >
      {getStatusIcon(task?.status)}
      <span className="font-medium font-roboto whitespace-nowrap">
        {task?.status}
      </span>
    </div>
  </div>
</div>


         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                          <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                           {task?.description}
                          </p>
                        </CardContent>
                      </Card>

                     
                        
                      <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Submitted Files ({task?.submitedFile.length})</CardTitle>
                         <input type="file" 
                          name='submmitedFiles'
                          onChange={(e) => (setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]))}
                          multiple
                          className='hidden'
                         ref={fileInputRef}
                        />
                        
                        <Button onClick={() => fileInputRef.current.click()} variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>

                       
                      </CardHeader>
                       {/* selected file preview */}
                       <CardContent className='space-y-3'>
                        {selectedFiles.map((file, index) => (
                          <div key={index} className='flex items-center justify-between p-4 border  border-gray-200 dark:border-gray-700 rounded-lg'> 
                              <div className='flex items-center gap-3'>
                                  <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                  </div>

                                   <div>
                                      <p className="font-medium text-gray-900 dark:text-gray-100">{file.name}</p>                                    
                                    </div>
                              </div>
                               
                               <button onClick={() => handleRemoveFile(index)}>
                                <CircleX/>                                
                                </button>
                          </div>
                        ))}

                                             {selectedFiles.length > 0 && (
                         <Button variant="gohst" className="w-fit" onClick={() => addSubmition(taskId, selectedFiles)}>
                          <Upload className="h-4 w-4 mr-2" />
                          Submit Files
                        </Button>
                          )}
                       </CardContent>
 
                      <CardContent className="space-y-4">
                        {Array.isArray(task?.submitedFile) && task.submitedFile.length > 0  ?  
                        (
                        
                        task.submitedFile.map((file) => {
                          console.log('jop title'+ task?.createdBy.JopTitle)
                          console.log('fullName title'+ task?.createdBy.fullName)

                          if (!file?.data) return null; // skip empty files

                          const keyIndex = file.data.indexOf("data");
                          const fileName = keyIndex !== -1 ? file.data.substring(0, keyIndex).trim() : `file-${index}`;
                          const data = keyIndex !== -1 ? file.data.substring(keyIndex).trim() : file.data;

                          return (
                          <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{fileName}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Uploaded by {file.uploadedBy.fullName} on {convertToString(file.date)}
                                </p>
                              </div>
                            </div>
                            {/* <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button> */}
                            <a href={data} download={fileName || `file-${index}`}>
                              <Download className="h-4 w-4" />                      
                            </a>
                          </div>
                          )
                          })
                        ): (
            <p>No submitted files</p>
          ) }
                  
                      </CardContent>
                    </Card>
              </div>


          

           <div className="space-y-6">
          {/* Project Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-gray-900 dark:text-gray-100">{projectDetail?.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Created on {convertToString(projectDetail.createdAt)}
              </p>
            </CardContent>
          </Card>

          {/* Created By Card */}
          <Card>
            <CardHeader>
              <CardTitle>Created By</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar 
                  src={task?.createdBy.profilePicture} 
                  alt={task?.createdBy.fullName}
                  fallback={task?.createdBy.fullName.split(' ').map(n => n[0]).join('')}
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{task?.createdBy.fullName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{task?.createdBy.JobTitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignees Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Assignees ({assignees.length})</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setToggleSelectEmployee(!toggleSelectEmployee)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Assign
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {task?.assignees.map((assignee) => (            
                <div key={assignee.id} className="flex items-center gap-3">
                  <Avatar 
                    src={assignee.profilePicture} 
                    alt={assignee.fullName}
                    fallback={assignee.fullName.split(' ').map(n => n[0]).join('')}
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{assignee.fullName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{assignee.JobTitle}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
         { toggleSelectEmployee && <Card>
            <CardHeader>
              <CardTitle>Select Employee</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
               {projectDetail.members.map((m, index) => (
                <div key={index} className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg'>
                  <div key = {index} className='flex items-center gap-3' >
                      <Avatar 
                          src= {m.user.profilePicture}
                          // fallback={m.user.fullName.split(' ').map(n => n[0].join(''))}
                          />
                       <div>
                           <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">{m.user.fullName}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{m.user.JobTitle}</p>
                            </div>
                       </div>
                  </div>

                  <input
                    name='memberid'
                    type='checkbox'
                    checked = {selectedMember.some((memId) => memId === m.user._id)}
                    onChange={(e) => toggleSelection(m.user._id,e.target.checked)}
                   />

                  </div>
               ))}
            </CardContent>
          </Card>}

          {/* Action Buttons */}
          <div className="space-y-3">
           {toggleSelectEmployee && 
           <Button className="w-full" 
                   onClick={() => {
                    assignEmployeeToTask(taskId , selectedMember)
                    setToggleSelectEmployee(!toggleSelectEmployee)}}>
              <UserPlus className="h-4 w-4 mr-2" />
              Assign Employee
            </Button>}
            {/* <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Submit Files
            </Button> */}
          </div>
           </div>
   </div>
         </div>
    )
    }
    

    export default TaskDetail