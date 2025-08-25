import React from 'react'
import { Authenticatioin } from '../Store/AuthenticateUser'
import { useEffect , useState} from 'react';
import Profile from '../../component/Profile.jsx'
import { ProjectCreator } from '../Store/ProjectCreator.jsx';
import { useParams } from 'react-router-dom';

    const Member = () => {
    const {employees , getAllEmployee} = Authenticatioin();
    const [selectedEmployees , setSelectedEmployees]  = useState([]);
    const {loadAddMember, addMemberToProject} = ProjectCreator();
    const {id} = useParams();

    useEffect(() => {
        getAllEmployee();
    }, [])

    
    const toggleEmployeeSelection = (id, isChecked) => {                                                                                                                 
        setSelectedEmployees((prev) =>
        isChecked ? 
        [...prev, {employeeId:id , role:""}] 
        : prev.filter((emp) => emp.employeeId !== id)
        );
    };         



    const handleRoleChange = (id, role) => {
        setSelectedEmployees((prev) =>
        prev.map((emp) =>
            emp.employeeId === id ? { ...emp, role } : emp
        )
        );
    }

 console.log('load member' + loadAddMember)
    

    return (
        <div>


        <button
        className = 'px-2 py-1 bg-blue-600 text-white rounded-sm' onClick={() => 
    addMemberToProject(id , selectedEmployees)
    }>
    add member
    </button>

     { loadAddMember ?
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
       :<div className='grid grid-cols-3grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        { employees.map((employee) => (
       
        <div className="relative max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col border border-gray-100">

            {/* Checkbox - top right */}
            <input
                name='employeeId'
                type="checkbox"                                                                           
                className="absolute top-4 right-4 w-5 h-5 accent-blue-600 cursor-pointer"
                checked = {selectedEmployees.some((emp) => emp.employeeId === employee._id)}

                onChange= {(e) => toggleEmployeeSelection(employee._id , e.target.checked)}
            />


            {/* Profile + Info */}
            <div className="flex flex-col items-start gap-4">
                <div className='flex gap-3'>
                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                    <Profile
                        imageSrc={employee.profilePicture}
                        styleProp={'h-16 w-16 rounded-full border-4 border-blue-500 shadow-md'}
                    />
                    <p className="mt-2 text-xs text-gray-500 font-medium">{employee.JobTitle}</p>
                    <select
                    className='text-blue-500 text-bold'
                    name ='role' 
                    value={selectedEmployees.find((emp) => emp.employeeId === employee._id)?.role || ""}
                    onChange={(e) => handleRoleChange(employee._id , e.target.value)}>
                        <option value={""}>select role</option>
                        <option value={'manager'}>manager</option>
                        <option value={'contributor'}>contributor</option>
                        <option value={'viewer'}>Viewer</option>
                    </select>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">{employee.fullName}</h2>
                    <p className="text-sm text-gray-500 ">{employee.Directorate}</p>

                    {/* Contact Info */}
                    <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center">
                        <span className="mr-2">📱</span> {employee.phoneNumber}
                        </p>
                       
                    
                    </div>
                    
                    {/* Action Buttons */}
                    
                    </div>
               </div>
               <div>
                   <p className="text-sm text-gray-600 flex items-center">
                        <span className="mr-2">📧</span> {employee.email}
                        </p>
               </div>

            </div>
            </div>
           
        ))}
        </div>
        }
        </div>
    )
    }

    export default Member;