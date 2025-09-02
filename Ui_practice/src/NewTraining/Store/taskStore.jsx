// src/store/taskStore.js
import { create } from "zustand";
import { axiosInstance } from '../lib/axios'
import { toast } from "react-toastify";
const useTaskStore = create((set, get) => ({
  task:null,
  tasks:[],
  taskTitles: [""], // Default with one empty input
  priorityCount:{},
  statusCount:{},

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
    } catch (error) {
      console.log('error while assingne employee to task' + error)
    }
  },
 addSubmition: async (taskId, selectedFiles) => {
  console.log("TASK ID:", taskId);
  console.log("SELECTED FILES:", selectedFiles);

  const data = new FormData();
  selectedFiles.forEach((file) => {
    data.append("submmitedFiles", file);
  });

  try {
    const res = await axiosInstance.post(`/task/submitFile/${taskId}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Successfully added submitted file");
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
}


}));

export default useTaskStore;
