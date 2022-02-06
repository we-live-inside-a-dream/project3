const mongoose = require("./mongooseDb");

const Chat = mongoose.model("conversations", {
recipients:[{
    id:String,
    firstName:String,
    lastName:String
}],
messages:[{
    sender:String,
    text:String,
    senderName:String,
    fromMe:Boolean
}],
selected:Boolean
  });

  async function findById(id) {
    return Chat.findById(id);
  }

  async function update(id, newConvoData) {
    return Chat.findByIdAndUpdate(id, newConvoData, {
      returnDocument: "after",
    });
  }

  async function create(convoData) {
    let newConversation = new Chat(convoData);
    let createdConversation = await newConversation.save();
    console.log("trying to create schedule", createdConversation);
    return createdConversation;
  }

  module.exports = {
findById,
update,
create
  };
  