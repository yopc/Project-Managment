import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

export const Authenticatioin = create((set , get ) => ({
    employees:[],
    employee:null,
    loadCurrentEmployee:false,
    currentEmployee:null,
    authUser:null,
    loadAllEmployee:false,
    socket:null,
    resatePasswordRequestMessage:null,
    loadRegistration:false,
    
    register: async (formData) => {
        set({loadRegistration:true})
        try {
        const res = await axiosInstance.post('/employee/register', formData);
       
        // toast.success("'User registered successfully'")
        console.log(res.data.message);
        toast.success(res.data.message)
        } catch (error) {
          console.error('error.response', error.response?.data.message); 
          console.error('error.message:'+  error.message);          
          toast.error(error.response?.data.message)  
        }finally {
           set({ loadRegistration: false });
        }
    },
    login:async (formData) => {
       try{
         const res = await axiosInstance.post('/employee/login' , formData)
         console.log("Login response:", res.data);
         toast.success(res.data.message || "Login successfull");
         set({authUser:res.data})
         console.log('=====>'+ res.data)
         get().connectSocket(); 
       }catch(error){
         toast.error(error.response?.data.message) 
         console.log('error while loggin' + error)
       }
    },
    getEmployee: async (employeeId) => {
      console.log('GET GET GET GET GET GET')
      try {
      const res =   await axiosInstance.get(`/employee/getEmployeeById/${employeeId}`)
      set({employee:res.data.employee})
     
    //    const currentEmployee = get().employee; // assuming you have 'get' from Zustand
    // console.log('EMPLOYEE AFTER SET:', currentEmployee);

      } catch (error) {
        alert('errer while geting employee by id')
      }   
    },

    getAllEmployee:async () => {
      console.log('inside get all employee function')
      set({loadAllEmployee:true})
       try {
        const res =   await axiosInstance.get('/employee/getAllEmployee');
       
        set({employees:res.data.employee})
        console.log('list of employee fatched successfully')
        console.log(employees)
       } catch (error) {
          console.log('error while fetching data')
       } finally{
        set({loadAllEmployee:false})
       }
    },

      //   getEmployee: async (employeeId) => {
      //   console.log('GET EMPLOYEE:', employeeId);
      //   try {
      //     const res = await axiosInstance.get(`/employee/getEmployeeById/${employeeId}`);
      //     set((state) => ({
      //       employees: { ...state.employees, [employeeId]: res.data.employee }
      //     }));
      //     console.log('EMPLOYEE STORED:', get().employees[employeeId]);
      //   } catch (err) {
      //     console.error('Error fetching employee', err);
      //   }
      // },
    getCurrentEmployee:async () => {

       
       set({loadCurrentEmployee:true})
       try{
         const res = await axiosInstance.get('/employee/currentEmployee')
         set({currentEmployee:res.data})
        
         console.log('inside current user functioin' + res.data)
       
       }catch(error){
         console.log('error while fetching current user' + error)
       }finally{
         set({loadCurrentEmployee:false})
       }
    },
    // connectSocket:() => {

    //   const {currentEmployee} = get();
    //   if(!currentEmployee || get().socket?.connected()) return   
        
    //   console.log('user connected to 111111111111111111111111111' + authUser._id)

    //    const socket = io("http://localhost:5000", {
    //       auth: {
    //       userId: authUser._id,   // ❌ this is null if user not logged in
    //     },
    //   });

    //   // const socket = io('http://localhost:5000')

    //   socket.connect();

    //   set({ socket: socket });

    //   },
     
    connectSocket: () => {
  const { authUser, socket } = get();  // ✅ pull from zustand
  if (!authUser || socket?.connected) return;   

  console.log('Connecting socket for user:', authUser.employee._id);

  const newSocket = io("http://localhost:5000", {
    auth: {
      userId: authUser.employee._id,  // ✅ will now be available
    },
  });

  // newSocket.connect();
  set({ socket: newSocket });
    },


    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },  

    
    PasswordResateRequest:(email) => {
      console.log('EMAIL' + email)
      try {
       const res =   axiosInstance.post('/employee/request-password-reset' , {email})
       console.log(res.data)
      //  set({resatePasswordRequestMessage:res.data.message})
      } catch (error) {
        console.log('error while sending password resate request' + error)
      }
    },
    changePassword:(navigate , token , formData) => {
      console.log('inside form data change password are: ' + formData)
      try {
        const res = axiosInstance.post(`/employee/reset-password/${token}` , formData)
         navigate("/login");
      } catch (error) {
        console.log('error while changing password ' + error)
      }
    }




}))