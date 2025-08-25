import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import {toast} from 'react-toastify'
export const ProjectCreator = create((set ,get) => ({
   projects:[],
   loadDetail:[],
   projectDetail:null,
   loadProject:false,
   loadAddMember:false,



    createProject:async (formData) => {
        try{
          const res = await axiosInstance.post('/project/createProject',formData)
        }catch(error){
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
    }
}))