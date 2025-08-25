import { Image } from "../model/image.js";
import File from "../model/File.js";

export async function uploadImage(req , res){
    try {
    const newImage = new Image({
      name: req.body.name || 'Untitled',
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function uploadMultipleFile(req, res) {
  try {
    const allFiles = [];

    // Handle all uploaded files from single input
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        allFiles.push({
          filename: file.originalname,
          contentType: file.mimetype,
          data: file.buffer
        });
      });
    }

    // Save all files to MongoDB
    const savedFiles = await File.insertMany(allFiles);
    res.status(200).json({ message: 'Files uploaded successfully', files: savedFiles });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'File upload failed' });
  }
}


export async function getAllFiles(req, res) {
  try {
    const files = await File.find().select('-__v'); // exclude __v field
    res.status(200).json({ message: 'Files fetched successfully', files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching files' });
  }
}
