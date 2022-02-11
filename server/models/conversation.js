const mongoose = require("mongoose");

const Conversation = mongoose.model("conversation", {
  members: [
    {
      value: String,
      label: String,
    },
  ],
});

async function create(Data) {
  let newConversation = new Conversation(Data);
  let createdConversation = await newConversation.save();
  // console.log("trying to create schedule", createdSchedule);
  return createdConversation.id;
}

const getConversationsByEmployeeProfileId = async (id) => {
  const conversation = await Conversation.find({members:[id] });
  // console.log("from model, employeeAvail", employeeAvail);
  return employeeAvail;
};

module.exports = {
  create,
  Conversation,
};
