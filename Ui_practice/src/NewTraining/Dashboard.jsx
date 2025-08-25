import React from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { project } from '../data.js'


const Home = () => (
  <div className='flex-1 h-screen bg-blue-300 flex justify-center items-start p-8'>
    <div className='grid grid-cols-3 gap-6 overflow-auto'>
      {project.map((element) => (
        <Link key={element.id} to={`detail/${element.id}`}>
          <div className='bg-green-200 h-60 w-64 flex justify-center items-center flex-col space-y-4 rounded shadow-md hover:scale-105 transition'>
            <h1 className='text-xl font-bold'>{element.name}</h1>
            <h1>{element.duration}</h1>
            <h1>{element.mamber}</h1>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const Catalog = () => <div className='flex-1 h-screen  bg-pink-300 flex justify-center items-center'>catalog</div>
const About= () => <div className='flex-1 h-screen  bg-orange-300 flex justify-center items-center'>about</div>
const Detail= () => {
  const {id} =   useParams();
 const selectedProject =  project.find((element) => element.id ===  Number(id) )
 console.log(selectedProject)
  return(
    <div>
      
      <div>
        <Link to={'/home'}>X</Link>
      </div>
      
      <h1>id of the clicked project : </h1>

    

    <h1>{selectedProject.name}</h1>  
    <h1>{selectedProject.duration}</h1>  
    <h1>{selectedProject.mamber}</h1>  

    

    </div>
  )
}

const Dashboard = () => {
  return (
    <div className='flex-1 flex size-full bg-green-300 h-screen justify-center items-center'>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/home/detail/:id' element={<Detail/>}/>
        <Route path='/catalog' element={<Catalog/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default Dashboard