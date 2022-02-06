const mongoose = require("./mongooseDb");

const Schedule = mongoose.model("schedule", {
recipients:[{
    id:String,
    name:String
}],
messages:[{
    sender:String,
    text,String,
    senderName:String,
    fromMe:Boolean
}],
selected:Boolean
  });

  async function findById(id) {
    return Schedule.findById(id);
  }

  async function update(id, newConvoData) {
    return Schedule.findByIdAndUpdate(id, newConvoData, {
      returnDocument: "after",
    });
  }

  async function create(convoData) {
    let newConversation = new Schedule(convoData);
    let createdConversation = await newConversation.save();
    console.log("trying to create schedule", createdConversation);
    return createdConversation;
  }

  module.exports = {
findById,
update,
create
  };
  