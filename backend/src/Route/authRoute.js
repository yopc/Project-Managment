import express from "express";
import { signup , login, getUsers} from "../Controller/authController.js";
import { verifyEmail } from "../Controller/verifyController.js";
import { upload } from "../lib/config.js";
const router = express.Router();

router.post('/signup',upload.single('profilePicture'),signup);
router.post('/login',login);
router.get("/verify-email", verifyEmail);
router.get("/allUser", getUsers);

export default router;