import mongoose from "mongoose";
import Employee from "../model/employee.js";




export async function connectDB(){
   console.log('inside db function');
try{
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FullstackDB';
  const connn = await mongoose.connect(mongoURI);
  console.log('database connected successfully');

    // await Employee.insertMany(employees);
}catch(error){
 console.log('database connection have an error: ' + error)
 process.exit(1);
}}  

