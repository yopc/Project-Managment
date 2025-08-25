import express from "express";
import { createProject , getProjectDetails , getProjectsByMember, getProjectTasks , addMamberToProject } from "../Controller/projectController.js";
import {protectRoute} from "../middleware/middleware.js";
const router = express.Router();

router.post('/createProject' , protectRoute , createProject)
router.get('/:projectId' , protectRoute , getProjectDetails)
router.get('/:projectId/task' , protectRoute , getProjectTasks)
router.get('/member/getProject' , protectRoute , getProjectsByMember)
router.post('/addMembers/:projectId' , protectRoute , addMamberToProject)

export default router;