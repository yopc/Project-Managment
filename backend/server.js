import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './src/Route/authRoute.js'
import activityRouter from './src/Route/activityLogRoute.js'
import {connectDB} from './src/lib/db.js'
import multer from 'multer';
import imageRouter from './src/Route/imageRouter.js'
import cors from 'cors'
import employeeRoute from './src/Route/employeeRoute.js';
import projectRouter from './src/Route/projectRouter.js'
import taskRouter from './src/Route/taskRouter.js'
import messageRouter from './src/Route/messageRoute.js'
import http from'http'

import { Server } from 'socket.io';



const upload = multer()

dotenv.config();

const app = express();


app.use(cors({ origin: 'http://localhost:5173' , 
   credentials: true
}));

const server = http.createServer(app);
export const io = new Server(server, {
  cors:{
    origin:'http://localhost:5173',
       methods: ["GET", "POST"],
  }
})

// userId → socketId map
const userSocketMap = {};

export function getReceiverSocketId(receiverId) {
  return userSocketMap[receiverId];
}

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);
  

  console.log('user id for io from frontend' + socket.handshake.auth.userId)

  const userId = socket.handshake.auth.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`Mapped user ${userId} -> socket ${socket.id}`);
  }

  socket.emit("data", "hey frontend 👋");


  socket.on("disconnect", () => {
    console.log("❌ client disconnected", socket.id);
    // cleanup
    Object.keys(userSocketMap).forEach((uid) => {
      if (userSocketMap[uid] === socket.id) {
        delete userSocketMap[uid];
      }
    });
  });
});




const port = process.env.PORT

// Middleware
app.use(express.json());

app.use(cookieParser());

app.use('/user', authRoute)
app.use('/upload', imageRouter)
app.use('/employee', employeeRoute)
app.use('/project', projectRouter)
app.use('/task', taskRouter)  
app.use('/activity', activityRouter)  
app.use('/message', messageRouter)  




// Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);

// });

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);  
  connectDB();
});
