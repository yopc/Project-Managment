// src/components/BulkTaskCreator.jsx
import React from "react";
import { useParams } from "react-router-dom";
import useTaskStore from "./Store/taskStore";
import { useEffect } from "react";
import { CircleX } from "lucide-react";


 const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-sm';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60 shadow-sm hover:shadow-md',
    outline: 'border border-slate-300/60 bg-white/80 hover:bg-slate-50/80 text-slate-700 shadow-sm hover:shadow-md backdrop-blur-sm',
    ghost: 'hover:bg-slate-100/80 text-slate-600 hover:text-slate-700 transition-colors',
    destructive: 'bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const BulkTaskCreator = ({projectId}) => {

  const {
    taskTitles,
    addTaskTitle,
    removeTaskTitle,
    updateTaskTitle,
    submitTasks,
    tasks,
    getTaskByProject
  } = useTaskStore();

  // useEffect(() => {

  //  getTaskByProject()
  // }, [tasks])

    useEffect(() => {
    if (projectId) {
      getTaskByProject(projectId);
    }
  }, [projectId]); // fetch only when projectId changes

const headers = tasks.length > 0 ? Object.keys(tasks[0]) : [];
  // Example token (normally from auth store or context)
console.log('project id' + projectId)
console.log('tasks' + tasks)

  return (
    <div className="space-y-2 m-2 w-96 border p-4 shadow-lg rounded-lg">
      <h2 className="text-lg text-blue-400 font-roboto  w-fit px-2 rounded-md ">Create Multiple Tasks for Project </h2>

      {taskTitles.map((title, index) => (
        <div
          key={index}
          style={{ display: "flex", marginBottom: "8px", gap: "5px" }}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => updateTaskTitle(index, e.target.value)}
            placeholder={`Task ${index + 1} title`}
            // style={{ flex: 1, padding: "6px" }}
            className="border-4 w-full h-10 outline-none rounded-md"
          />
          <Button
           onClick = {() => removeTaskTitle(index)}
           variant="outline">          
             <CircleX color="red"/>
          </Button>
         
        </div>
      ))}

      <div className="flex justify-between ">
        <Button onClick={addTaskTitle}
       >
           + Add task
        </Button>
          {/* <button
        
        className="bg-blue-700  py-1 px-2 rounded-md font-roboto text-white">
       
      </button> */}

      {/* <button
        onClick={() => submitTasks(projectId)}
        className="bg-green-500  py-1 px-2 rounded-md font-roboto text-white"
      >
        
      </button>  */}

      <Button  onClick={() => submitTasks(projectId)} variant="secondary">
          Submit All Tasks
      </Button>
      </div>



   
    </div>
  );
};

export default BulkTaskCreator;
