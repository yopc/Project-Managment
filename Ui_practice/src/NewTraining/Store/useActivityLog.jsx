import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useActivityLog = create((set , get) => ({
    activities:[],
    getActivityForCurrentUser: async () => {
        try {
           const res = await axiosInstance.get('/activity/getActivityLog');
           set({activities:res.data})
        } catch (error) {
            console.log('error while fetching activity log ' + error)
        }
    }
}))