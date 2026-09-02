import React, { useContext, useEffect, useState } from 'react'
import NewContext, { MineContext } from './NewContext'
import { Menu } from 'lucide-react'
import { ToggleContext } from '../component/Context.jsx'
import Profile from '../component/Profile.jsx'
import { Link } from 'react-router-dom'
import { Authenticatioin } from './Store/AuthenticateUser.jsx'
import Button from './components/ui/Button.jsx'
import Dialog from './components/ui/Dialog.jsx'


const Navbar = () => {
 const {toggle , toggler} = useContext(ToggleContext)
 const {currentEmployee , getCurrentEmployee} = Authenticatioin();
 const [showProfile , setShowProfile] = useState(false)
 useEffect(() => {
  getCurrentEmployee();
 }, [getCurrentEmployee])

  return (
    <div className='bg-neutral-100  border-gray-600 shadow w-full h-16 flex '>
      <div className='flex justify-between items-center w-full px-4 gap-2'>
        <div className='flex items-center min-w-0'>
              <Button onClick = {() => {
                    toggler()
                    console.log(toggle)

                  }}
                  size='sm' variant='humberger'><Menu/></Button>
            <Link to='/create_project'>
            {/* <button className='mx-1 border px-3 rounded bg-blue-600 text-white'>Create Project</button> */}
            <Button size='sm' variant='blue'>create_project</Button>

            </Link>
          {/* <Button>add employee</Button> */}
  
        </div>

        <div className='flex items-center space-x-2 flex-shrink-0'>

          
          {currentEmployee?.Directorate === "Human Resources" && currentEmployee?.role ==="manager" &&
           <div className='space-x-2 hidden md:flex'>
            <Link to='/signup'>
            <Button variant='blue' size='sm'>add employee</Button>
            
            </Link>

            <Link to="/employees">
            
            <Button variant='blue' size='sm'>employees</Button>
            </Link>
           </div>
          }
           <button onClick={() => setShowProfile(!showProfile)}>
            <Profile styleProp={'w-12 h-12 max-sm:w-10 max-sm:h-10'} imageSrc={currentEmployee?.profilePicture} />
            
           </button>
          
{showProfile &&  
  <div className="absolute right-1 top-10 z-50 mt-6 bg-gray-100 font-roboto text-gray-500 border border-gray-600 rounded-xl shadow-lg p-6 flex flex-col space-y-2 gap-1 max-sm:right-0 max-sm:left-auto max-sm:w-[15rem] max-sm:text-xs">
  <div className="flex">
    <span className="w-32 text-sm font-semibold text-gray-500">Full Name:</span>
    <span className="text-sm font-medium text-gray-800 break-words">{currentEmployee?.fullName}</span>
  </div>

  <div className="flex">
    <span className="w-32 text-sm font-semibold text-gray-500">Email:</span>
    <span className="text-sm font-medium text-gray-800 break-all">{currentEmployee?.email}</span>
  </div>

  <div className="flex">
    <span className="w-32 text-sm font-semibold text-gray-500">Directorate:</span>
    <span className="text-sm font-medium text-gray-800 break-words">{currentEmployee?.Directorate}</span>
  </div>

  <div className="flex">
    <span className="w-32 text-sm font-semibold text-gray-500">Job Title:</span>
    <span className="text-sm font-medium text-gray-800 break-words">{currentEmployee?.JobTitle}</span>
  </div>

  <div className="flex">
    <span className="w-32 text-sm font-semibold text-gray-500">Phone:</span>
    <span className="text-sm font-medium text-gray-800 break-words">{currentEmployee?.phoneNumber}</span>
  </div>

  <div className="flex">
    <span className="w-32 text-sm font-semibold text-gray-500">Role:</span>
    <span className="text-sm font-medium text-gray-800 break-words">{currentEmployee?.role}</span>
  </div>

  

  <Button variant='blue'>
    Logout
  </Button>
            </div>  }


           


        </div>

      </div>

    </div>
  )
}

export default Navbar