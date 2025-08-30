import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    read: { type: Boolean, default: false },
    files: [{
      type: String,
    }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;