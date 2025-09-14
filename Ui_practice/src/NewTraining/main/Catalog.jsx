// import React, { useEffect } from 'react'
// import { ProjectCreator } from '../Store/ProjectCreator'

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// // Colors for charts
// const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

// const Catalog = () => {
//     const {projectDataForEmployee,allProjectData,getProjectDataForEmployee , getAllProjectData} = ProjectCreator();
//     useEffect(()=> {
//       getProjectDataForEmployee();
//       getAllProjectData();
//     }, [])

//     console.log("total project" + projectDataForEmployee?.totalProjectForEmployee)
//     console.log("status count" + projectDataForEmployee?.statusCountsForEmployee.forEach((s) => console.log('name' + s.name + ' value' + s.value)))
//     console.log("progress " + projectDataForEmployee?.projectProgressForEmployee.forEach((s) => console.log('name' + s.name + ' value' + s.value)))
//     console.log("project data" + allProjectData)
//   return (
//        <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">📊 Project Report Dashboard</h1>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Org Stats */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">Organization Overview</h2>
//           <p className="mb-4 text-gray-500">Total Projects: {allProjectData?.NumOfTotalProject}</p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Pie Chart */}
//             <div>
//               <h3 className="text-md font-medium mb-2 text-gray-600">Status Distribution</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie
//                     data={allProjectData?.statusCount}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     dataKey="value"
//                   >
//                     {allProjectData?.statusCount.map((_, index) => (
//                       <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Legend />
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             <div className='size-42 border border-black p-3 font-roboto text-gray-600'>
//                  <div className='flex justify-between items-center'><span>total project</span>{allProjectData?.NumOfTotalProject}</div>
//                 {allProjectData?.statusCount.map((s) => (
//                   <div className='flex justify-between items-center'>
//                     <span>{s.name}</span>
//                     <span>{s.value}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Bar Chart */}
           
//           </div>
//         </div>

//          <div className='m-6'>
//               <h3 className="text-md font-medium mb-2 text-gray-600">All Campany project progress summary (%)</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={allProjectData?.projectProgressCount}
//                  margin={{ top: 20, right: 20, left: 20, bottom: 80 }} >
//                   <XAxis 
//                     dataKey="name" 
//                     tick={{ fontSize: 12 }} 
//                     interval={0} 
//                     angle={-30} 
//                     textAnchor="end" 
//                   />

//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#6366f1" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//         {/* Employee Stats */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">Employee Overview</h2>
//           <p className="mb-4 text-gray-500">Total Projects: {projectDataForEmployee?.totalProjectForEmployee}</p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Pie Chart */}
//             <div>
//               <h3 className="text-md font-medium mb-2 text-gray-600">Status Distribution</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie
//                     data={projectDataForEmployee?.statusCountsForEmployee}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     dataKey="value"
//                   >
//                     {projectDataForEmployee?.statusCountsForEmployee.map((_, index) => (
//                       <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Legend />
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>


//              <div className='size-42 border border-black p-3 font-roboto text-gray-600'>
//                <div className='flex justify-between items-center'><span>total project</span>{projectDataForEmployee?.totalProjectForEmployee}</div>
//                 {projectDataForEmployee?.statusCountsForEmployee.map((s) => (
//                   <div className='flex justify-between items-center'>
//                     <span>{s.name}</span>
//                     <span>{s.value}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Bar Chart */}
            
//           </div>
//         </div>
//       </div>

//       <div>
//               <h3 className="text-md font-medium mb-2 text-gray-600">Project Progress summary you are member in (%)</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={projectDataForEmployee?.projectProgressForEmployee}
//                  margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
//                    <XAxis 
//                     dataKey="name" 
//                     tick={{ fontSize: 12 }} 
//                     interval={0} 
//                     angle={-30} 
//                     textAnchor="end" 
//                   />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#22c55e" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//       {/* Due Dates Section */}
//       <div className="mt-8 bg-white shadow-lg rounded-2xl p-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">📅 Upcoming Due Dates</h2>
//         <ul className="divide-y divide-gray-200">
//           {projectDataForEmployee?.projectTitleVsDueDate.map((p, i) => (
//             <li key={i} className="py-3 flex justify-between text-gray-600">
//               <span>{p.title}</span>
//               <span className="text-gray-500">
//                 {new Date(p.dueDate).toLocaleDateString()}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Catalog



import React, { useEffect } from 'react'
import { ProjectCreator } from '../Store/ProjectCreator'
import Profile from '../../../src/component/Profile.jsx'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Authenticatioin } from '../Store/AuthenticateUser';

// Enhanced color palette for enterprise design
const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6", "#06b6d4", "#84cc16"];
const GRADIENT_COLORS = {
  primary: "from-indigo-500 to-purple-600",
  success: "from-emerald-500 to-teal-600", 
  warning: "from-amber-500 to-orange-600",
  danger: "from-red-500 to-pink-600",
  info: "from-blue-500 to-cyan-600"
};

const Catalog = () => {
    const {projectDataForEmployee,allProjectData,getProjectDataForEmployee , getAllProjectData} = ProjectCreator();
    const {currentEmployee , getCurrentEmployee} = Authenticatioin();
    useEffect(()=> {
      getProjectDataForEmployee();
      getAllProjectData();
      getCurrentEmployee()
    }, [])


   

    console.log("total project" + projectDataForEmployee?.totalProjectForEmployee)
    console.log("status count" + projectDataForEmployee?.statusCountsForEmployee.forEach((s) => console.log('name' + s.name + ' value' + s.value)))
    console.log("progress " + projectDataForEmployee?.projectProgressForEmployee.forEach((s) => console.log('name' + s.name + ' value' + s.value)))
    console.log("project data" + allProjectData)
   console.log(currentEmployee.profilePicture)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header Section */}
      {/* <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                📊 Project Analytics Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Comprehensive project insights and performance metrics</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">📈</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

     
        
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Organization Overview Card */}
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
          <div className={`bg-gradient-to-r ${GRADIENT_COLORS.primary} p-3 text-white`}>
            <div className="flex items-center justify-between">
              <div>
               
                <p className="text-indigo-100">Complete company project analytics</p>
              </div>
              
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Total Projects</span>
                  <span className="text-3xl font-bold text-indigo-600">{allProjectData?.NumOfTotalProject}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Pie Chart */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Status Distribution
                </h3>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={allProjectData?.statusCount}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={90}
                        innerRadius={30}
                        dataKey="value"
                        stroke="white"
                        strokeWidth={2}
                      >
                        {allProjectData?.statusCount?.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Enhanced Stats Panel */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Project Statistics
                </h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Total Projects</span>
                      <span className="text-xl font-bold text-indigo-600">{allProjectData?.NumOfTotalProject}</span>
                    </div>
                    {allProjectData?.statusCount?.map((s, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-3" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="text-gray-600">{s.name}</span>
                        </div>
                        <span className="font-semibold text-gray-800">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Overview Card */}
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
          <div className={`bg-gradient-to-r ${GRADIENT_COLORS.success} p-3 text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Employee Overview</h2>
                <p className="text-emerald-100">Your personal project analytics</p>
              </div>
              <Profile imageSrc={currentEmployee.profilePicture} styleProp={'w-8 h-8'}/>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Your Projects</span>
                  <span className="text-3xl font-bold text-emerald-600">{projectDataForEmployee?.totalProjectForEmployee}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Pie Chart */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Status Distribution
                </h3>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={projectDataForEmployee?.statusCountsForEmployee}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={90}
                        innerRadius={30}
                        dataKey="value"
                        stroke="white"
                        strokeWidth={2}
                      >
                        {projectDataForEmployee?.statusCountsForEmployee?.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Enhanced Stats Panel */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  Your Statistics
                </h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Total Projects</span>
                      <span className="text-xl font-bold text-emerald-600">{projectDataForEmployee?.totalProjectForEmployee}</span>
                    </div>
                    {projectDataForEmployee?.statusCountsForEmployee?.map((s, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-3" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="text-gray-600">{s.name}</span>
                        </div>
                        <span className="font-semibold text-gray-800">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Company Progress Chart */}
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300">
          <div className={`bg-gradient-to-r ${GRADIENT_COLORS.info} p-2 text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Company Progress Overview</h3>
                <p className="text-blue-100">All company project progress summary (%)</p>
              </div>
             
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={allProjectData?.projectProgressCount}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                    interval={0} 
                    angle={-30} 
                    textAnchor="end" 
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[8, 8, 0, 0]} 
                    fill="url(#companyGradient)"
                  />
                  <defs>
                    <linearGradient id="companyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Employee Progress Chart */}
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300">
          <div className={`bg-gradient-to-r ${GRADIENT_COLORS.warning} p-2 text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">Progress Overview</h3>
                <p className="text-amber-100">Project progress summary you are member in (%)</p>
              </div>
             
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={projectDataForEmployee?.projectProgressForEmployee}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                    interval={0} 
                    angle={-30} 
                    textAnchor="end" 
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[8, 8, 0, 0]} 
                    fill="url(#employeeGradient)"
                  />
                  <defs>
                    <linearGradient id="employeeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Due Dates Section */}
      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300">
        <div className={`bg-gradient-to-r ${GRADIENT_COLORS.danger} p-2 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">Upcoming Due Dates</h2>
              <p className="text-red-100">Stay on top of your project deadlines</p>
            </div>
            
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            {projectDataForEmployee?.projectTitleVsDueDate?.map((p, i) => (
              <div 
                key={i} 
                className="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-purple-50 rounded-2xl p-4 border border-gray-200 hover:border-indigo-200 transition-all duration-300 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                    <span className="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                      {p.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors duration-300">
                      Due Date
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
                      {new Date(p.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog