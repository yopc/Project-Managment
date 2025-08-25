import mongoose from "mongoose";

const imageScheam = new mongoose.Schema({
    name:String,
    img:{
       data:Buffer,
       contentType:String
    }
})

export const  Image = mongoose.model('Image', imageScheam)