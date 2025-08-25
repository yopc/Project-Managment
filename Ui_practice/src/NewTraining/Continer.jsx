import React, { useContext } from 'react'
import Side from './Side'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import MainBody from './MainBody.jsx'
import Context, { ToggleContext } from '../component/Context.jsx'
import { Link } from 'react-router-dom'

// const Continer = () => {
//  const {toggle} =  useContext(ToggleContext)

//  console.log('toggle inside db' + toggle)
//   return (
   
//        <div>
//       <Side/>
      
//       <div className= {`flex flex-col h-screen      fixed right-0  ${toggle ? 'w-[calc(100%-16.666667%)]' : ' w-[calc(100%-4%)]'}`}>
//       <Navbar/>   
  
//       <MainBody/>

//       </div>      
   
       
//    </div>
   
   



      
       
  
  
//   )
// }

// export default Continer



const Continer = () => {
  const { toggle } = useContext(ToggleContext);

  return (
    <div className='flex h-screen w-screen'>
      {/* <div className={`bg-slate-300 h-full p-2 ${toggle ? 'w-1/6' : 'w-10'} transition-all duration-300`}>
        <Link to='/home'>{toggle ? <h1>HOME</h1> : <h1>H</h1>}</Link>
        <Link to='/catalog'> <h1>ABOUT</h1></Link>
        <Link to='/about'> <h1>CONTACT</h1></Link>
        <Link to='/catalog'> <h1>ABOUT</h1></Link>
        <Link to='/about'> <h1>CONTACT</h1></Link>
        <Link to='/catalog'> <h1>ABOUT</h1></Link>
        <Link to='/about'> <h1>CONTACT</h1></Link>
      </div> */}

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
