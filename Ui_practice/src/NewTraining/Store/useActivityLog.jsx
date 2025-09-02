import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { Authenticatioin } from "./AuthenticateUser";
import { toast } from "react-toastify";

export const useActivityLog = create((set , get) => ({

    socket:Authenticatioin.getState().socket,
    activityForProject:[],
    activities:[],
    notifications: [], // store received notifications
    unreadCount: {},
    handler:null,
    getActivityForCurrentUser: async () => {
        try {
           const res = await axiosInstance.get('/activity/getActivityLog');
           set({activities:res.data})
        } catch (error) {
            console.log('error while fetching activity log ' + error)
        }
    },
    getActivityByProjectId: async (projectId) => {
      try {
        const res = await axiosInstance.get(`/activity/${projectId}`)
        set({activityForProject: res.data.activities})
      } catch (error) {
         console.log('error while fetching activity for project' + error)
      }
    },

    getUnreadCount: async () => {
      console.log('unread count is reached  AAA');
        try {
          const res = await  axiosInstance.get('/activity/getUnread')
          set({unreadCount:res.data.unreadCount})
        } catch (error) {
           console.log('error whilte getting unread count ' + error)
        }
    },
    markAsRead: async (projectId) => {
      console.log('MARK AS READ ')
      try {
       const res =  axiosInstance.put(`/activity/read/${projectId}`)
        get().getUnreadCount();
      } catch (error) {
        console.log('error while reading notification' + error)
      }
    },

    getNotification: (projects, s) => {
      console.log('INSIDE GET NOTIFICATION AND THE PROJECT IS ' + projects)
    const socket = get().socket;
    if (!s || !projects) return;

    // join rooms
    projects.forEach((project) => s.emit("joinProject", project._id));

    // define handler
    const h = (notif) => {
      console.log("project notification reached");
      // console.log("notification action:", notif?.action);
      // toast.info(`[${notif?.action}] ${notif?.details.description}`);
      get().getUnreadCount();
      //  set((state) => ({
      //   notifications: [notif, ...state.notifications], // latest on top
      //   unreadCount: state.unreadCount + 1
      // }));
    };
    
    
    // save handler in store
    set({ handler: h });

    // listen
    s.on("projectNotification", h);
  },

  leaveNotification: (projects) => {
    const socket = get().socket;
    const h = get().handler;
    if (!socket || !projects || !h) return;

    projects.forEach((project) => socket.emit("leaveProject", project._id));

    socket.off("projectNotification", h);

    set({ handler: null });
  },


}))