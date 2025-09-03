import React, { useEffect } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
  RadialBarChart, RadialBar,
  ResponsiveContainer
} from "recharts";
import useTaskStore from "../Store/taskStore";


const projects = [
  { title: "Website Redesign", progress: 40 },
  { title: "Mobile App Launch", progress: 0 },
  { title: "Data Migration", progress: 100 }
];




 


// Colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];




const WorkflowPage = ({id}) => {

  console.log('project id is ' + id)

  const {priorityCount ,
         statusCount,
         taskCreatedBy, 
         getTaskCreatedBy, 
         getStatusCountByProject, 
         getPriorityCountByProject,
         taskCreatedAt,
         taskDueDate,
         progress,
         getProjectProgress,
         getNumberOfTaskByDueDate,
         getNumberOfTaskByCreatedAt} = useTaskStore();

useEffect(() => {
  getPriorityCountByProject(id)
  getStatusCountByProject(id)
  getTaskCreatedBy(id)
  getProjectProgress(id)
  getNumberOfTaskByDueDate(id)
  getNumberOfTaskByCreatedAt(id)

},[id])


 console.log("STATUS COUNT:", JSON.stringify(statusCount, null, 2));
 console.log("STATUS COUNT:", JSON.stringify(taskCreatedBy, null, 2));

return(
 <div className="space-y-2">
  <div>
     <div className="flex flex-col gap-4 md:flex-row">
  {/* Task 1 → 1/4 width */}
 

  {/* Task 2 → 3/4 width */}
  <div className="w-3/5 bg-green-200 p-4 rounded space-y-2">

      { statusCount && statusCount.length > 0  &&  
          <div className="shadow-lg p-4 rounded-2xl bg-white font-roboto flex flex-col justify-center items-center">

              <h2 className="text-sm font-roboto mb-2">Task Status Counts</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusCount}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>    
        </div>}



        <div className="shadow-lg p-4 rounded-2xl bg-white font-roboto flex flex-col justify-center items-center">

            <h2 className="text-sm font-roboto mb-2">Number of Tasks by Employee</h2>
        
            <BarChart width={500} height={300} data={taskCreatedBy}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#ffc658" />
          </BarChart> 
        </div>
    
  </div>

   <div className="w-2/5 bg-blue-200 p-4 rounded flex flex-col justify-around ">
       
        {priorityCount && priorityCount.length > 0 ? (
          <div className="shadow-lg p-4 rounded-2xl bg-white font-roboto flex flex-col justify-center items-center">

        <h2 className="text-sm font-roboto mb-2">Task Priority Counts</h2>
  <ResponsiveContainer width="100%" height={240}>
    <PieChart>
      <Pie
        data={priorityCount}
        cx="50%"
        cy="50%"
        outerRadius={60}
        dataKey="value"
        label
      >
        { Array.isArray(priorityCount) && priorityCount.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
  </div>
) : (
  <p className="text-gray-500 text-center mt-20">No tasks found</p>
)

}
    
        <div className="shadow-lg p-4 rounded-2xl bg-white font-roboto flex flex-col justify-center items-center">
          <h2 className="text-sm font-roboto mb-2">Number of task  by CreatedBy Employee</h2>

          <PieChart width={200} height={240}>
            <Pie
            
             data={Array.isArray(taskCreatedBy) ? taskCreatedBy : []}
             dataKey="value" nameKey="name" outerRadius={60} fill="#8884d8" label>
              {Array.isArray(taskCreatedBy) && taskCreatedBy?.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>



  </div>
</div></div>

    <div className="flex flex-col items-start space-y-4">
            <div className="shadow-lg p-4 rounded-2xl bg-white font-roboto flex flex-col justify-center items-start border border-gray-300 w-full">

                <h2 className="text-sm font-roboto mb-2">Number of Tasks by Created Date</h2>
               <LineChart width={900} height={300} data={Array.isArray(taskCreatedAt) ? taskCreatedAt : []}>

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </div>

            <div className="shadow-lg p-4 rounded-2xl bg-white font-roboto flex flex-col justify-center items-start border border-gray-300 w-full">

               <h2 className="text-sm font-roboto mb-2">Number of Tasks by Due Date</h2>
        
              <BarChart width={900} height={300} data={Array.isArray(taskDueDate) ? taskDueDate : []}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false}/>
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
          </div>



  </div>
 </div>
)

};
export default WorkflowPage;