import mongoose, { Schema } from "mongoose";

const activityLogSchema = new Schema(
  {
    parentProject:{
      type:Schema.Types.ObjectId,
      ref:"Project"      
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "created_task",
        "updated_task",
        "created_subtask",
        "updated_subtask",
        "completed_task",
        "created_project",
        "updated_project",
        "completed_project", 
        "added_comment",
        "added_member",
        "removed_member",
        "joined_project",
        "transferred_project_ownership",
        "added_attachment",
      ],
    },
    resourceType: {
      type: String,
      required: true,
      enum: ["Task", "Project", "Comment", "Employee"],
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    details: {
      type: Object,
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  { timestamps: true }
);


activityLogSchema.virtual("resource", {
  ref: (doc) => doc.resourceType, // dynamically choose model
  localField: "resourceId",
  foreignField: "_id",
  justOne: true
});

// Ensure virtuals are included in JSON
activityLogSchema.set("toObject", { virtuals: true });
activityLogSchema.set("toJSON", { virtuals: true });


const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
