const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    senderName: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timeStamps: true }
);
module.exports = mongoose.model("message", MessageSchema);
