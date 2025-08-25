import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import { getActivityOfCurrentUser } from "../Controller/activityController.js";

const router = express.Router()

router.get('/getActivityLog', protectRoute, getActivityOfCurrentUser);

export default router;