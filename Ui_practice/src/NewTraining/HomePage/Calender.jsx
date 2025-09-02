import React, { useState , useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import interactionPlugin from "@fullcalendar/interaction"; 
import useTaskStore from "../Store/taskStore";

// ✅ Local seed data
const seedTasks = [
  {
    id: 1,
    title: "Design Homepage",
    createdBy: "Alice",
    createdAt: "2025-08-01",
    dueDate: "2025-08-05",
  },
  {
    id: 2,
    title: "API Integration",
    createdBy: "Bob",
    createdAt: "2025-08-03",
    dueDate: "2025-08-10",
  },
  {
    id: 3,
    title: "Testing Phase",
    createdBy: "Charlie",
    createdAt: "2025-08-06",
    dueDate: "2025-08-12",
  },
];

// ✅ Component
export default function Calendar({id}) {
  // const [tasks] = useState(seedTasks);
  const {tasks , getTaskByProject} = useTaskStore();

   useEffect(() => {
      if (id) getTaskByProject(id);
    }, [id, getTaskByProject]);
  
    console.log('tasks ' + tasks)

  // Transform tasks into calendar events
  const events = tasks.map((task) => ({
    id: task._id,
    title: `${task.title} (By: ${task.createdBy.fullName})`,
    start: task.createdAt, // Show task creation date
    end: task.dueDate,     // Show task due date
  }));

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📅 Task Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventColor="#4f46e5" // nice indigo color
        eventTextColor="white"
        height="80vh"
      />
    </div>
  );
}
