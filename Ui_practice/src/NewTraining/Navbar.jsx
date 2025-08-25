import React, { useContext, useEffect } from 'react'
import NewContext, { MineContext } from './NewContext'
import { Menu } from 'lucide-react'
import { ToggleContext } from '../component/Context.jsx'
import Profile from '../component/Profile.jsx'
import { Link } from 'react-router-dom'
import { Authenticatioin } from './Store/AuthenticateUser.jsx'


const Navbar = () => {
 const {toggle , toggler} = useContext(ToggleContext)
 const {currentEmployee , getCurrentEmployee} = Authenticatioin();

 useEffect(() => {
  getCurrentEmployee();
 }, [getCurrentEmployee])

  return (
    <div className='bg-neutral-100  border-gray-600 shadow w-full h-16 flex '>
      <div className='flex justify-between items-center w-full px-4'>
        <div className='flex items-center'>

            <button onClick = {() => {
                    toggler()
                    console.log(toggle)

                  }}
                  className=' border  rounded bg-blue-600 text-white '><Menu/></button>
            <Link to='/create_project'>
            <button className='mx-1 border px-3 rounded bg-blue-600 text-white'>Create Project</button>
            </Link>
         
  
        </div>

        <div className='flex items-center'>

          <div>

            <button className='mx-1  border px-3 rounded bg-blue-600 text-white'>setting</button>
            <button className='mx-1 border px-3 rounded bg-blue-600 text-white'>discover</button>
           
          </div>
          
            <Profile styleProp={'w-12 h-12'} imageSrc={currentEmployee?.profilePicture}/>
         

        </div>

      </div>

    </div>
  )
}

export default Navbar