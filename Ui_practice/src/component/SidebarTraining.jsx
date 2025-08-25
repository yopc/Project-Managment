import React, { useContext, useEffect, useState } from 'react'
import { House, Folder, RotateCcw, File, Users , Bell, CircleCheckBig,ChartLine } from 'lucide-react';
import { ToggleContext } from './Context';

const SidebarTraining = () => {

  // const {toggle}  = useContext(ToggleContext)
  const [sidebarWidth , setSidebarWidth] = useState('w-48')



  useEffect(() => {
   setSidebarWidth(toggle ? 'w-48' :' w-16 items-center')
  },[toggle])
  return (
    <div className={`bg-neutral-100  p-2 ${sidebarWidth}`}> 


        <MenuItem icon={ <House strokeWidth={1}/>} label={'Home'} show = {toggle}> 
           <SubItem label ={ 'first'} show = {toggle}/>
           <SubItem label={'second'} show = {toggle}/>
           <SubItem label={'third'} show = {toggle}/>
        </MenuItem>
       
      
        <MenuItem icon={  <CircleCheckBig  strokeWidth={1}/>} label={'Task'} show = {toggle}/>   
        <MenuItem icon={   <Folder strokeWidth={1}/>} label={'WorkSpace'}/>   
        <MenuItem icon={   <ChartLine  strokeWidth={1}/>} label={'Report'}>
         <SubItem label ={ 'first'}/>
           <SubItem label={'second'}/>
           <SubItem label={'third'}/>
        </MenuItem>  
        <MenuItem icon={   <Users strokeWidth={1}/>} label={'Mamber'}/>   
        <MenuItem icon={   <RotateCcw strokeWidth={1}/>} label={'Recent'}/>       
       
       
       
       
    </div>
  )
}

export default SidebarTraining


const MenuItem = ({icon , label , children}) => {
    const haveChildren = !!children
    const [isSubItemOpen , setSubItemOpen] = useState(false)
    return(
        <div className='cursor-pointer'
        onClick={() => {setSubItemOpen(!isSubItemOpen)}}>
            <div className='flex items-center justify-between'>
               <div className='flex items-center gap-1'>               
                    {icon}
                    <span>{label}</span>
               </div>               
             { haveChildren &&  <span>{isSubItemOpen ? '-' : '+'}</span>}
           </div >
          { (haveChildren && isSubItemOpen) && <div className='flex flex-col ml-8'>{children}</div>}
        </div>
       
    )
}
const SubItem = ({label}) => {
    return(
    <div className='flex gap-1 items-center'>
       <File strokeWidth={1} size={18}/>
       <span>{label}</span>
    </div>
    )
}