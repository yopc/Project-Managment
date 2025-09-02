import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import { upload } from "../lib/config.js";
import { createMultipleTasks, 
        getProjectWithTasks, 
        getTaskById, 
        updateTaskAssignees, 
        updateTaskDescription, 
        updateTaskPriority, 
        updateTaskStatus, 
        updateTaskTitle ,
        assignTaskToEmployee,
        submiteFileToTask,
        getPriorityCountByProject,
        getStatusCountByProject,
        updateTaskDueDate} from "../Controller/taskController.js";

const router = express.Router();


router.get('/getTask/:taskId' , protectRoute , getTaskById)
router.post('/multipleTask/:projectId' , protectRoute , createMultipleTasks)
router.get('/projectTask/:projectId' , protectRoute , getProjectWithTasks)
router.post('/title/update/:projectId' , protectRoute , updateTaskTitle)
router.post('/dueDate/update/:projectId' , protectRoute , updateTaskDueDate)
router.post('/description/update/:projectId' , protectRoute , updateTaskDescription)
router.post('/status/update/:projectId' , protectRoute , updateTaskStatus)
router.post('/add/assigne/:projectId' , protectRoute , updateTaskAssignees)
router.post('/priority/update/:projectId' , protectRoute , updateTaskPriority)
router.post('/title/update/:projectId' , protectRoute , updateTaskTitle)
router.post('/assigne/:taskId' , protectRoute , assignTaskToEmployee)
router.post(
  '/submitFile/:taskId',
  protectRoute, // check user first
  upload.fields([    
    { name: 'submmitedFiles', maxCount: 20 }
  ]),
  submiteFileToTask
);



router.get('/getPriorityCountByProject/:projectId' , getPriorityCountByProject)
router.get('/getStatusCountByProject/:projectId' , getStatusCountByProject)

export default router;