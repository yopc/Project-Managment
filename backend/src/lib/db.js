import mongoose from "mongoose";
import Employee from "../model/employee.js";




export async function connectDB(){
   console.log('inside db function');
   
try{
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FullstackDB';
  console.log('MONGODB_URI environment variable:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
  console.log('Using MongoDB URI:', mongoURI);
  const connn = await mongoose.connect(mongoURI);
  console.log('database connected successfully');

    // await Employee.insertMany(employees);
}catch(error){
 console.log('database connection have an error: ' + error)
 process.exit(1);
}}  

