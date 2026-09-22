import React, { useState } from 'react';
import logo from '../assets/images/logo.jpg' 
import axios from 'axios';
import { toast } from 'react-toastify';
import { Authenticatioin } from '../NewTraining/Store/AuthenticateUser';
import { X , Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const inputClass = "w-full h-12 rounded-xl bg-gray-100 border border-gray-300 px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition outline-none";

const LoginPage = () => {
  const [formData, setFormData] = useState({  
    email: '',
    password: ''   
  });

  const [resateForm , setResateForm] = useState({
    email:''
  })

  const [forgetPassword , setForgete] = useState(false)


  const {login , PasswordResateRequest} = Authenticatioin();

   const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;  
      setFormData({ ...formData, [name]: value });    
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();    
   
    // const res = await  axios.post('http://localhost:5000/employee/login', formData)
    login(formData)  
   
  }

  const submitEmail = async (e) => {
    e.preventDefault();
    console.log('resate email: ' + resateForm)
    PasswordResateRequest(resateForm)
  }

  return (
    <div className='min-h-screen md:h-screen md:flex'>

      {/* ---------- LEFT / FORM SIDE ---------- */}
      <div className='flex flex-col flex-1 md:justify-center md:p-4'>

        {/* Mobile app-style brand header (hidden on desktop) */}
        <div className='relative md:hidden bg-gradient-to-br from-blue-950 via-blue-600 to-blue-700 px-6 pt-14 pb-12 text-center'>
          <h1 className='text-2xl font-bold text-white'>Project Manager</h1>
          <p className='mt-2 text-sm text-blue-100'>Sign in to continue</p>
          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 bg-white rounded-2xl shadow-lg ring-4 ring-blue-50 overflow-hidden'>
            <img src={logo} alt="logo" className='w-full h-full object-cover' />
          </div>
        </div>

        {/* Form container */}
        <div className='flex items-center justify-center px-6 pt-16 pb-10 md:pt-4 md:pb-4 md:px-4 bg-main-bg md:bg-transparent'>
          <div className='flex flex-col w-full max-w-sm gap-y-4 md:w-72 md:m-8'>

            {forgetPassword ? (
              <div className='flex flex-col gap-y-4'>
                <div className='mb-2'>
                  <h2 className='text-2xl font-bold text-gray-800 md:text-xl'>Reset Password</h2>
                  <p className='mt-1 text-sm text-gray-500'>Enter your email to receive a reset link</p>
                </div>

                <input
                  type="text"
                  className={inputClass}
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setResateForm(e.target.value)}
                  value={resateForm.email}
                />

                <button
                  onClick={submitEmail}
                  className='h-12 rounded-xl bg-blue-500 text-white font-semibold py-1 hover:bg-blue-600 transition active:scale-[0.98] shadow-lg shadow-blue-500/30'
                >
                  Reset Password
                </button>

                <p
                  onClick={() => setForgete(!forgetPassword)}
                  className='cursor-pointer text-sm text-blue-600 hover:text-blue-800 hover:underline transition text-center'
                >
                  Back to login
                </p>
              </div>
            ) : (
              <div className='flex flex-col gap-y-4'>
                <div className='mb-2'>
                  <h2 className='text-2xl font-bold text-gray-800 md:text-xl'>Login to your credentials</h2>
                  <p className='mt-1 text-sm text-gray-500'>Welcome back</p>
                </div>

                <input
                  type="text"
                  className={inputClass}
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                />
                <input
                  type="password"
                  className={inputClass}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                />

                <p className='flex items-center justify-between text-sm text-gray-600 pb-1'>
                  <button
                  onClick={() => setForgete(!forgetPassword)}
                  className='cursor-pointer hover:text-indigo-600 hover:underline transition'
                >
                  Forgot password?
                </button>
                  <Link to='/signup' className='hover:text-indigo-600 hover:underline transition'>
                    Register
                  </Link>
                </p>

                <button
                  onClick={handleSubmmit}
                  className='h-12 rounded-xl bg-blue-500 text-white font-semibold py-1 hover:bg-blue-600 transition active:scale-[0.98] shadow-lg shadow-blue-500/30'
                >
                  Login
                </button>

                {/* Sample credentials */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm relative mt-4 w-full">
                  <span className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Sample Credentials
                  </span>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-medium text-gray-600">Email:</span>
                        <span className="text-sm text-gray-800 font-mono break-all">meselech.bekele@tech-ethiopia.com</span>
                      </div>
                      <button
                        onClick={() => handleCopy('meselech.bekele@tech-ethiopia.com', 'email')}
                        className={`shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                          copiedField === 'email'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white'
                        }`}
                      >
                        {copiedField === 'email' ? (
                          <><Check className="w-3 h-3" /> Copied</>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copy</>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">Password:</span>
                        <span className="text-sm text-gray-800 font-mono">123456</span>
                      </div>
                      <button
                        onClick={() => handleCopy('123456', 'password')}
                        className={`shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                          copiedField === 'password'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white'
                        }`}
                      >
                        {copiedField === 'password' ? (
                          <><Check className="w-3 h-3" /> Copied</>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copy</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ---------- RIGHT / BRAND PANEL (desktop only) ---------- */}
      <div className='hidden md:flex bg-gradient-to-tr from-blue-950 via-blue-600 to-blue-700 flex-1 h-screen justify-center items-center'>
        <div className='w-64 h-72 rounded-lg shadow-2xl shadow-cyan-500 hover:shadow-white bg-white/20 backdrop-blur-md border border-white/30'>
          <img src={logo} alt="logo" className="w-full h-full object-cover rounded-lg opacity-90" />
        </div>
      </div>

    </div>
  );
};

export default LoginPage;