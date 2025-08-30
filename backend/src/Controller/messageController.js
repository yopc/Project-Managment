import Message from "../model/message.js";
import { getReceiverSocketId, io } from "../../server.js";
// import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.receiverId;
    const myId = req.user._id;

    

    console.log('reciver id is ' + receiverId)

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  console.log('inside send message function')
  try {

      const senderId = req.user._id; // assume you have authentication middleware

      console.log('sender id ' + senderId)
      const receiverId = req.params.receiverId;

      console.log('reciver id ' + receiverId)

      const text = req.body.text || "";     
      const files = req.files.file || [];

    

      const stringFiles = files.map((file) => (
        `${file.originalname}data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      ))

    

      const message = new Message({
      senderId: senderId,
      receiverId: receiverId,
      text,
      files: stringFiles,
       read: false  
    });

    await message.save();



     const receiverSocketId = getReceiverSocketId(receiverId);
     console.log("receiverSocketId", receiverSocketId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
      }
    

    res.status(201).json(message);
  
   
    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    // res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};