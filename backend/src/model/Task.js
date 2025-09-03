import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true , default:"Add Description Here "},
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,            
      enum: ["To Do", "In Progress", "Review", "Completed"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    assignees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
    // watchers: [{ type: Schema.Types.ObjectId, ref: "Employeer" }],
    dueDate: { type: Date },
    completedAt: { type: Date },
    estimatedHours: { type: Number, min: 0 },
    actualHours: { type: Number, min: 0 },
    submitedFile: [{
      data: { type: String },
      date:{
        type:Date,
        default:Date.now
      },
      uploadedBy:{
        type:Schema.Types.ObjectId,ref:"Employee"
      },
      fileType:{
        type:String,
        enum:['attach','submit'],
        default: "submit",
      }        
    }],
    // subtasks: [
    //   {
    //     title: {
    //       type: String,
    //       required: true,
    //     },
    //     completed: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     createdAt: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    attachments: [
      {
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true },
        fileType: { type: String },
        fileSize: { type: Number },
        uploadedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    // isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
