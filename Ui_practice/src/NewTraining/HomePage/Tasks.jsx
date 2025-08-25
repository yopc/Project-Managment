import React from 'react'
import DynamicTable from '../DynamicTable'
import TrainingTable from '../TrainingTable'
import DynamicInputList from '../DynamicInputList '
import BulkTaskCreator from '../BulkTaskCreator'
import { useParams } from 'react-router-dom'

const Tasks = () => {
  const {id} =  useParams();
  return (
    <div>
      {/* <DynamicTable/> */}
<TrainingTable projectId={id}/>
{/* <DynamicInputList/> */}
<BulkTaskCreator projectId={id}/>
    </div>
  )
}

export default Tasks