import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import {toast} from 'react-toastify'
export const ProjectCreator = create((set ,get) => ({
   projects:[],
   loadDetail:[],
   projectDetail:null,
   loadProject:false,
   loadAddMember:false,
   errorMessage:null,
   projectDataForEmployee:null,
   allProjectData:null,
   creationMsg:null,


   setErrorMessage: (newMessage) => set({ errorMessage: newMessage }),


    updateProjectDescription: async (id , value) => {
      try {
        const res = await axiosInstance.put(`/project/updateDescription/${id}`, value)
      } catch (error) {
        console.log('error while update description')
      }
    },
    createProject:async (formData) => {
        try{
          const res = await axiosInstance.post('/project/createProject',formData)
           set({creationMsg:res.data.message})
           toast.success(res.data.message)
        }catch(error){
             set({creationMsg:error.response?.data.message})
             toast.error(error.response?.data.message) 

            console.log('error while creating project' + error)
        }
    },

    updateProject: async (formData, id) => {
      console.log('id in the update project' + id)
      try {
        console.log('before request')
        const res = await axiosInstance.put(`/project/update/${id}` , formData);

        toast.success(res.data.message)
        get().getProjectById(id)
        console.log('log info' + res.data.message)
      } catch (error) {
        set({errorMessage:error.response.data.message})
        console.log("Error response:", error.response.data.message);
        console.log('error while creating project' + error)
      }
    },


    getProject: async () => {
    set({ loadProject: true });
    try {
      const res = await axiosInstance.get("/project/member/getProject");
      set({ projects: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loadProject: false });
    }
    },
    getProjectById: async (id) => {
      set({loadDetail:true})
        try {
          console.log('inside by id project')
        const res = await axiosInstance.get(`/project/${id}`);
        console.log(res.data)
        set({ projectDetail: res.data });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ loadDetail: false });
      }
    },
    addMemberToProject: async (projectId , selectedEmployee) => {
      
    set({loadAddMember:true})
     try {
     const res = await axiosInstance.post(`/project/addMembers/${projectId}` , { members: selectedEmployee })
     toast.success(res.data)
     } catch (error) {
      console.log('error while adding member to project')
     } finally{
      set({loadAddMember:false})
     }
    },

    getProjectDataForEmployee: async () => {
      try {
        const res = await axiosInstance.get('/project/projectDataForEmployee')
        set({projectDataForEmployee:res.data})
      } catch (error) {
        console.log('erro while getting project data for employee' + error)
      }
    },
    getAllProjectData: async () => {
      try {
       const res = await axiosInstance.get('/project/allProjectData')
       set({allProjectData:res.data})
      } catch (error) {
        console.log('error while getting all projet data for employee' + error)
      }
    }

    
}))