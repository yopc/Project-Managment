import React from 'react'
import DynamicTable from '../DynamicTable'
import TrainingTable from '../TrainingTable'
import DynamicInputList from '../DynamicInputList '
import BulkTaskCreator from '../BulkTaskCreator'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const Tasks = () => {
  const {id} =  useParams();
  const [createTask , setCreateTask] = useState(false)
  return (
    <div className='space-y-3'>
      {/* <DynamicTable/> */}
<button className='bg-blue-700 text-white px-2 py-1 rounded-md'
onClick={() => setCreateTask(!createTask)}>{
  createTask ? <span>Remove</span> : <span> Create Task</span>
}</button>
{createTask && <BulkTaskCreator projectId={id}/>}

<TrainingTable projectId={id}/>
    </div>
  )
}

export default Tasks