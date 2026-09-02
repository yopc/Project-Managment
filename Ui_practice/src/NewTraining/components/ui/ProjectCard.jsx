import React from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from 'react-router-dom';

const ProjectCard = ({ id, title, dueDate, description, status, createdBy, progress, unreadCount }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      'active': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'completed': 'bg-blue-100 text-blue-700 border-blue-200',
      'pending': 'bg-amber-100 text-amber-700 border-amber-200',
      'delayed': 'bg-red-100 text-red-700 border-red-200',
      'on-hold': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "#10b981"; // green
    if (progress >= 60) return "#3b82f6"; // blue  
    if (progress >= 40) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  return (
    <div className="group bg-white rounded-3xl shadow-sm border border-gray-100 p-7 max-sm:p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-gray-200 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      
      {/* Notification badge */}
      {unreadCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 gap-4">
          <h2 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {title}
          </h2>
          <div className="text-right flex-shrink-0">
            <div className="text-xs font-medium text-gray-500 mb-1">Due Date</div>
            <div className="text-sm font-semibold text-gray-700">{dueDate}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 text-sm">
          {description}
        </p>

        {/* Status and Creator */}
        <div className="flex justify-between items-center mb-6">
          <div className={`px-4 py-2 rounded-full font-semibold text-xs border ${getStatusColor(status)} transition-all duration-300`}>
            {status?.toUpperCase()}
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Created by</div>
            <div className="text-sm font-medium text-gray-700">{createdBy}</div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-gray-600">Progress</span>
            <span className="text-sm font-bold text-gray-800">{progress}%</span>
          </div>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 8,
              backgroundColor: "#f3f4f6",
              "& .MuiLinearProgress-bar": {
                backgroundColor: getProgressColor(progress),
                borderRadius: 8,
                transition: "all 0.3s ease"
              },
            }}
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <Link 
            to={`/home/detail/${id}/`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:scale-105 group/button"
          >
            <span>View Details</span>
            <svg className="ml-2 w-4 h-4 transition-transform group-hover/button:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;