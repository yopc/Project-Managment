// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import {toast} from 'react-toastify'
// import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
// const FileGallery = () => {
//   const [formData , setFormData] = useState({
//     fullName:'',
//     email:'',
//     password:''
//   })
//   const EmployeeUrl = 'http://localhost:5000/employee/getEmployee';
//   const UserUrl = 'http://localhost:5000/user/allUser';
//   const  AddEmployee = 'http://localhost:5000/user/signup';


//   const handleOnChange = (e) => {
//   const {name , value} = e.target;
//   setFormData({...formData , [name]:value})
//   }

 
//   const fetchUser = async () => {
//   const res =   await axios.get(UserUrl)
//   return(res.data.users)
//   }

//   const addUser = async (userData) => {
//     const res = await axios.post(AddEmployee , userData)
//     return (res.data.message)
//   }


//   const {data , error , isError , isLoading} = useQuery({
//     queryKey:['user'],
//     queryFn:fetchUser
//   })

  
//  const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn:addUser,
//     onSuccess:() => {
//         queryClient.invalidateQueries({queryKey:['user']})
//     }
//   })

  
  
//   if(isLoading) return <p>Loading... </p>
//   if(isError) return <p>{error.message}</p>


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate(formData)
//   }


//   return (
//     <div className='flex h-screen'>
//       <div className='flex-1'>
//        <ul className='grid grid-cols-2'>
//            {data.map((user) => 
//            <li key={user._id} className='border border-blue-400 p-4 m-4'><p>{user.fullName}</p> <p>{user.email}</p></li>          
//           )}
//         </ul> 
//       </div>
//       <div className='flex-1 bg-blue-600 flex justify-center items-center p-20'>
//         <form onSubmit={handleSubmit} className='flex flex-col gap-2 bg-white items-center p-10'>
//         <input type="text" 
//          placeholder='full Name' 
//          name='fullName'
//          onChange={handleOnChange}
//          value={formData.fullName}
//          className='border border-black w-72 outline-none' 
//        />
//        <input type="email" 
//          placeholder='email' 
//          name='email'
//          onChange={handleOnChange}
//          value={formData.email}
//          className='border border-black w-72 outline-none' 
//        />
//        <input type="password" 
//          placeholder='password' 
//          name='password'
//          onChange={handleOnChange}
//          value={formData.password}
//          className='border border-black w-72 outline-none' 
//        />
//        <button type='submit' className='bg-green-400 p-2 rounded-lg hover:bg-green-500 hover:shadow-lg'>register</button>
//         </form>
       
//       </div>
//     </div>
//   )
// }

// export default FileGallery