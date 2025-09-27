import Project from "../model/project.js";
import Task from "../model/Task.js";
import { recordActivity } from "../lib/recordActivity.js";
import { correctImageSting } from "../utils/imageStringCorrector.js";
import Employee from "../model/employee.js";
import {getReceiverSocketId , io} from '../../server.js'

const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status, priority, dueDate, assignees } =
      req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }


    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this workspace",
      });
    }

    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignees,
      project: projectId,
      createdBy: req.user._id,
    });

    project.tasks.push(newTask._id);
    await project.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};




export const createMultipleTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { tasks } = req.body;


    const project = await Project.findById(projectId)

    if(!project) {
      return res.status(404).json({message:'project not found'})
    }

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ message: "No tasks provided" });
    }

    const createdBy = req.user._id;

    const tasksWithDetails = tasks.map((task) => ({
      ...task,
      project: projectId,
      createdBy
    }));

    const createdTasks = await Task.insertMany(tasksWithDetails);
     const taskIds = createdTasks.map((t) => t._id);
        await Project.findByIdAndUpdate(
          projectId,
          { $push: { tasks: { $each: taskIds } } },
          { new: true }
        );
    res.status(201).json({
      message: `${createdTasks.length} tasks created successfully`,
      data: createdTasks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating tasks" });
  }
};



export const getProjectWithTasks = async (req, res) => {
  console.log('inside get task project');
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const tasks = await Task.find({ project: projectId })
    .populate({
      path: "createdBy",
      select: "fullName JobTitle profilePicture",
    })
    .populate(
      'project','_id title'
    )
    .populate('assignees', 'fullName profilePicture')
    .lean(); 
    
res.status(200).json({ tasks: correctImageSting(tasks) });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const getTaskById = async (req, res) => {
  console.log('get task by id')
  try {
    const { taskId } = req.params;
     console.log(taskId)
    const task = await Task.findById(taskId)
      .populate("assignees", "fullName JobTitle profilePicture")
      .populate("createdBy", "fullName JobTitle profilePicture")
      .populate("project","_id title")     
      .populate("submitedFile.uploadedBy","fullName")     

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project).populate(
      "members.user",
      "name profilePicture"
    );
    console.log(task.title)
    res.status(200).json({ task, project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateTaskTitle = async (req, res) => {

  try {
    const {taskId , value} = req.body

    console.log('task id' + taskId)
    console.log('task id' + value)

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    const oldTitle = task.title;

    task.title = value;
    await task.save();

    // record activity
    const update = await recordActivity(project._id,req.user._id, "updated_task", "Task", taskId, {
      description: `updated task title from ${oldTitle} to ${value}`,
    });


    //  io.to(project._id.toString()).emit("projectNotification", update.toObject());
     io.to(project._id.toString()).emit("projectNotification");

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateTaskDueDate = async (req , res) => {
  try {
     const {taskId, value} = req.body

     const task = await Task.findById(taskId)


      if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    const OldDueDate = task.dueDate;

    task.dueDate = value
    await task.save();

     const update = await recordActivity(project._id,req.user._id, "updated_task", "Task", taskId, {
      description: `updated task Due Date from ${OldDueDate} to ${value}`,
    });
   
    io.to(project._id.toString()).emit("projectNotification");
   
    res.status(200).json(task);



  } catch (error) {
    console.log('error while updating due date' + error)
     return res.status(500).json({
      message: "Internal server error",
    });
  }
}


export const updateTaskStatus = async (req, res) => {
  try {
   
    const { taskId , value } = req.body;
    console.log('task id ==========' + taskId)
    console.log('task id ==========' + value)

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }
    const oldStatus = task.status;

    task.status = value;

    await task.save();

    const totalTasks = await Task.countDocuments({ project: project._id });
    const completedTasks = await Task.countDocuments({ project: project._id, status: "Completed" });

    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    console.log('total task' + totalTasks)
    console.log('completedTask' + completedTasks)
    console.log('calculated progress =  ' + progress)
    console.log('project.progress progress =  ' + project.progress)
    if(project.progress !== progress){
      console.log('inside project progress')
      project.progress = Math.round(progress)

      if(project.progress === 100){
        project.status = "Completed"
      }

      await project.save();
    }

    
    
  
      console.log('task status updated successfully')
    // record activity
    await recordActivity(project._id,req.user._id, "updated_task", "Task", taskId, {
      description: `updated task status from ${oldStatus} to ${value}`,
    });

    io.to(project._id.toString()).emit("projectNotification");

    res.status(200).json({ success: true, message: "Task updated successfully" });

    
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateTaskDescription = async (req, res) => {
  try {
     const {taskId , value} = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    const oldDescription =
      task.description.substring(0, 50) +
      (task.description.length > 50 ? "..." : "");
    const newDescription =
      value.substring(0, 50) + (value.length > 50 ? "..." : "");

    task.description = value;
    await task.save();

    // record activity
    await recordActivity(project._id,req.user._id, "updated_task", "Task", taskId, {
      description: `updated task description from ${oldDescription} to ${newDescription}`,
    });

    io.to(project._id.toString()).emit("projectNotification");
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const assignTaskToEmployee = async (req, res) => {
console.log('insidee assigne Task to employee page ')
  try {
    const {taskId} = req.params
    const {assignees } = req.body;


    console.log('task Id' + taskId)
    console.log('assigne Employee Id' + assignees)

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    console.log('task ' + task)
    const project = await Project.findById(task.project);
    if (!project) return res.status(404).json({ message: "Project not found" });
     
    // check if current user is a project member
    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );
    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project to assign a task",
      });
    }

    // validate employees exist
    for (let employeeId of assignees) {
      const isEmployee = await Employee.findById(employeeId);
      if (!isEmployee) {
        return res
          .status(400)
          .json({ message: `Employee ${employeeId} not found` });
      }

      // add only if not already assigned
      if (!task.assignees.includes(employeeId)) {
        task.assignees.push(employeeId);
      }
    }

    await task.save();
    io.to(project._id.toString()).emit("projectNotification");
    return res.status(200).json({
      message: "Employees assigned successfully",
      task,
    });
  } catch (error) {
    console.error("Error while assigning employees:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const submiteFileToTask = async (req , res) => {
  try {
      const {taskId} = req.params;
      const submittedFiles = req.files.submmitedFiles || [];
      const {fileType} = req.body;
      console.log('Submited files' + submittedFiles)
      console.log('file type' + fileType);

      const task =   await Task.findById(taskId);
      if(!task) return res.status(404).json({message:"task not found "})
        
        const project = await Project.findById(task.project)
        
        if(!project) return res.status(404).json({message:"project not found "})

      const isAssigned = task.assignees.some((assignee) => assignee.equals(req.user._id));
      const isCreator = task.createdBy.equals(req.user._id)
      if(!isAssigned && !isCreator){

        return res.status(403).json({message:"you don't have access to these project"})
      }
      submittedFiles.forEach((file) => console.log(file.originalname))
      
      submittedFiles.forEach(       
        (file) => {          
          task.submitedFile.push({
            data:`${file.originalname}data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
            uploadedBy:req.user._id,
            fileType:fileType,          
          })}
 
      );
        

      
      

        // task.submitedFile.push(...filesAsBase64);

        await task.save();


      task.save()
      io.to(project._id.toString()).emit("projectNotification");
      res.status(200).json({message:"file submitted successfully"});
      } catch (error) {
        console.log('you have error while submmting the file' + error)
        return res.status(500).json({ message: "Internal server error" });
      }

}





export const updateTaskAssignees = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { assignees } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    const oldAssignees = task.assignees;

    task.assignees = assignees;
    await task.save();

    // record activity
    await recordActivity(project._id,req.user._id, "updated_task", "Task", taskId, {
      description: `updated task assignees from " ${oldAssignees.length} " to " ${assignees.length} " `,
    });

     io.to(project._id.toString()).emit("projectNotification");

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const updateTaskPriority = async (req, res) => {
  try {
   
    const {taskId , value } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    const oldPriority = task.priority;

    task.priority = value;
    await task.save();

    // record activity
    await recordActivity(project._id, req.user._id, "updated_task", "Task", taskId, {
      description: `updated task priority from ${oldPriority} to ${value}`,
    });

    io.to(project._id.toString()).emit("projectNotification");

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};






const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignees: { $in: [req.user._id] } })
      .populate("project", "title workspace")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


const getActivityByResourceId = async (req, res) => {
  try {
    const { resourceId } = req.params;

    const activity = await ActivityLog.find({ resourceId })
      .populate("user", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};










//////////STATSTICS//////////



// Get priority counts by projectId
export const getPriorityCountByProject = async (req, res) => {
  console.log('start getting priority count')
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    // Find tasks under this project
    // const tasks = await Task.find({ projectId });
    const tasks = await Task.find({ project: projectId });


    // Initialize counts
    let counts = { Low: 0, Medium: 0, High: 0 };

    tasks.forEach((task) => {
      if (task.priority && counts.hasOwnProperty(task.priority)) {
        counts[task.priority] += 1;
      }
    });

    // Convert to recharts format
    const result = [
      { name: "Low", value: counts.Low },
      { name: "Medium", value: counts.Medium },
      { name: "High", value: counts.High },
    ];

    result.forEach(
      (r) => console.log(r.name +  r.value)
    )

    res.json(result);
  } catch (err) {
    console.error("Error fetching priority counts:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const  getStatusCountByProject = async (req , res) => {
  try {
    const {projectId} = req.params;


     if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

     const tasks = await Task.find({ project: projectId });

     let counts = {"To Do":0, "In Progress":0, "Review":0, "Completed":0}

     tasks.forEach((task) => {
      if(task.status && counts.hasOwnProperty(task.status)){
        counts[task.status] += 1;
      }
     })

     const result = [
      {name: "To Do", value:counts["To Do"]}, 
      {name: "In Progress" ,value:counts["In Progress"]}, 
      {name: "Review", value:counts.Review},
      {name: "Completed",value:counts.Completed}
     ]


     res.json(result)
  } catch (error) {
    console.log("Error while fetching count status" + error);
    res.status(200).json({message:"server error"})
  }
}

export const numberOfTaskByCreator = async (req, res) => {

  console.log('number of task created by ')
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    // Fetch tasks for the given project
    const tasks = await Task.find({ project: projectId }).populate("createdBy", "fullName");

    // Count tasks per creator
    const taskCount = tasks.reduce((acc, task) => {
      const creatorName = task.createdBy?.fullName || "Unknown"; // fallback if no creator
      acc[creatorName] = (acc[creatorName] || 0) + 1;
      return acc;
    }, {});

     const result = Object.entries(taskCount).map(([name, value]) => ({
      name,
      value
    }));

   

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in numberOfTaskByCreator:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};


// 1. Number of tasks per createdAt date
export const numberOfTaskByCreatedAt = async (req, res) => {

  console.log('number of task created at')
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const tasks = await Task.find({ project: projectId });

    // Group by createdAt (date only, without time)
    const counts = tasks.reduce((acc, task) => {
      const date = task.createdAt.toISOString().split("T")[0]; // YYYY-MM-DD
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const result = Object.entries(counts).map(([date, value]) => ({
      date,
      value
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in numberOfTaskByCreatedAt:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// 2. Number of tasks per dueDate
export const numberOfTaskByDueDate = async (req, res) => {
  console.log('number ot task created due date')
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const tasks = await Task.find({ project: projectId });

    // Group by dueDate (date only)
    const counts = tasks.reduce((acc, task) => {
      if (!task.dueDate) return acc; // skip if no dueDate
      const date = task.dueDate.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const result = Object.entries(counts).map(([date, value]) => ({
      date,
      value
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in numberOfTaskByDueDate:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// 3. Calculate project progress (completed %)
export const projectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const totalTasks = await Task.countDocuments({ project: projectId });
    const completedTasks = await Task.countDocuments({ project: projectId, status: "Completed" });

    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return res.status(200).json({
      totalTasks,
      completedTasks,
      progress: `${progress.toFixed(2)}%`
    });
  } catch (error) {
    console.error("Error in projectProgress:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

