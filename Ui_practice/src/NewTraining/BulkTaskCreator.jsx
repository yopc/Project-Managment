// src/components/BulkTaskCreator.jsx
import React from "react";
import { useParams } from "react-router-dom";
import useTaskStore from "./Store/taskStore";
import { useEffect } from "react";


const BulkTaskCreator = ({projectId}) => {

  const {
    taskTitles,
    addTaskTitle,
    removeTaskTitle,
    updateTaskTitle,
    submitTasks,
    tasks,
    getTaskByProject
  } = useTaskStore();

  // useEffect(() => {

  //  getTaskByProject()
  // }, [tasks])

    useEffect(() => {
    if (projectId) {
      getTaskByProject(projectId);
    }
  }, [projectId]); // fetch only when projectId changes

const headers = tasks.length > 0 ? Object.keys(tasks[0]) : [];
  // Example token (normally from auth store or context)
console.log('project id' + projectId)
console.log('tasks' + tasks)

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Create Multiple Tasks for Project {projectId}</h2>

      {taskTitles.map((title, index) => (
        <div
          key={index}
          style={{ display: "flex", marginBottom: "8px", gap: "5px" }}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => updateTaskTitle(index, e.target.value)}
            placeholder={`Task ${index + 1} title`}
            style={{ flex: 1, padding: "6px" }}
          />
          <button
            onClick={() => removeTaskTitle(index)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "0 8px",
              cursor: "pointer"
            }}
            disabled={taskTitles.length === 1} // Can't remove last input
          >
            -
          </button>
        </div>
      ))}

      <button
        onClick={addTaskTitle}
        style={{
          background: "green",
          color: "white",
          border: "none",
          padding: "6px 12px",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        + Add Task
      </button>

      <button
        onClick={() => submitTasks(projectId)}
        style={{
          background: "blue",
          color: "white",
          border: "none",
          padding: "6px 12px",
          cursor: "pointer"
        }}
      >
        Submit All Tasks
      </button>



   
    </div>
  );
};

export default BulkTaskCreator;
