import React, { useContext } from 'react'
import Side from './Side'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import MainBody from './MainBody.jsx'
import Context, { ToggleContext } from '../component/Context.jsx'
import { Link } from 'react-router-dom'



const Continer = () => {
  const { toggle } = useContext(ToggleContext);

  return (
    <div className='flex h-screen w-screen'>
      

      <Side/>

      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar />
        <MainBody />
        {/* <HomePage/> */}
      </div>
    </div>
  );
};

export default Continer;
