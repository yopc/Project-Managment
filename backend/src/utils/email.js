import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); // must be here too if you use process.env in this file


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {

  console.log('app pass: ' + process.env.APP_PASS);
  console.log('email : ' + process.env.EMAIL_USER);
    
  const url = `${process.env.CLIENT_URL}/employee/verfiyEmail?token=${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Email Verification",
    html: `
      <p>Please click the link below to verify your email:</p>
      <a href="${url}">Verify Email</a>
    `,
  });
};

export const sendPasswordResateEmail = async (email , token) => {

   console.log('app pass: ' + process.env.APP_PASS);
  console.log('email : ' + process.env.EMAIL_USER);
   
  const resetUrl = `http://localhost:5000/employee/reset-password/${token}`;

  await transporter.sendMail({
    to:email,
    subject:"Password resate",
    html:  `
      <p>Please click the link below to resate your password:</p>
      <a href="${resetUrl}">Resate Password</a>
    `,
  })
}

export const verfiyEmailForEmployee = async (email , token) =>{
  const url = `${process.env.CLIENT_URL}/employee/verfiyEmail?token${token}`;
  await transporter.sendMail({
    to:email,
    subject:'Email Verificatioin',
    html:`
        <p> Please click the link below to verify your email: </p>
        <a href="${url}">Verify Email</a> 
        `,
  });
}
