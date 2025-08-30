import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import { getActivityByProjectId, getActivityOfCurrentUser , getActivityByProjectWithUnreadCount ,  markProjectActivitiesAsRead} from "../Controller/activityController.js";

const router = express.Router()

// router.get('/getActivityLog', protectRoute, getActivityByProject);
router.get('/getUnread', protectRoute, getActivityByProjectWithUnreadCount);

router.put('/read/:projectId', protectRoute, markProjectActivitiesAsRead);
router.get('/:projectId', protectRoute, getActivityByProjectId);

export default router;