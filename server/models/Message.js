import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    // Person sending the message
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Person receiving the message
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Internship associated with the conversation
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true
    },

    // Message content
    message: {
      type: String,
      required: true,
      trim: true
    },

    // Whether receiver has read the message
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Message = mongoose.model(
  "Message",
  messageSchema
);

export default Message;