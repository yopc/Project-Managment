// import {create} from 'zustand'
// import { toast } from 'react-toastify';
// import { axiosInstance } from '../lib/axios';
// import { Authenticatioin } from './AuthenticateUser';
// import { countTotalItems } from '../lib/utils';

// export const useMessage = create((set , get) => ({
//       selectedUser:null,
//       messages:[],
//       unreadCount: 0,
//       unreadTotal: 0,
//       unreadBySender: {},   // { [senderId]: number }
//       isSubscribed: false,
//       _msgHandler: null,
        
//     getMessage: async (reciverId) => {
      
//        try {
//          const res = await axiosInstance.get(`/message/getMessage/${reciverId}`)
//          console.log(res.data)
//          set({messages:res.data})
//        } catch (error) {
//         console.log('error while gettting message ' + error)
//        }
//     },
//     sendMessage: async (message , fileToSend) => {

//     const { selectedUser } = get();  

//       console.log('selected user id ' + selectedUser)
//       const data = new FormData();
        
//       console.log('selected file' + fileToSend)
//         fileToSend.forEach((file) => {
//             data.append("file", file);
//         });
//         data.append('text', message)

//         console.log('data to send' + message + fileToSend)
//     try {
//       const res = await axiosInstance.post(`/message/sendMessage/${selectedUser}`, data);
//       await get().getMessage(selectedUser);
//     } catch (error) {
//     //   toast.error(error.response.data.message);
//     console.log('error while sending the message' + error)
//     }
//   },

//  setSelectedUser: (selectedUser) => set({ selectedUser }),

//     subscribe: () => {
  

//        console.log('subscribed')

//       const {selectedUser} = get();
     

//       const socket = Authenticatioin.getState().socket;

//     socket.on("newMessage", async (message) => {     
//       console.log('event reached')
     
//         if(!selectedUser && message) {
//          console.log('INSIDE UPDATE')
//           set((state) => ({
//              unreadCount: state.unreadCount + 1
//           }))

         
//         }
       
//         if(get().selectedUser)
//         {
//            console.log('selected user inside else ' + selectedUser)
//            get().clearUnread()
//         }

//       if (message.senderId !== selectedUser) {
//           set((state) => ({
           
//             messages: [...state.messages, message],        
//           }));

//           console.log('unreadCount is the value of ' + get().unreadCount)
//         } else {
//           // if in the chat, just push it
//           set((state) => ({
//             messages: [...state.messages, message],
           
//           }));
          
//         }    
//     });
//     },
//     clearUnread: () =>{
//       console.log('inside clear')
//       set({ unreadCount: 0 })},
//     unsubscribeFromMessages: () => {
//     const socket = Authenticatioin.getState().socket;
//     socket.off("newMessage");
//     },
//   }))







// /Store/useMessage.jsx
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import { Authenticatioin } from './AuthenticateUser'

export const useMessage = create((set, get) => ({
  selectedUser: null,
  messages: [],
  // NEW: unread state
  unreadTotal: 0,
  unreadBySender: {},   // { [senderId]: number }
  isSubscribed: false,
  _msgHandler: null,

  getMessage: async (receiverId) => {
    try {
      const res = await axiosInstance.get(`/message/getMessage/${receiverId}`)
      set({ messages: res.data })
    } catch (error) {
      console.log('error while getting message', error)
    }
  },

  sendMessage: async (text, filesToSend) => {
    const { selectedUser } = get()
    const data = new FormData()
    filesToSend.forEach((f) => data.append('file', f))
    data.append('text', text)
    try {
      await axiosInstance.post(`/message/sendMessage/${selectedUser}`, data)
      // refresh current chat
      await get().getMessage(selectedUser)
    } catch (error) {
      console.log('error while sending the message', error)
    }
  },

  // When you enter a chat, set active user and clear that chat's unread
  // setSelectedUser: (userId) => {
  //   const { unreadBySender, unreadTotal } = get()
  //   const n = unreadBySender[userId] || 0
  //   const { [userId]: _drop, ...rest } = unreadBySender
  //   set({
  //     selectedUser: userId,
  //     unreadBySender: rest,
  //     unreadTotal: unreadTotal - n
  //   })
  // },


  setSelectedUser: async (userId) => {
  const { unreadBySender, unreadTotal } = get()
  const n = unreadBySender[userId] || 0
  const { [userId]: _drop, ...rest } = unreadBySender
  set({
    selectedUser: userId,
    unreadBySender: rest,
    unreadTotal: unreadTotal - n
  })

  // also mark as read in DB
  try {
    await axiosInstance.post(`/message/markRead/${userId}`)
  } catch (err) {
    console.log("Failed to mark messages as read", err)
  }
},


  // Subscribe ONCE to socket events
  subscribe: () => {
  
    if (get().isSubscribed) return

    const socket = Authenticatioin.getState().socket

    const handler = (message) => {
      console.log('inside the handler')
      const active = get().selectedUser  // always fresh
      // Append message to current view if it belongs to the open chat
      if (message.senderId === active || message.receiverId === active) {
        set((state) => ({ messages: [...state.messages, message] }))
      }

      // If message is from someone else, bump unread
      if (message.senderId !== active) {
        console.log('pump the message ')
        set((state) => {
          const prev = state.unreadBySender[message.senderId] || 0
          return {
            unreadTotal: state.unreadTotal + 1,
            unreadBySender: {
              ...state.unreadBySender,
              [message.senderId]: prev + 1
            }
          }
        })
      }
    }

    socket.on('newMessage', handler)
    set({ isSubscribed: true, _msgHandler: handler })
  },

  // Cleanly remove the one handler
  unsubscribeFromMessages: () => {
    const socket = Authenticatioin.getState().socket
    const handler = get()._msgHandler
    if (handler) socket.off('newMessage', handler)
    set({ isSubscribed: false, _msgHandler: null })
  },

  // Optional helpers
  clearAllUnread: () => set({ unreadTotal: 0, unreadBySender: {} }),
  clearUnreadFor: (senderId) => {
    const { unreadBySender, unreadTotal } = get()
    const n = unreadBySender[senderId] || 0
    const { [senderId]: _drop, ...rest } = unreadBySender
    set({ unreadBySender: rest, unreadTotal: unreadTotal - n })
  },
  getUnreadCounts: async () => {
  try {
    const res = await axiosInstance.get('/message/unreadCounts');
    const unreadMap = {}
    let total = 0
    res.data.forEach((u) => {
      unreadMap[u._id] = u.count
      total += u.count
    })
    set({ unreadBySender: unreadMap, unreadTotal: total })
  } catch (err) {
    console.log("Error fetching unread counts", err)
  }
},

}))
