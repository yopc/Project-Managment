import express from "express";
import { upload } from "../lib/config.js";
import { uploadImage, uploadMultipleFile , getAllFiles } from "../Controller/uploadController.js";
const router = express.Router();


router.post('/image' ,upload.single('image') , uploadImage)
router.post('/multipleFile' ,upload.array('files', 10) ,  uploadMultipleFile)
router.get('/files', getAllFiles);



export default router;