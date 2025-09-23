import React, { useState } from 'react';
import logo from '../assets/images/logo.jpg' 
import axios from 'axios';
import { toast } from 'react-toastify';
import { Authenticatioin } from '../NewTraining/Store/AuthenticateUser';
import { Link, useParams ,useNavigate} from 'react-router-dom';

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
    <div className='flex'>
     <div className='flex items-center justify-center flex-1'>
         <div className="flex flex-col w-72 gap-y-4 m-8">
   
      {/* Text Inputs */}
      <p>Change Password</p>
      <input
        type="password"
        className="border-1 border-gray-400 h-10  px-2 py-1 rounded"
        name="newPassword"
        placeholder="New Password"
        onChange={handleChange}
        value={formData.newPassword}
      />
      <input
        type="password"
        className="border-1 border-gray-400 h-10  px-2 py-1 rounded"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
        value={formData.confirmPassword}
      />

      <Link to={'/login'}>
       Login
      </Link>

      <button
        onClick={handleSubmmit}
        className="bg-blue-500 h-10 text-white py-1 rounded hover:bg-blue-600 transition"
      >
        Change Password
      </button>

       

    
    </div>
      </div> 
            
        <div className='flex bg-gradient-to-tr from-blue-950 via-blue-600 to-blue-700 300 flex-1 h-screen justify-center items-center'>
          <div className='w-64 h-72 rounded-lg shadow-2xl shadow-cyan-500 hover:shadow-white bg-white/20 backdrop-blur-md border border-white/30 '>
            <img src={logo} alt="logo" className="w-full h-full object-cover rounded-lg opacity-90" />
          </div>
        </div>

    
    </div>
    
   
  );
};

export default ChangePassword;
