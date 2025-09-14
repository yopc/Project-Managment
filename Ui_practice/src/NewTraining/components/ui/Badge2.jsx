import React from 'react'

const statusStyles = {
  "In Progress": 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Planning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Completed: 'bg-green-50 text-green-700 ring-1 ring-blue-200',
  "On Hold": 'bg-gray-100 text-gray-700 ring-1 ring-gray-200',
  Cancelled: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
};




const Badge2 = ({status}) => {
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status]}`}>{status}</div>
  )
}

export default Badge2