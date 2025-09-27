// src/store/taskStore.js
import { create } from "zustand";
import { axiosInstance } from '../lib/axios'
import { toast } from "react-toastify";
import { ProjectCreator } from "./ProjectCreator";
const useTaskStore = create((set, get) => ({
  task:null,
  tasks:[],
  taskTitles: [""], // Default with one empty input
  priorityCount:{},
  statusCount:{},
  taskCreatedBy:{},
  taskCreatedAt:{},
  taskDueDate:{},
  progress:{},

  addTaskTitle: () => {
    set((state) => ({ taskTitles: [...state.taskTitles, ""] }));
  },

  removeTaskTitle: (index) => {
    set((state) => ({
      taskTitles: state.taskTitles.filter((_, i) => i !== index)
    }));
  },

  updateTaskTitle: (index, value) => {
    set((state) => {
      const updated = [...state.taskTitles];
      updated[index] = value;
      return { taskTitles: updated };
    });
  },


  submitTasks: async (projectId) => {
    try {
      const { taskTitles } = get();
      // Build tasks array for API
      const tasks = taskTitles
        
        .map((title) => ({title }));

      if (tasks.length === 0) {
        alert("Please add at least one task title.");
        return;
      }
      const res = await axiosInstance.post(`task/multipleTask/${projectId}` , {tasks})     
      get().getTaskByProject(projectId)
      alert(`${res.data.message}`);
    } catch (err) {
      console.error("Error creating tasks", err);
      alert(err.response?.data?.message || "Error creating tasks");
    }
  },

  getTaskById: async (taskId) => {
    console.log('GET task by id' + taskId)
    try {
    const res =  await axiosInstance.get(`/task/getTask/${taskId}`)
    console.log(res.data.task)
    set({task:res.data.task})
    } catch (error) {
      toast.error("error while get task")
    }
  },
  getTaskByProject: async (projectId) => {
    try{
     const res = await axiosInstance.get(`/task/projectTask/${projectId}`);
     console.log('task data ' + res.data)
     set({tasks:res.data.tasks})
    }catch(error){
      console.log(error)
    }
  },
  updateTaskField: async (projectId, taskId, field, value) => {
    try {
      let route = "";
      switch (field) {
        case "title":
          route = `task/title/update/${taskId}`;
          break;
        case "description":
          route = `task/description/update/${projectId}`;
          break;
        case "status":
          route = `task/status/update/${taskId}`;
          break;
        case "priority":
          route = `task/priority/update/${projectId}`;
          break;
        case "assignees":
          route = `task/add/assigne/${projectId}`;
          break;
        case "dueDate":
          route = `task/dueDate/update/${projectId}`;
          break;
        default:
          return;
      }
      
      console.log('task id ============' + taskId)
      console.log('project id =========' + projectId)
      console.log('field  =============' + field)
      console.log('value ==============' + value)
      
      const res = await axiosInstance.post(route, { taskId, value });
       await ProjectCreator.getState().getProjectById(projectId)
      toast.success("task updated successfully")
      get().getTaskById(taskId)
      // await getTaskByProject(projectId)

      return res.data;

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error updating task");
    }
  },
  assignEmployeeToTask : async (taskId , selectedEmployee) => {
    
  
    try {
     const res = await axiosInstance.post(`/task/assigne/${taskId}`, {assignees:selectedEmployee})
     toast.success('Successfully Assigned')
     get().getTaskById(taskId)
    } catch (error) {
      console.log('error while assingne employee to task' + error)
    }
  },
 addSubmition: async (taskId, selectedFiles , fileType) => {
  console.log("TASK ID:", taskId);
  console.log("SELECTED FILES:", selectedFiles);

  const data = new FormData();
  selectedFiles.forEach((file) => {
    data.append("submmitedFiles", file);
  });
  console.log('file type is ' + fileType)
  
  if(fileType)  data.append("fileType", fileType)
  

  try {
    console.log('before submit the task')
    const res = await axiosInstance.post(`/task/submitFile/${taskId}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
   console.log('after saving task')
    toast.success("Successfully added submitted file");
    

    get().getTaskById(taskId)
  } catch (error) {
    console.error("Error while adding submission file", error);
  }
},
getPriorityCountByProject: async (projectId) => {

  try {
    const res = await axiosInstance.get(`/task/getPriorityCountByProject/${projectId}`)
    set({priorityCount:res.data})
  } catch (error) {
    console.log('error while getting priority count'+ error)
  }
},
getStatusCountByProject: async (projectId) => {

  try {
    const res = await axiosInstance.get(`/task/getStatusCountByProject/${projectId}`)
    set({statusCount:res.data})
  } catch (error) {
    console.log('error while getting priority count'+ error)
  }
},
getTaskCreatedBy: async (projectId) => {

  try {
    const res = await axiosInstance.get(`/task/getCreatedByCountByProject/${projectId}`)
    set({taskCreatedBy:res.data})
  } catch (error) {
    console.log('error while getting taskCreatedBy count'+ error)
  }
},
getNumberOfTaskByCreatedAt: async (projectId) => {

  try {
    const res = await axiosInstance.get(`/task/getNumberOfTaskByCreatedAtProject/${projectId}`)
    set({taskCreatedAt:res.data})
  } catch (error) {
    console.log('error while getting taskCreatedBy count'+ error)
  }
},
getNumberOfTaskByDueDate: async (projectId) => {
  try {
    const res = await axiosInstance.get(`/task/getNumberOfTaskByDueDateProject/${projectId}`)
    set({taskDueDate:res.data})
  } catch (error) {
    console.log('error while getting taskCreatedBy count'+ error)
  }
},
getProjectProgress: async (projectId) => {
  try {
    const res = await axiosInstance.get(`/task/getProjectProgressProject/${projectId}`)
    set({progress:res.data})
  } catch (error) {
    console.log('error while getting taskCreatedBy count'+ error)
  }
},

}));

export default useTaskStore;
