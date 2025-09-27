import { io } from "../../server.js";
import Employee from "../model/employee.js";
import Project from "../model/project.js";
import Task from '../model/Task.js'
import mongoose from "mongoose";

export async function createProject(req , res) {

 const { title, description, startDate, dueDate} = req.body;

 try{
 const project = await Project.create({
       title,
       description,     
       startDate,
       dueDate,
       createdBy:req.user._id,
       members: [
         {
           user: req.user._id,
           role: "manager",
           joinedAt: new Date(),
         },
       ],
     });
 
     res.status(201).json({message:"project created successfully"});
   } catch (error) {
     console.log(error);
     res.status(500).json({
       message: "Internal server error while creating project",
     });
   }
}


export const getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
    }

    let project = await Project.findById(projectId)
      .populate('members.user', 'fullName email _id profilePicture')
      .populate({
        path: "createdBy",
        select: "fullName JobTitle profilePicture",
      })
      .lean();

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Ensure authentication
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMember = project.members.some(
      (member) => member.user?._id?.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({ message: "You are not a member of this project" });
    }

    // Convert members' profile pictures
    project.members = project.members.map(member => {
      const pic = member.user?.profilePicture;
      const bufferData = Buffer.isBuffer(pic) 
        ? pic 
        : pic?.data?.data ? Buffer.from(pic.data.data) : null;

      if (bufferData) {
        member.user.profilePicture = `data:${pic.contentType || 'image/png'};base64,${bufferData.toString('base64')}`;
      }
      return member;
    });

    // Convert createdBy's profile picture
    const createdPic = project.createdBy?.profilePicture;
    const createdBuffer = Buffer.isBuffer(createdPic) 
      ? createdPic 
      : createdPic?.data?.data ? Buffer.from(createdPic.data.data) : null;

    if (createdBuffer) {
      project.createdBy.profilePicture = `data:${createdPic.contentType || 'image/png'};base64,${createdBuffer.toString('base64')}`;
    }


      //   const totalTasks = await Task.countDocuments({ project: projectId });
      //   consst completedTasks = await Task.countDocuments({ project: projectId, status: "Completed" });
    
      //   const calculatedProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      // project.progress = calculatedProgress

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("members.user");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user._id.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    const tasks = await Task.find({
      project: projectId,    
    })
      .populate("assignees", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      project,
      tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Fetch projects by member ID
export const getProjectsByMember = async (req, res) => {
  try {
   

     if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const projects = await Project.find({
      "members.user": req.user._id,
    })
      .populate('createdBy', 'fullName')  // if you also want tasks populated
      .populate("members.user", "name email") // populate member details
      .populate("tasks")
      .sort({ createdAt: -1 }); // newest first

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found for this member." });
    }

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects by member:", error);
    res.status(500).json({ message: "Server error." });
  }
};


export const addMamberToProject = async (req , res) => {
   try {
    const {projectId} =  req.params;
    const {members} = req.body;

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    const project = await Project.findById(projectId)

    if(!project) return res.status(404).json({message:'project not found'});

    for(let member of members){
      const isEmployeeExsist = await Employee.findById(member.employeeId);
      if(!isEmployeeExsist)  return res.status(400).json({message:`Employee is not found ${member.user}`});
    }

    members.forEach((m) => {
      const isAlreadyMember = project.members.some((mem) =>   mem.user.toString() === m.employeeId.toString())
      if(isAlreadyMember) console.log(`emplpoyee is already a member`)
      if (!isAlreadyMember) {
        project.members.push({
          user: m.employeeId,
          role: m.role || "contributor",
        });
      }
    });
    

    await project.save();


    io.emit('memberAdded')

    console.log('member added successfully')

      res.status(200).json({
      message: "Members added successfully",
      project,
    });

   } catch (error) {
     console.log('error whilte adding member' + error)
   }

}

export const editProjectDescription = async (req , res) => {
  try {
    const {projectId} = req.params;
    const {description} = req.body

    const project = Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "project not found",
      });
    }

    if (description) project.description = description;
    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}



export const updateProject = async (req, res) => {
  console.log('INSIDE PROJECT UPDATE')
  try {
    const { projectId } = req.params; // project _id from URL
    const { title, status, startDate , description } = req.body;
   console.log('PROJECT ID' + projectId)
   console.log("START DATE" + startDate)
   console.log("STATUS" + status)

    // Find project and check ownership
    const project = await Project.findOne({ _id: projectId, createdBy: req.user });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "To update the project you must be creator of these project",
      });
    }

    // Update allowed fields
    if (title) project.title = title;
    if (status) project.status = status;
    if (startDate) project.startDate = startDate;
    if (description) project.description = description;

    project.updatedAt = new Date();

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};





/// PROJECT STATISTICS 

export const  allProjectData = async (req , res) => {  
  console.log('inside all project data')
  try {
    
     const NumOfTotalProject = await Project.countDocuments();

     const statusCount = await Project.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            value: "$count",
          },
        },
      ]);

      const projectProgressCount = await Project.aggregate([
      {
        $project: {
          _id: 0,
          name: "$title",
          value: "$progress",
        },
      },
    ]);

    res.status(200).json({
      NumOfTotalProject,
      statusCount,
      projectProgressCount
    })
  } catch (error) {
    console.log('error while count for total project' + error)
  }
}


export const projectDataForEmployee = async (req , res) => {

  try {
      
      const employeeId = new  mongoose.Types.ObjectId(req.user);
      const totalProjectForEmployee = await Project.countDocuments({
        "members.user": employeeId,   // employeeId = ObjectId of Employee
      });


      const statusCountsForEmployee = await Project.aggregate([
        {
          $match: {
            "members.user": employeeId,
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            value: "$count",
          },
        },
      ]);


      const projectProgressForEmployee = await Project.aggregate([
        {
          $match: {
            "members.user": employeeId,
          },
        },
        {
          $project: {
            _id: 0,
            name: "$title",
            value: "$progress",
          },
        },
      ]);


      const projectTitleVsDueDate = await Project.aggregate([
      { $match: { "members.user": employeeId } },
      {
        $project: {
          _id: 0,
          title: "$title",
          dueDate: 1,
        },
      },
    ]);


      res.status(200)
      .json({
        totalProjectForEmployee,
        statusCountsForEmployee,
        projectProgressForEmployee,
        projectTitleVsDueDate
      })



  } catch (error) {
    console.log('error while count for employee' + error)
  }

}
