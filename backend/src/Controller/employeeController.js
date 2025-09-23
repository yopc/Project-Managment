import Employee from "../model/employee.js";
import jwt from 'jsonwebtoken';
import { sendVerificationEmail , sendPasswordResateEmail } from '../utils/email.js';
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export async function register(req, res) {
 const {  
  fullName,
  email,
  password,
  phoneNumber, 
  Directorate,
  JobTitle,  
  bio,
  date,  
  employmentType, 
  gender, 
  role
} = req.body;

 
 const profilePicture = req.files?.profilePicture?.[0] || null;
 const SupplementaryFiles = req.files?.SupplementaryFile || [];
    console.log('suplmentary file ')

    SupplementaryFiles.forEach((file) => (
      console.log('file name : ' + file.originalname)
    ))


 

  try {
     
    const allFieldValue =  [
      Directorate,
      JobTitle,
      SupplementaryFiles,
      profilePicture,
      bio,
      date,
      email,
      employmentType,
      fullName,
      gender,     
      phoneNumber, 
      role,
      password
    ];


  

    if (allFieldValue.some(field => !field || field.length === 0)) {
      return res.status(400).json({ message: "All fields are required" });
    }  

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }


    const hashedPassword = await bcrypt.hash(password , 10);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists, please use a diffrent one" });
    }  
  

    let profilePictureBase64 = null;

    if (req.files?.profilePicture?.[0]) {
      const file = req.files.profilePicture[0];
      // Convert to base64 string with content type
      profilePictureBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    }
   


    const newEmployee = new Employee({  
    email,
    password:hashedPassword,
    Directorate,
    JobTitle,
    bio,
    date,
    employmentType,
    fullName,  
    gender,
    phoneNumber,
    role,
    profilePicture:profilePictureBase64,
    SupplementaryFile: SupplementaryFiles.map((supfile) => ({
    fileName: supfile.originalname,
    data: `data:${supfile.mimetype};base64,${supfile.buffer.toString('base64')}`
  }))

  });

   await newEmployee.save();

  const token = jwt.sign({ userId: newEmployee._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  // res.cookie("jwt", token, {
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  //   httpOnly: true, // prevent XSS attacks,
  //   sameSite: "strict", // prevent CSRF attacks
  //   secure: process.env.NODE_ENV === "production",
  // });
   try {
    
     await sendVerificationEmail(email, token);
   } catch (error) {
     console.log("error" + error)
     res.status(500).json({ message: "Unable to send email please chack your email" });
   }

     res.status(200).json({ message: "Registered successfull please verify your email"});

  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req , res){
  console.log('inside employee login page')

  try{
  const {email , password} = req.body
  console.log(password)
  console.log(email)

  if(!email || !password) return  res.status(400).json({message: 'all fields are required'})
   

  const employee = await Employee.findOne({email})
  if(!employee) return  res.status(401).json({message:'invalid email or password'})

  const bcryptPasswordChack = await bcrypt.compare(password , employee.password);
  if(!bcryptPasswordChack) return res.status(401).json({message: 'invalid email or password p'});

  if(!employee.isVerified) return res.status(401).json({message: 'email not verified'})
  
    // for token 
    // 1 user id 
    // 2 secret key 
    // 3 expiration date 
  const token = jwt.sign({employeeId: employee._id} , process.env.JWT_SECRET_KEY , {
    expiresIn:"2d",
  })

  console.log('token prepared')

  res.cookie('jwt', token , {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
  })

  console.log('token send successfully')

  res.status(200).json({ success: true, employee });

  }catch(error){
    // console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }  

   
}


export async function getAllEmployee(req , res){

  console.log('inside get all employee  function')

  try{
 const employee = await Employee.find().select('fullName email phoneNumber Directorate JobTitle profilePicture SupplementaryFile bio')

 res.status(200).json({message:'user fetched successfully', employee})

 }catch(error){
  console.error('Error while fetching users:', error);
  res.status(500).json({ message: "Failed to fetch users" });
 }
}

export async function getEmployeeById(req , res){
  try{
    const {id} = req.params
    console.log('id ====================== ' + id)
    const employee = await Employee.findById(id).select('-password -__v')
   
    res.status(200).json({message:'employe find by id successfully', employee})
  }catch(error){
   console.error('error while finding user by id');
   res.status(500).json({message:'failed to fetch users'})
  }
}


export const checkAuth = (req, res) => {
  try {     
    res.status(200).json(
    req.user // or req.user._doc if using Mongoose     
    );
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const requestPasswordReset = async (req , res) => {
  try {
   
    const {email} = req.body;
    
    const employe = await Employee.findOne({email})
   
    if(!employe) res.status(404).json({message:"employee not found"})

    
    
    const resetToken = crypto.randomBytes(32).toString("hex");

    employe.resetPasswordToken = resetToken;
    employe.resetPasswordExpire = Date.now() + 3600000; // 1 hour expiry

    await employe.save();

    sendPasswordResateEmail(email , resetToken)

    res.json({ message: "Password reset email sent" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

export const resetPassword = async (req, res) => {
  console.log('inside resate password ')
  try {
    const {token} = req.params;
    console.log('token : ' + token)
    const { newPassword, confirmPassword } = req.body;

    const employee = await Employee.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }, // token not expired
    });

    if (!employee) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    employee.password = await bcrypt.hash(newPassword , 10);
    employee.resetPasswordToken = undefined;
    employee.resetPasswordExpire = undefined;

    await employee.save();

     // Backend resetPassword
     res.status(200).json({ message: "Password reset successful" });



  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    const employee = await Employee.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }, // still valid
    });

    if (!employee) {
      return res.redirect("http://localhost:5173/error?reason=expired"); 
      // React error page
    }

    // Token is valid → redirect user into your frontend reset page
    res.redirect(`http://localhost:5173/change-password/${token}`);

  } catch (err) {
    console.error(err.message);
    res.redirect("http://localhost:5173/error?reason=server");
  }
};
