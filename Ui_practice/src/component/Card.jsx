import React from 'react'
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from 'react-router-dom';

const Card = ({id , title , dueDate , description , status , createdBy , progress}) => {
  return (
    
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-96 p-4 m-3 transition-transform duration-200 hover:shadow-2xl hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 gap-2">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        <span className="text-sm text-gray-500">{`Due: ${dueDate}`}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
       {description}
      </p>

      {/* Status Row */}
      <div className="flex justify-between items-center text-sm text-gray-700 mb-3">
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
          {status}
        </span>
        <span className="text-gray-500 italic">{`by ${createdBy}`}</span>
      </div>

      {/* Progress Bar */}
     <LinearProgress
  variant="determinate"
  value={progress}
  sx={{
    height: 8,
    borderRadius: 5,
    backgroundColor: "#e5e7eb",
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#3b82f6",
    },
  }}
/>


      {/* Footer Actions */}
      <div className="flex justify-end mt-4">
        <Link className="text-blue-600 font-medium hover:bg-blue-300 hover:rounded-lg px-2"  to={`/home/detail/${id}/`}>
          View Details
        </Link>
      </div>
    </div>
  )
}

export default Card