const mongoose = require("mongoose");

const Conversation = mongoose.model("conversation", {
  members: [
    {
      value: String,
      label: String,
      unread: Boolean,
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
  const conversations = await Conversation.find({
    "members.value": id,
  });
  // console.log("conversations from model...", conversations);
  // let newConversations = [];
  // newConversations.map;
  // console.log("from model, employeeAvail", employeeAvail);
  return conversations;
};

const updateRead = async (id, read) => {
  let updatedProfile = await EmployeeProfile.findByIdAndUpdate(id, read);
  return updatedProfile;
};

module.exports = {
  create,
  getConversationsByEmployeeProfileId,
  updateRead,
};
