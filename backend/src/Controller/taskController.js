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


// export const getProjectWithTasks = async (req, res) => {
//   console.log('inside get task project')
//   const { projectId } = req.params;

//   try {
//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//    const tasks = await Task.find({ project: projectId }).select({
//       // exclude _id
//   project: 0,  // exclude project reference
//   __v: 0,      // exclude version key
//   watchers: 0  // correct field name if plural
// });

//     res.status(200).json({ tasks });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

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
      console.log('task status updated successfully')
    // record activity
    await recordActivity(project._id,req.user._id, "updated_task", "Task", taskId, {
      description: `updated task status from ${oldStatus} to ${value}`,
    });

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
      
      console.log('Submited files' + submittedFiles)

      const task =   await Task.findById(taskId);

      if(!task) return res.status(404).json({message:"task not found "})
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
            fileType:'submit',          
          })}
 
      );
        

      
      

        // task.submitedFile.push(...filesAsBase64);

        await task.save();


      task.save()
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

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


const addSubTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title } = req.body;

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

    const newSubTask = {
      title,
      completed: false,
    };

    task.subtasks.push(newSubTask);
    await task.save();

    // record activity
    await recordActivity(req.user._id, "created_subtask", "Task", taskId, {
      description: `created subtask ${title}`,
    });

    res.status(201).json(task);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateSubTask = async (req, res) => {
  try {
    const { taskId, subTaskId } = req.params;
    const { completed } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const subTask = task.subtasks.find(
      (subTask) => subTask._id.toString() === subTaskId
    );

    if (!subTask) {
      return res.status(404).json({
        message: "Subtask not found",
      });
    }

    subTask.completed = completed;
    await task.save();

    // record activity
    await recordActivity(req.user._id, "updated_subtask", "Task", taskId, {
      description: `updated subtask ${subTask.title}`,
    });

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



const addComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { text } = req.body;

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

    const newComment = await Comment.create({
      text,
      task: taskId,
      author: req.user._id,
    });

    task.comments.push(newComment._id);
    await task.save();

    // record activity
    await recordActivity(req.user._id, "added_comment", "Task", taskId, {
      description: `added comment ${
        text.substring(0, 50) + (text.length > 50 ? "..." : "")
      }`,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getCommentsByTaskId = async (req, res) => {
  try {
    const { taskId } = req.params;

    const comments = await Comment.find({ task: taskId })
      .populate("author", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


const watchTask = async (req, res) => {
  try {
    const { taskId } = req.params;

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

    const isWatching = task.watchers.includes(req.user._id);

    if (!isWatching) {
      task.watchers.push(req.user._id);
    } else {
      task.watchers = task.watchers.filter(
        (watcher) => watcher.toString() !== req.user._id.toString()
      );
    }

    await task.save();

    // record activity
    await recordActivity(req.user._id, "updated_task", "Task", taskId, {
      description: `${
        isWatching ? "stopped watching" : "started watching"
      } task ${task.title}`,
    });

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
