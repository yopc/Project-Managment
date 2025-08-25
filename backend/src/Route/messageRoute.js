import express from 'express'
import {protectRoute} from "../middleware/middleware.js";
import { getMessages, sendMessage } from '../Controller/messageController.js';
import {upload} from '../lib/config.js'

const router = express.Router();

router.post('/sendMessage/:receiverId' ,
            protectRoute ,  
            upload.fields([    
                { name: 'file', maxCount: 20 }
            ]),
            sendMessage)


router.get('/getMessage/:receiverId', protectRoute , getMessages)

export default router;