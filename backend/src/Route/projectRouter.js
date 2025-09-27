import express from "express";
import { createProject ,
     getProjectDetails ,
      getProjectsByMember, 
      getProjectTasks , 
      addMamberToProject , 
      updateProject, 
      editProjectDescription,
      allProjectData,
      projectDataForEmployee} from "../Controller/projectController.js";
import {protectRoute} from "../middleware/middleware.js";
const router = express.Router();


router.put('/update/:projectId' , protectRoute , updateProject)
router.put('/updateDescription/:projectId',protectRoute , editProjectDescription)

router.post('/createProject' , protectRoute , createProject)
router.get('/allProjectData' , allProjectData)
router.get('/projectDataForEmployee' , protectRoute , projectDataForEmployee)
router.get('/member/getProject' , protectRoute , getProjectsByMember)

router.get('/:projectId' , protectRoute , getProjectDetails)
router.get('/:projectId/task' , protectRoute , getProjectTasks)
router.post('/addMembers/:projectId' , protectRoute , addMamberToProject)


// statstics 



export default router;