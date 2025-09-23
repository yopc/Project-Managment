// import React from 'react'
// import LinearProgress from "@mui/material/LinearProgress";
// import { Link } from 'react-router-dom';

// const Card = ({id , title , dueDate , description , status , createdBy , progress, unreadCount}) => {
//   return (
    
//       <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-96 p-4 m-3 transition-transform duration-200 hover:shadow-2xl hover:-translate-y-1">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-2 gap-2">
//         <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
//         <span className="text-sm text-gray-500">{`Due: ${dueDate}`}</span>
//       </div>

//       {/* Description */}
//       <p className="text-sm text-gray-600 leading-relaxed mb-3">
//        {description}
//       </p>

//       {/* Status Row */}
//       <div className="flex justify-between items-center text-sm text-gray-700 mb-3">
//         <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
//           {status}
//         </span>
//         <span className="text-gray-500 italic">{`by ${createdBy}`}</span>
//       </div>

//       {/* Progress Bar */}
//      <LinearProgress
//   variant="determinate"
//   value={progress}
//   sx={{
//     height: 8,
//     borderRadius: 5,
//     backgroundColor: "#e5e7eb",
//     "& .MuiLinearProgress-bar": {
//       backgroundColor: "#3b82f6",
//     },
//   }}
// />

// {unreadCount > 0 && <h1>{unreadCount}</h1>}


//       {/* Footer Actions */}
//       <div className="flex justify-end mt-4">
//         <Link className="text-blue-600 font-medium hover:bg-blue-300 hover:rounded-lg px-2"  to={`/home/detail/${id}/`}>
//           View Details
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Card


import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { CalendarDays, User, Bell } from "lucide-react";
import Badge2 from "../NewTraining/components/ui/Badge2";

const Card = ({ id, title, dueDate, description, status, createdBy, progress, unreadCount }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full max-w-md p-5 m-4 
                    transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-3 h-10">
        <h1 className="text-base font-semibold text-gray-900 font-roboto">{title}</h1>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <CalendarDays size={16} />
          <span title="This is the deadline for completing the task">
  {dueDate}
</span>

        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 h-20">
        {description}
      </p>

      {/* Status & Created By */}
      <div className="flex justify-between items-center text-sm mb-4 ">
        {/* <span
          className={`px-3 py-1 rounded-full font-medium text-xs  whitespace-nowrap
            ${status === "Completed" ? "bg-green-100 text-green-700" :
              status === "In Progress" ? "bg-blue-100 text-blue-700" :
              "bg-gray-100 text-gray-700"}`}
        >
          {status}
        </span> */}
        <Badge2 status={status}/>
        
        <div className="flex items-center gap-1 text-gray-500">
          <User size={16} />
          <span className="italic whitespace-nowrap">{createdBy}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 6,
            backgroundColor: "#f1f5f9",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#3b82f6",
            },
          }}
        />
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>{progress}%</span>
          {unreadCount > 0 && (
            <span className="flex items-center gap-1 text-red-500 font-semibold">
              <Bell size={14} /> {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end">
        <Link
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm 
                     hover:bg-blue-700 transition-colors duration-200"
          to={`/home/detail/${id}/`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
