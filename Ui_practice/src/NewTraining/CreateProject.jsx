import React, { useState } from "react";
import { ProjectCreator } from "./Store/ProjectCreator";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    startDate: "",
    dueDate: "",
    member: ""
  });
  const {createProject,creationMsg} =  ProjectCreator();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Data:", formData);
    createProject(formData);
  };

  return (
    <div className="flex  m-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl  w-full rounded-2xl p-8 max-sm:p-4  border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
          Create New Project
        </h2>


        <div className="flex flex-col md:flex-row gap-4 ">
        <div className="flex-1 min-w-0"> 
       

        {/* Title */}
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter project description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>


              <div className="flex flex-col sm:flex-row gap-4">
                  <div className="mb-5 flex-1">
                    <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Due Date */}
                  <div className="mb-5 flex-1">
                    <label className="block text-gray-700 font-medium mb-2">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

              </div>
        {/* Start Date */}

        {/* Member */}
        </div>
     <div className="flex-1 min-w-0">
      
     { creationMsg && <span>{creationMsg}</span>}
        
        </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
