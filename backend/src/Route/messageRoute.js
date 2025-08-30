import express from 'express'
import {protectRoute} from "../middleware/middleware.js";
import { getMessages, sendMessage } from '../Controller/messageController.js';
import {upload} from '../lib/config.js'
import Message from '../model/message.js';

const router = express.Router();

router.post('/sendMessage/:receiverId' ,
            protectRoute ,  
            upload.fields([    
                { name: 'file', maxCount: 20 }
            ]),
            sendMessage)


router.get('/getMessage/:receiverId', protectRoute , getMessages)


router.post('/markRead/:senderId', protectRoute, async (req, res) => {
  await Message.updateMany(
    { senderId: req.params.senderId, receiverId: req.user._id, read: false },
    { $set: { read: true } }
  )
  res.json({ success: true })
})

router.get('/unreadCounts', protectRoute, async (req, res) => {
  const unread = await Message.aggregate([
    { $match: { receiverId: req.user._id, read: false } },
    { $group: { _id: "$senderId", count: { $sum: 1 } } }
  ])
  res.json(unread) // e.g. [{ _id: "userA", count: 3 }, ...]
})



export default router;