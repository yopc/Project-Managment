import { useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import {FileText , ArrowDownToLine, FileArchive ,X, } from 'lucide-react'
import axios from 'axios';
import { toast } from "react-toastify";
import { Authenticatioin } from "../NewTraining/Store/AuthenticateUser";
import Button from "../NewTraining/components/ui/Button";

const EmployeeRegistration = () => {

  const {register , loadRegistration} = Authenticatioin()

 const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  password: '',
  profilePicture: null,
  SupplementaryFile: null,
  phoneNumber: '',
  Directorate: '',
  JobTitle: '',
  bio: '',
  date: '',
  employmentType: '',
  gender: '',
  role: ''
});



const [previewUrl, setPreviewUrl] = useState(null);
const [selectedFiles, setSelectedFiles] = useState([]);


   



    const handleRemoveFile = (indexToRemove) => {
      setSelectedFiles((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
    };


const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'profilePicture') {
    const file = files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  } else if (name === 'SupplementaryFile') {

    const filesArray = Array.from(files);
    console.log('file array')
    console.log(filesArray)
    setSelectedFiles((prev) => [...prev, ...filesArray]);
  } else {
    setFormData({ ...formData, [name]: value });
  }
};



const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append('fullName', formData.fullName);
  data.append('email', formData.email);
  data.append('password', formData.password);
  data.append('profilePicture', formData.profilePicture);
  data.append('phoneNumber', formData.phoneNumber);
  data.append('Directorate', formData.Directorate);
  data.append('JobTitle', formData.JobTitle);
  data.append('bio', formData.bio);
  data.append('date', formData.date);
  data.append('employmentType', formData.employmentType);
  data.append('gender', formData.gender);
  data.append('role', formData.role);

  selectedFiles.forEach((file) => {
    data.append('SupplementaryFile', file); // Append all files
  });


  await register(data)
};

  return (
    <div className="p-4  min-h-screen mb-8 m-4">
       <Link to="/home">
            
            <Button variant='blue' size='sm'>home</Button>
            </Link>
      <div className="flex flex-col  gap-4  mx-auto  md:flex-row ">
        {/* Profile Card */}
        <div className='flex flex-col gap-1  flex-1'>

          <div className="flex items-start gap-4 bg-white p-6 rounded-xl flex-wrap">
          <div className="relative size-28 max-sm:size-20 bg-blue-950 rounded-full flex-shrink-0 overflow-visible">
                {/* Profile Image or Placeholder */}
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="relative flex items-center justify-center h-full text-white font-bold">
                    No Image
                  </span>
                )}

                {/* "+" Button as Label */}
                <label
                  htmlFor="profileImage"
                  className="absolute -top-1 right-4 z-10 text-white text-xl bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer shadow-md"
                >
                  +
                </label>
          </div>

          <div className="flex flex-col flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{false ? <span> Frontend Developer</span> : <div>
              
              <input required list="options" id="myOptions" name="JobTitle" placeholder="Jop title..." onChange={handleChange}  className='border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'/>
                <datalist id="options">
                    <option value="Frontend Developer"/>
                    <option value="Backend Developer"/>
                    <option value="Data analayset"/>
              </datalist>
       </div>}</h2>
            {false ? <p className="text-gray-600 leading-relaxed text-justify ">
              Responsible for developing user-facing features using HTML, CSS, and JavaScript.
              Collaborates with designers and backend developers to ensure responsive and interactive
              web applications.
            </p> : <input type='text'
               name="bio"
              onChange={handleChange}
              required
             className='border border-gray-300 h-20  px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 '/>}
          </div>
        </div>

         <div className="bg-white p-6 rounded-xl flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Registration Form</h2>
                <input
                  type="file"
                  id="profileImage"
                  name="profilePicture"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
          <input required name="fullName" type="text" placeholder="Full Name" onChange={handleChange} className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input required name="email" type="email" placeholder="Email" onChange={handleChange}  className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input required name="password" type="password" placeholder="Password"  onChange={handleChange}  className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
         {/* <input name="Directorate" type="text" placeholder="Diractorate" onChange={handleChange}   className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" /> */}
         
          <select id="Directorate"
           name="Directorate" 
           required 
           onChange={handleChange}
           className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">-- Select Directorate --</option>
            <option value="Finance">Finance</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Research and Development">Research and Development</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Legal">Legal</option>
            <option value="Operations">Operations</option>
            <option value="Procurement">Procurement</option>
            <option value="Administration">Administration</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Strategy and Planning">Strategy and Planning</option>
            <option value="Public Relations">Public Relations</option>
            <option value="Security">Security</option>
          </select>

         
          <button className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition flex items-center justify-center" onClick={handleSubmit}> 
       
         <div className="flex items-center gap-3">
        { loadRegistration && <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />   
         }
         <span>Register</span>
          
         </div>
          </button>
        </div>


        </div>
   


          <div className='flex flex-col gap-2 p-4 flex-1'>
            {/* EMPLOYEE SUPLMENTARY FILE */}
       

   <div className="bg-gradient-to-br from-white via-blue-700/5 to-blue-400/5 border border-gray-200 shadow-sm rounded-xl p-6 w-full max-w-2xl text-gray-800 font-medium flex-1">
   <form className="space-y-4">
    {/* Phone */}
    <div className="flex flex-col">
      <label htmlFor="phoneNumber" className="mb-1 text-sm text-gray-600">Phone</label>
      <input
        required
        onChange={handleChange}
        name="phoneNumber"
        id="phoneNumber"
        type="text"
        placeholder="Phone Number"
        className="border border-gray-300 h-10 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    {/* Date + Gender */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col flex-1">
        <label htmlFor="date" className="mb-1 text-sm text-gray-600">Date of Birth</label>
        <input
          required
          onChange={handleChange}
          name="date"
          id="date"
          type="date"
          className="border border-gray-300 h-10 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex flex-col flex-1">
      

        <label htmlFor="gender" className="mb-1 text-sm text-gray-600">Gender:</label>
        <select  id="gender" name="gender" required
         onChange={handleChange}
         className="border border-gray-300 h-10 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          <option value="">-- Select --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>

    {/* Role */}
    <div className="flex flex-col">
      


      <label htmlFor="role" className="mb-1 text-sm text-gray-600" >Role:</label>
      <select id="role" name="role" required  onChange={handleChange}
      className="border border-gray-300 h-10 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" >
        <option value="">-- Select --</option>
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="hr">HR</option>
      </select>
    </div>

    {/* Employment Type */}
    <div className="flex flex-col">
     


      <label htmlFor="employmentType">Employment Type:</label>
      <select id="employmentType"
              name="employmentType"
              required  
              onChange={handleChange}    
              className="border border-gray-300 h-10 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
        <option value="">-- Select --</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="intern">Intern</option>
      </select>
    </div>
  </form>
</div>



   <div className="bg-white border-1  rounded-xl p-6 max-w-xl text-gray-800 font-medium text-base space-y-4 w-full">
    <div className="flex flex-wrap justify-between items-center gap-2"><h1 className="text-xl font-semibold text-teal-700 mb-2">Employee Supplementary Files</h1>
    <label htmlFor = 'SupplementartyFile' className="bg-blue-300 px-3 flex items-center  rounded-full text-sm">Add file</label>

     <input
        required
        type="file"
        id="SupplementartyFile"
        name="SupplementaryFile"
        onChange={handleChange}       
        className="hidden"
        multiple
      />
    </div>
 


  <ul className="max-h-64 overflow-y-auto space-y-2 pr-1">
  {selectedFiles.map((file, index) => (
    <li
      key={index}
      className="flex justify-between items-center bg-gray-50 hover:bg-teal-100 transition-colors duration-200 p-3 rounded-lg shadow-sm"
    >
      <div className="flex gap-2 items-center text-gray-700">
        <FileText className="text-teal-600" />
        <span className="truncate max-w-xs">{file.name}</span>
      </div>
      <button type="button" onClick={() => handleRemoveFile(index)}>
        <X  className="text-blue-500 hover:text-blue-700 cursor-pointer"/>
       
      </button>
    </li>
  ))}
</ul>

</div>

     
            
          </div>
       
      </div>
    </div>
  );
};

export default EmployeeRegistration;
