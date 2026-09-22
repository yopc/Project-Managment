import React, { useState } from 'react';
import logo from '../assets/images/logo.jpg' 
import axios from 'axios';
import { toast } from 'react-toastify';
import { Authenticatioin } from '../NewTraining/Store/AuthenticateUser';
import { Link, useParams ,useNavigate} from 'react-router-dom';

const inputClass = "w-full h-12 rounded-xl bg-gray-100 border border-gray-300 px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition outline-none";

const ChangePassword = () => {
  const [formData, setFormData] = useState({  
    newPassword: '',
    confirmPassword: ''   
  });

  const {token} = useParams();
  const navigate = useNavigate(); 
  console.log('the token from use param is ' + token)




  const {changePassword} = Authenticatioin();

  

  const handleChange = (e) => {
    const { name, value } = e.target;  
      setFormData({ ...formData, [name]: value });    
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();    
   
    // const res = await  axios.post('http://localhost:5000/employee/login', formData)
    await changePassword(navigate , token , formData)  
   
  }



  return (
    <div className='min-h-screen md:h-screen md:flex'>

      <div className='flex flex-col flex-1 md:justify-center md:p-4'>

        {/* Mobile app-style brand header (hidden on desktop) */}
        <div className='relative md:hidden bg-gradient-to-br from-blue-950 via-blue-600 to-blue-700 px-6 pt-14 pb-12 text-center'>
          <h1 className='text-2xl font-bold text-white'>Project Manager</h1>
          <p className='mt-2 text-sm text-blue-100'>Update your password</p>
          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 bg-white rounded-2xl shadow-lg ring-4 ring-blue-50 overflow-hidden'>
            <img src={logo} alt="logo" className='w-full h-full object-cover' />
          </div>
        </div>

        <div className='flex items-center justify-center px-6 pt-16 pb-10 md:pt-4 md:pb-4 md:px-4 bg-main-bg md:bg-transparent'>
          <div className='flex flex-col w-full max-w-sm gap-y-4 md:w-72 md:m-8'>

            <div className='mb-2'>
              <h2 className='text-2xl font-bold text-gray-800 md:text-xl'>Change Password</h2>
              <p className='mt-1 text-sm text-gray-500'>Enter a new password for your account</p>
            </div>

          {/* Text Inputs */}
          <input
            type="password"
            className={inputClass}
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            value={formData.newPassword}
          />
          <input
            type="password"
            className={inputClass}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />

          <Link to={'/login'} className="text-blue-600 hover:underline text-sm text-center">
           Login
          </Link>

          <button
            onClick={handleSubmmit}
            className="h-12 rounded-xl bg-blue-500 text-white font-semibold py-1 hover:bg-blue-600 transition active:scale-[0.98] shadow-lg shadow-blue-500/30"
          >
            Change Password
          </button>

        </div>
      </div>
      </div>

      <div className='hidden md:flex bg-gradient-to-tr from-blue-950 via-blue-600 to-blue-700 flex-1 h-screen justify-center items-center'>
        <div className='w-64 h-72 rounded-lg shadow-2xl shadow-cyan-500 hover:shadow-white bg-white/20 backdrop-blur-md border border-white/30'>
          <img src={logo} alt="logo" className="w-full h-full object-cover rounded-lg opacity-90" />
        </div>
      </div>

    </div>
    
  );
};

export default ChangePassword;
