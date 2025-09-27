import mongoose from "mongoose";
import Employee from "../model/employee.js";




export async function connectDB(){
   console.log('inside db function');
   
try{
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FullstackDB';
  console.log('MONGODB_URI environment variable:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
  console.log('Raw MONGODB_URI value:', JSON.stringify(process.env.MONGODB_URI));
  console.log('Using MongoDB URI:', JSON.stringify(mongoURI));
  console.log('URI length:', mongoURI ? mongoURI.length : 'undefined');
  console.log('URI starts with mongodb:', mongoURI ? mongoURI.startsWith('mongodb') : false);
  const connn = await mongoose.connect(mongoURI);
  console.log('database connected successfully');

    // await Employee.insertMany(employees);
}catch(error){
 console.log('database connection have an error: ' + error)
 process.exit(1);
}}  

