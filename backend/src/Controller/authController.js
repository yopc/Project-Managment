import User from '../model/user.js'
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../utils/email.js';
import bcrypt from 'bcrypt'




// export async function signup(req, res) {
   

//   const { email, password, fullName } = req.body;
//   const profilePicture = req.file;

//   try {
//     if (!email || !password || !fullName || !profilePicture) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }


//     const hashedPassword = await bcrypt.hash(password , 10);

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists, please use a diffrent one" });
//     }

  
//     const newUser = await User.create({
//       email,
//       fullName,
//       password:hashedPassword, 
//       profilePicture: {
//         filename: profilePicture.originalname,
//         data: profilePicture.buffer,
//         contentType: profilePicture.mimetype
//       }   
//     });   

//     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "7d",
//     });

//     res.cookie("jwt", token, {
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       httpOnly: true, // prevent XSS attacks,
//       sameSite: "strict", // prevent CSRF attacks
//       secure: process.env.NODE_ENV === "production",
//     });

//     await sendVerificationEmail(email, token);

//      res.status(201).json({ message: "Signup successful. Verify your email." });
//   } catch (error) {
//     console.log("Error in signup controller", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

export async function signup(req, res) {
   

  const { email, password, fullName } = req.body;


  try {
    if (!email || !password || !fullName) {
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists, please use a diffrent one" });
    }

  
    const newUser = await User.create({
      email,
      fullName,
      password:hashedPassword       
    });   

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    await sendVerificationEmail(email, token);

     res.status(201).json({ message: "Signup successful. Verify your email." , newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await bcrypt.compare(password , user.password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });

    if (!user.isVerified) return res.status(401).json({ message: "Please verify your email first" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
}


export async function getUsers(req, res) {
  try {
    const users = await User.find().select('-password -__v'); // exclude sensitive fields
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error('Error while fetching users:', error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
}
