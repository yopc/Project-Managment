import express from "express";
import { upload } from "../lib/config.js";
import { checkAuth, getEmployeeById, getAllEmployee, login, register } from "../Controller/employeeController.js";
import { verifyEmployeEmail } from "../Controller/verifyController.js";
import { protectRoute } from "../middleware/middleware.js";

const employeeRoute = express.Router()


employeeRoute.post('/register', upload.fields([
   { name: 'profilePicture', maxCount: 1 },
   { name: 'SupplementaryFile', maxCount: 20 }
]) , register)


employeeRoute.post('/login' , login)
employeeRoute.get('/verfiyEmail' , verifyEmployeEmail)
employeeRoute.get('/getAllEmployee', protectRoute , getAllEmployee)
employeeRoute.get('/currentEmployee',protectRoute , checkAuth)
employeeRoute.get('/getEmployeeById/:id',protectRoute , getEmployeeById)

export default employeeRoute;