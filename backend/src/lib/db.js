import mongoose from "mongoose";
import Employee from "../model/employee.js";




export async function connectDB(){
   console.log('inside db function');
   
try{
  // Get the raw environment variable
  const rawMongoURI = process.env.MONGODB_URI;
  console.log('MONGODB_URI environment variable:', rawMongoURI ? 'SET' : 'NOT SET');
  
  // Clean and validate the URI
  let mongoURI;
  if (rawMongoURI) {
    // Remove any potential invisible characters and trim whitespace
    mongoURI = rawMongoURI.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');
    console.log('Raw MONGODB_URI value:', JSON.stringify(rawMongoURI));
    console.log('Cleaned MONGODB_URI value:', JSON.stringify(mongoURI));
  } else {
    mongoURI = 'mongodb://localhost:27017/FullstackDB';
  }
  
  console.log('Using MongoDB URI:', JSON.stringify(mongoURI));
  console.log('URI length:', mongoURI ? mongoURI.length : 'undefined');
  console.log('URI starts with mongodb:', mongoURI ? mongoURI.startsWith('mongodb') : false);
  
  // Validate URI format before attempting connection
  if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
    throw new Error(`Invalid MongoDB URI format. Expected to start with 'mongodb://' or 'mongodb+srv://', but got: ${mongoURI.substring(0, 20)}...`);
  }
  
  const connn = await mongoose.connect(mongoURI);
  console.log('database connected successfully');

    // await Employee.insertMany(employees);
}catch(error){
 console.log('database connection have an error: ' + error)
 process.exit(1);
}}  

