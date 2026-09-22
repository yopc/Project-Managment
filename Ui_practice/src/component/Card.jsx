
import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { CalendarDays, User, Bell } from "lucide-react";
import Badge2 from "../NewTraining/components/ui/Badge2";

const Card = ({ id, title, dueDate, description, status, createdBy, progress, unreadCount }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full max-w-full p-4 sm:p-5
                    transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Header */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-start mb-3 gap-2 min-w-0">
        <h1 className="text-base font-semibold text-gray-900 font-roboto min-w-0 flex-1 line-clamp-2 sm:truncate">{title}</h1>
        <div className="flex items-center gap-1 text-gray-500 text-sm flex-shrink-0">
          <CalendarDays size={16} className="shrink-0" />
          <span title="This is the deadline for completing the task" className="whitespace-nowrap">
            {dueDate}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>

      {/* Status & Created By */}
      <div className="flex flex-wrap justify-between items-center gap-2 text-sm mb-4 min-w-0">
        <Badge2 status={status}/>

        <div className="flex items-center gap-1 text-gray-500 min-w-0">
          <User size={16} className="flex-shrink-0" />
          <span className="italic truncate">{createdBy}</span>
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
