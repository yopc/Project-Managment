import React, { useEffect } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
  RadialBarChart, RadialBar,
  ResponsiveContainer
} from "recharts";
import useTaskStore from "../Store/taskStore";

// --- Dummy Seeded Data (from your seed.js) ---
const taskss = [
  { title: "Create Wireframes", status: "Completed", priority: "High", estimatedHours: 15, actualHours: 14 },
  { title: "Frontend Development", status: "In Progress", priority: "Medium", estimatedHours: 40, actualHours: 20 },
  { title: "Setup CI/CD Pipeline", status: "To Do", priority: "Low", estimatedHours: 25, actualHours: 0 },
  { title: "Define MVP Features", status: "Review", priority: "High", estimatedHours: 10, actualHours: 5 },
  { title: "Database Migration Script", status: "Completed", priority: "High", estimatedHours: 20, actualHours: 22 }
];

const projects = [
  { title: "Website Redesign", progress: 40 },
  { title: "Mobile App Launch", progress: 0 },
  { title: "Data Migration", progress: 100 }
];



 const tasks = [
    { id: 1, title: "Task A", createdAt: "2025-08-01", dueDate: "2025-08-10", createdBy: "Alice" },
    { id: 2, title: "Task B", createdAt: "2025-08-02", dueDate: "2025-08-08", createdBy: "Bob" },
    { id: 3, title: "Task C", createdAt: "2025-08-03", dueDate: "2025-08-15", createdBy: "Alice" },
    { id: 4, title: "Task D", createdAt: "2025-08-05", dueDate: "2025-08-20", createdBy: "Charlie" },
  ];

  // 1. Group by createdBy
  const createdByCounts = tasks.reduce((acc, task) => {
    acc[task.createdBy] = (acc[task.createdBy] || 0) + 1;
    return acc;
  }, {});
  const createdByData = Object.entries(createdByCounts).map(([name, value]) => ({ name, value }));

  // 2. Count tasks per createdAt date
  const createdAtCounts = tasks.reduce((acc, task) => {
    acc[task.createdAt] = (acc[task.createdAt] || 0) + 1;
    return acc;
  }, {});
  const createdAtData = Object.entries(createdAtCounts).map(([date, value]) => ({ date, value }));

  // 3. Due date distribution
  const dueDateCounts = tasks.reduce((acc, task) => {
    acc[task.dueDate] = (acc[task.dueDate] || 0) + 1;
    return acc;
  }, {});
  const dueDateData = Object.entries(dueDateCounts).map(([date, value]) => ({ date, value }));

  // Colors for pie chart
  // const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];



// 3. Hours Comparison Data
const hoursData = taskss.map(t => ({
  name: t.title,
  Estimated: t.estimatedHours,
  Actual: t.actualHours
}));

// 4. Project Progress
const projectProgress = projects.map(p => ({
  name: p.title,
  value: p.progress
}));

// Colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];




const WorkflowPage = ({id}) => {

  console.log('project id is ' + id)

  const {priorityCount , statusCount, getStatusCountByProject, getPriorityCountByProject} = useTaskStore();

useEffect(() => {
  getPriorityCountByProject(id)
  getStatusCountByProject(id)
},[id])


 console.log("STATUS COUNT:", JSON.stringify(statusCount, null, 2));


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* 1. Pie Chart - Task Status */}
{priorityCount && priorityCount.length > 0 ? (
   <div className="shadow-lg p-4 rounded-2xl bg-white">
        <h2 className="text-lg font-bold mb-2">Task Priority Counts</h2>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={priorityCount}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label
      >
        {priorityCount.map((_, i) => (
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


      {/* 2. Bar Chart - Task Priority */}
  { statusCount && statusCount.length > 0  &&  <div className="shadow-lg p-4 rounded-2xl bg-white">
        <h2 className="text-lg font-bold mb-2">Task Status Counts</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusCount}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      
      </div>}

      {/* 3. Line Chart - Hours Comparison */}
      <div className="shadow-lg p-4 rounded-2xl bg-white">
        <h2 className="text-lg font-bold mb-2">Estimated vs Actual Hours</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hoursData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Estimated" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Actual" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 4. Radial Progress - Project Completion */}
      <div className="shadow-lg p-4 rounded-2xl bg-white">
        <h2 className="text-lg font-bold mb-2">Project Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart
            innerRadius="20%"
            outerRadius="90%"
            data={projectProgress}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar minAngle={15} label={{ position: "insideStart", fill: "#fff" }} background dataKey="value" />
            <Legend />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>




      <div style={{ padding: "20px" }}>
      <h2>Task Visualizations</h2>

      {/* 1. Pie Chart - Tasks by CreatedBy */}
      <h3>Tasks by CreatedBy</h3>
      <PieChart width={400} height={300}>
        <Pie data={createdByData} dataKey="value" nameKey="name" outerRadius={120} fill="#8884d8" label>
          {createdByData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>

      {/* 2. Line Chart - Tasks Created Over Time */}
      <h3>Tasks Created Over Time</h3>
      <LineChart width={500} height={300} data={createdAtData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>

      {/* 3. Bar Chart - Tasks Due on Dates */}
      <h3>Tasks Due by Date</h3>
      <BarChart width={500} height={300} data={dueDateData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>

      {/* 4. Bar Chart - Tasks by User */}
      <h3>Tasks by User</h3>
      <BarChart width={500} height={300} data={createdByData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#ffc658" />
      </BarChart>
    </div>
    </div>
  );
};

export default WorkflowPage;
