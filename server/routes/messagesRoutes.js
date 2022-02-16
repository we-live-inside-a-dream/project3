const router = require("express").Router();
const Message = require("../models/message");
const Conversation = require("../models/conversation");

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// const updateEmployeeProfile = async (id, newEmployeeProfile) => {
//   let updatedProfile = await EmployeeProfile.findByIdAndUpdate(
//     id,
//     newEmployeeProfile
//   );
//   return updatedProfile;
// };

router.post("/unread", async (rq, res) => {
  id = req.query.id; //convo id
  const updateMessage = await Message.findbyIdandUpdate(
    id,
    { read: true },
    { returnDocument: "after" }
  );
  res.send(updateMessage);
});

//get
router.get("/unread", async (req, res) => {
  id = req.query.id;
  const conversations = await Conversation.getConversationsByEmployeeProfileId(
    id
  );
  const convoIds = conversations?.map((c) => c._id.toString());
  console.log(convoIds);

  // find every message with conversationId and see if read = false
  convoIds.forEach(async (cId) => {
    const unread = await Message.find({
      conversationId: cId,
      read: false,
    });
    console.log("unread", unread);
    // let filteredUnread = unread.filter((x) => {
    //   x.values ? x : null;
    // console.log("filteredUnread", filteredUnread);
    // });
  });
  // res.status(200).json(unread);
});

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
