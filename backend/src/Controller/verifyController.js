import User from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Employee from "../model/employee.js";
dotenv.config();


export async function verifyEmail(req, res) {
  const { token } = req.query;

  try { 


    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
    console.log("Decoded token:", decoded);


    const user = await User.findById(decoded.userId);
    
   
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error", error.message);
    res.status(400).json({ message: "Invalid or expired token" });
  }
}


export async function verifyEmployeEmail(req , res){
  try{
      const {token }  = req.query;
      console.log('security key: ' + process.env.JWT_SECRET_KEY)
      const verified = jwt.verify(token , process.env.JWT_SECRET_KEY);

      if(!verified) res.status(400).json({message:'email not verified'})

      const employee = await Employee.findById(verified.userId);

      if(!employee) return res.status(400).json({message: ' invalid token'})

              employee.isVerified = true;
              await employee.save();
   return res.redirect("http://localhost:5173/email-verified");

  }catch(error){
      console.error("Email verification error", error.message);
      res.status(400).json({ message: "Invalid or expired token" });
  }





}