// import React, { useEffect, useState } from "react";
// import {
//   ArrowDownUp,
//   RectangleEllipsis,
//   ListFilter,
//   Grid2x2,
//   CircleX,
//   MoveDown,
//   MoveUp
// } from "lucide-react";
// import useTaskStore from "./Store/taskStore";
// import { convertToString , validateData} from "./lib/dateCorrector.jsx";
// import { Authenticatioin } from "./Store/AuthenticateUser";
// import {Link} from 'react-router-dom'
// import TaskDetail from "./HomePage/TaskDetail.jsx";


//  const Button = ({ 
//   variant = 'primary', 
//   size = 'md', 
//   className = '', 
//   children, 
//   ...props 
// }) => {
//   const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-sm';
  
//   const variants = {
//     primary: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
//     secondary: 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60 shadow-sm hover:shadow-md',
//     outline: 'border border-slate-300/60 bg-white/80 hover:bg-slate-50/80 text-slate-700 shadow-sm hover:shadow-md backdrop-blur-sm',
//     ghost: 'hover:bg-slate-100/80 text-slate-600 hover:text-slate-700 transition-colors',
//     destructive: 'bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
//   };
  
//   const sizes = {
//     sm: 'h-8 px-3 text-sm',
//     md: 'h-10 px-4',
//     lg: 'h-12 px-6'
//   };
  
//   return (
//     <button 
//       className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// const TrainingTable = ({ projectId }) => {
//   const { tasks, getTaskByProject, updateTaskField } = useTaskStore();

//   const [filter, setFilter] = useState("");
//   const [groupBy, setGroupBy] = useState("");
//   const [selectedColumns, setSelectedColumns] = useState([]);
//   const [showAddField, setShowAddField] = useState(false);
//   const [showFilter, setShowFilter] = useState(false);
//   const [showGroup, setShowGroup] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
//   const [showInput, setShowInput] = useState(false);

 

//   const [editingValues, setEditingValues] = useState({});

//   useEffect(() => {
//     if (projectId) getTaskByProject(projectId);
//   }, [projectId, getTaskByProject]);

//   const hiddenColumns = ["_id", "__v", "password", "secretField","comments","attachments","submitedFile"];
//   useEffect(() => {
//     if (tasks && tasks.length > 0) {
//       setSelectedColumns(Object.keys(tasks[0]).filter(col => !hiddenColumns.includes(col)));
//     }
//   }, [tasks]);

//   const filteredRows = tasks.filter((row) =>
//     Object.values(row).some((f) =>
//       String(f).toLowerCase().includes(filter.toLowerCase())
//     )
//   );

//   const sortedRows = [...filteredRows].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     const valA = a[sortConfig.key];
//     const valB = b[sortConfig.key];
//     if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
//     if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   const groupedRows = groupBy
//     ? sortedRows.reduce((acc, row) => {
//         const groupKey = row[groupBy] || "Ungrouped";
//         if (!acc[groupKey]) acc[groupKey] = [];
//         acc[groupKey].push(row);
//         return acc;
//       }, {})
//     : { All: sortedRows };

//   const toggleColumn = (col) => {
//     setSelectedColumns((prev) =>
//       prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
//     );
//   };

//   const handleSort = (key) => {
//     setSortConfig((prev) => {
//       if (prev.key === key) {
//         return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
//       }
//       return { key, direction: "asc" };
//     });
//   };

//   const handleCellChange = (taskId, field, value) => {
//     setEditingValues((prev) => ({
//       ...prev,
//       [taskId]: { ...prev[taskId], [field]: value }
//     }));
//   };

//   const handleSaveAll = async () => {
//     for (const [taskId, fields] of Object.entries(editingValues)) {
//       for (const [field, value] of Object.entries(fields)) {
//         await updateTaskField(projectId, taskId, field, value);
//       }
//     }

    
//     setEditingValues({});
//     setShowInput(false);

//     await getTaskByProject(projectId); // refresh after save
//   };


  

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
//       {/* Toolbar */}
//       <div className="flex items-center gap-3 mb-4 bg-white p-3 rounded-xl shadow-sm border border-gray-300">
       
//         <Button
//         onClick= {() => setShowInput(!showInput)}
//         variant="secondary">Update</Button>
//         {/* <button
//           onClick={() => setShowInput(!showInput)}
//           className="bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-lg text-sm font-medium text-yellow-800"
//         >
//           Update
//         </button> */}
//         {showInput && (
//          <Button onClick={handleSaveAll} variant="primary">
//            Save
//          </Button>
//         )}

//         <button
//           onClick={() => setSortConfig({ key: "", direction: "" })}
//           className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm font-medium text-blue-800"
//         >
//           <CircleX /> Clear sort
//         </button>

//         <button
//           onClick={() => setShowFilter(!showFilter)}
//           className="flex items-center gap-2 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-lg text-sm font-medium text-green-800"
//         >
//           <ListFilter size={16} /> Filter
//         </button>
//         {showFilter && (
//           <input
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             type="text"
//             placeholder="Type to filter..."
//             className="border border-gray-300 m-2 p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
//           />
//         )}

//         <button
//           onClick={() => setShowGroup(!showGroup)}
//           className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded-lg text-sm font-medium text-purple-800"
//         >
//           <Grid2x2 size={16} /> Group
//         </button>
//         {showGroup && tasks.length > 0 && (
//           <select
//             onChange={(e) => setGroupBy(e.target.value)}
//             value={groupBy}
//             className="m-2 outline-none border border-gray-300 rounded-lg p-2"
//           >
//             <option value="">No group</option>
//             {selectedColumns.map((col) => (
//               <option key={col} value={col}>
//                 Group by {col}
//               </option>
//             ))}
//           </select>
//         )}

//         <button
//           onClick={() => setShowAddField(!showAddField)}
//           className="flex items-center gap-2 bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-lg text-sm font-medium text-yellow-800"
//         >
//           <RectangleEllipsis size={16} /> Edit Fields
//         </button>
//         {showAddField && tasks.length > 0 && (
//           <div className="flex flex-col border border-gray-300 p-3 bg-white rounded-lg shadow-sm absolute mt-12 z-10">
//             {Object.keys(tasks[0]).filter(col => !hiddenColumns.includes(col)).map((key) => (
//               <label key={key} className="text-sm flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedColumns.includes(key)}
//                   onChange={() => toggleColumn(key)}
//                   className="accent-blue-500"
//                 />
//                 {key}
//               </label>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-x-auto">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gradient-to-r from-blue-800 to-blue-500 text-white">
//             <tr>
//               {selectedColumns.map((key) => (
//                 <th
//                   key={key}
//                   onClick={() => handleSort(key)}
//                   className="py-3 px-6 text-left text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
//                 >
//                   {key}
//                   {sortConfig.key === key &&
//                     (sortConfig.direction === "asc" ? (
//                       <MoveUp className="inline-block" />
//                     ) : (
//                       <MoveDown className="inline-block" />
//                     ))}
//                 </th>
//               ))}
//               <th>
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {Object.entries(groupedRows).map(([group, data]) => (
//               <React.Fragment key={group}>
//                 {groupBy && (
//                   <tr>
//                     <td colSpan={selectedColumns.length} className="bg-gray-100 font-bold px-4 py-2 ">
//                       {group}
//                     </td>
//                   </tr>
//                 )}
//                 {data.map((row) => (
//                   <tr key={row._id} className="hover:bg-gray-50 transition-colors">
//                             {selectedColumns.map((col) => (
// <td
//   key={col}
//   className={
//     showInput
//       ? `text-sm text-gray-700`
//       : `px-6 py-3 text-sm text-gray-700 whitespace-nowrap`
//   }
// >
//   {["title", "description", "status", "priority", "dueDate"].includes(col) && showInput ? (
//     col === "status" ? (
//       <select
//         value={editingValues[row._id]?.[col] ?? row[col] ?? ""}
//         onChange={(e) => handleCellChange(row._id, col, e.target.value)}
//         className="border p-1 rounded w-fit h-14 text-sm border-none outline-blue-600"
//       >
//         <option value="To Do">To Do</option>
//         <option value="In Progress">In Progress</option>
//         <option value="Review">Review</option>
//         <option value="Completed">Completed</option>
//       </select>
//     ) : col === "priority" ? (
//       <select
//         value={editingValues[row._id]?.[col] ?? row[col] ?? ""}
//         onChange={(e) => handleCellChange(row._id, col, e.target.value)}
//         className="border p-1 rounded w-fit h-14 text-sm border-none outline-blue-600"
//       >
//         <option value="Low">Low</option>
//         <option value="Medium">Medium</option>
//         <option value="High">High</option>
//       </select>
//     ) : col === "dueDate" ? (
//       <input
//         type="date"
//         value={editingValues[row._id]?.[col] ?? row[col] ?? ""}
//         onChange={(e) => handleCellChange(row._id, col, e.target.value)}
//         className="border p-1 rounded w-fit h-14 text-sm border-none outline-blue-600"
//       />
//     ) : (
//       <input
//         type="text"
//         value={editingValues[row._id]?.[col] ?? row[col] ?? ""}
//         onChange={(e) => handleCellChange(row._id, col, e.target.value)}
//         className="border p-1 rounded w-fit h-14 text-sm border-none outline-blue-600"
//       />
//     )
//   ) : (
//     validateData(col, row[col])
//   )}
// </td>


//                             ))}

//                                 {/* Add extra column for Detail button */}
//                                 <td className="px-6 py-3 text-sm text-gray-700">
//                                   <Link
//                                     to={`/home/detail/${projectId}/taskDetail/${row._id}`}
//                                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
//                                   >
//                                     Detail
//                                   </Link>
//                                 </td>
//                     </tr>

//                 ))}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TrainingTable;
import React, { useEffect, useState } from "react";
import {
  ArrowDownUp,
  RectangleEllipsis,
  ListFilter,
  Grid2x2,
  CircleX,
  MoveDown,
  MoveUp
} from "lucide-react";
import useTaskStore from "./Store/taskStore";
import { convertToString , validateData} from "./lib/dateCorrector.jsx";
import { Authenticatioin } from "./Store/AuthenticateUser";
import {Link} from 'react-router-dom'
import TaskDetail from "./HomePage/TaskDetail.jsx";


 const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-sm';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60 shadow-sm hover:shadow-md',
    outline: 'border border-slate-300/60 bg-white/80 hover:bg-slate-50/80 text-slate-700 shadow-sm hover:shadow-md backdrop-blur-sm',
    ghost: 'hover:bg-slate-100/80 text-slate-600 hover:text-slate-700 transition-colors',
    destructive: 'bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const TrainingTable = ({ projectId }) => {
  const { tasks, getTaskByProject, updateTaskField } = useTaskStore();

  const [filter, setFilter] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [showAddField, setShowAddField] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [showInput, setShowInput] = useState(false);

 

  const [editingValues, setEditingValues] = useState({});

  useEffect(() => {
    if (projectId) getTaskByProject(projectId);
  }, [projectId, getTaskByProject]);

  const hiddenColumns = ["_id", "__v", "password", "secretField","comments","attachments","submitedFile","description"];
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setSelectedColumns(Object.keys(tasks[0]).filter(col => !hiddenColumns.includes(col)));
    }
  }, [tasks]);

  const filteredRows = tasks.filter((row) =>
    Object.values(row).some((f) =>
      String(f).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const groupedRows = groupBy
    ? sortedRows.reduce((acc, row) => {
        const groupKey = row[groupBy] || "Ungrouped";
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(row);
        return acc;
      }, {})
    : { All: sortedRows };

  const toggleColumn = (col) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleCellChange = (taskId, field, value) => {
    setEditingValues((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], [field]: value }
    }));
  };

  const handleSaveAll = async () => {
    for (const [taskId, fields] of Object.entries(editingValues)) {
      for (const [field, value] of Object.entries(fields)) {
        await updateTaskField(projectId, taskId, field, value);
      }
    }

    
    setEditingValues({});
    setShowInput(false);

    await getTaskByProject(projectId); // refresh after save
  };


  

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Tasks
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => setShowInput(!showInput)} variant="secondary" size="sm" className="gap-2">
              <ArrowDownUp size={16} />
              Update
            </Button>
            {showInput && (
              <Button onClick={handleSaveAll} variant="primary" size="sm" className="gap-2">
                Save changes
              </Button>
            )}
            <Button
              onClick={() => setSortConfig({ key: "", direction: "" })}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <CircleX size={16} />
              Clear sort
            </Button>
            <Button
              onClick={() => setShowFilter(!showFilter)}
              variant="outline"
              size="sm"
              className={`gap-2 ${showFilter ? 'ring-2 ring-indigo-200' : ''}`}
            >
              <ListFilter size={16} />
              Filter
            </Button>
            <Button
              onClick={() => setShowGroup(!showGroup)}
              variant="outline"
              size="sm"
              className={`gap-2 ${showGroup ? 'ring-2 ring-indigo-200' : ''}`}
            >
              <Grid2x2 size={16} />
              Group
            </Button>
            <Button
              onClick={() => setShowAddField(!showAddField)}
              variant="outline"
              size="sm"
              className={`gap-2 ${showAddField ? 'ring-2 ring-indigo-200' : ''}`}
            >
              <RectangleEllipsis size={16} />
              Edit fields
            </Button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="relative mb-4">
          <div className="flex flex-wrap items-center gap-3">
            {showFilter && (
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                type="text"
                placeholder="Search tasks…"
                className="h-10 w-full sm:w-72 rounded-lg border border-slate-200 bg-white/80 px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
              />
            )}
            {showGroup && tasks.length > 0 && (
              <select
                onChange={(e) => setGroupBy(e.target.value)}
                value={groupBy}
                className="h-10 w-full sm:w-56 rounded-lg border border-slate-200 bg-white/80 px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="">No group</option>
                {selectedColumns.map((col) => (
                  <option key={col} value={col}>
                    Group by {col}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* {showAddField && tasks.length > 0 && (
            <div className="absolute z-20 mt-3 w-64 rounded-xl border border-slate-200 bg-white/90 p-3 shadow-xl backdrop-blur-lg">
              <div className="max-h-64 space-y-2 overflow-y-auto pr-2">
                {Object.keys(tasks[0]).filter(col => !hiddenColumns.includes(col)).map((key) => (
                  <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(key)}
                      onChange={() => toggleColumn(key)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
                    />
                    {key}
                  </label>
                ))}
              </div>
            </div>
          )} */}


          {showAddField && tasks.length > 0 && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      onClick={() => setShowAddField(false)}
      aria-hidden="true"
    />
    <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-slate-800">
          Select visible fields
        </h3>
        <button
          onClick={() => setShowAddField(false)}
          className="rounded-md p-1.5 text-slate-600 transition-colors hover:bg-slate-100"
          aria-label="Close"
        >
          <CircleX size={18} />
        </button>
      </div>

      <div className="max-h-80 space-y-2 overflow-y-auto px-5 py-3">
        {Object.keys(tasks[0])
          .filter((col) => !hiddenColumns.includes(col))
          .map((key) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={selectedColumns.includes(key)}
                onChange={() => toggleColumn(key)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
              />
              <span className="capitalize">{key}</span>
            </label>
          ))}
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-4">
        <Button variant="ghost" size="sm" onClick={() => setShowAddField(false)}>
          Close
        </Button>
        <Button variant="primary" size="sm" onClick={() => setShowAddField(false)}>
          Done
        </Button>
      </div>
    </div>
  </div>
)}
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
                <tr>
                  {selectedColumns.map((key) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="group select-none whitespace-nowrap px-6 py-4 text-left text-sm font-semibold tracking-wide transition-colors hover:bg-indigo-600/70"
                    >
                      <div className="inline-flex items-center gap-2">
                        <span className="capitalize">{key}</span>
                        {sortConfig.key === key &&
                          (sortConfig.direction === "asc" ? (
                            <MoveUp className="inline-block" size={16} />
                          ) : (
                            <MoveDown className="inline-block" size={16} />
                          ))}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {Object.entries(groupedRows).map(([group, data]) => (
                  <React.Fragment key={group}>
                    {groupBy && (
                      <tr>
                        <td colSpan={selectedColumns.length + 1} className="bg-slate-50/70 px-6 py-3 text-sm font-semibold text-slate-700">
                          {group}
                        </td>
                      </tr>
                    )}
                    {data.map((row) => (
                      <tr key={row._id} className="transition-colors hover:bg-slate-50/60">
                        {selectedColumns.map((col) => (
                          <td
                            key={col}
                            className={
                              showInput
                                ? `align-middle text-sm text-slate-700`
                                : `whitespace-nowrap px-6 py-4 align-middle text-sm text-slate-800`
                            }
                          >
                            {["title", "description", "status", "priority", "dueDate"].includes(col) && showInput ? (
                              col === "status" ? (
                                <select
                                  value={editingValues[row._id]?.[col] ?? row[col] ?? ""}
                                  onChange={(e) => handleCellChange(row._id, col, e.target.value)}
                                  className="h-10 w-40 m-2 max-w-[14rem] rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                                >
                                  <option value="To Do">To Do</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Review">Review</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              ) : col === "priority" ? (
                                <select
                                  value={editingValues[row._id]?.[col] ?? row[col] ?? ""}
                                  onChange={(e) => handleCellChange(row._id, col, e.target.value)}
                                  className="h-10 w-40 m-2 max-w-[12rem] rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                                >
                                  <option value="Low">Low</option>
                                  <option value="Medium">Medium</option>
                                  <option value="High">High</option>
                                </select>
                              ) : col === "dueDate" ? (
                                <input
                                  type="date"
                                  value={editingValues[row._id]?.[col] ?? row[col] ?? ""}
                                  onChange={(e) => handleCellChange(row._id, col, e.target.value)}
                                  className="h-10 w-40 m-2 max-w-[14rem] rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={editingValues[row._id]?.[col] ?? row[col] ?? ""}
                                  onChange={(e) => handleCellChange(row._id, col, e.target.value)}
                                  className="h-10 w-60 m-2 max-w-[18rem] rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                                />
                              )
                            ) : (
                              validateData(col, row[col])
                            )}
                          </td>
                        ))}

                        <td className="px-6 py-4 align-middle text-sm">
                          <Link
                            to={`/home/detail/${projectId}/taskDetail/${row._id}`}
                            className="inline-flex h-9 items-center rounded-lg bg-indigo-500 px-3 text-xs font-medium text-white shadow hover:bg-indigo-600"
                          >
                            Detail
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingTable;