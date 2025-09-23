import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true
  },
  Directorate: {
    type: String,
    required: true,
    trim: true
  },
  JobTitle: {
    type: String,
    required: true,
    trim: true
  }, 
  bio:{
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }, 
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'intern'], // customize as needed
    required: true
  },  
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  }, 
  role: {
    type: String,
    enum: ['employee', 'admin', 'manager', 'hr'], // update roles as per system
    default: 'employee'
  },
  isVerified: { type: Boolean, default: false },
  profilePicture: String,
  SupplementaryFile: [
    {
      fileName:  String ,
      data:  String , // base64 encoded string
      // contentType: { type: String },
    }
  ],

  // SupplementaryFile:[String],

  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  }

});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
