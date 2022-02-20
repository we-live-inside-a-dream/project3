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

// router.post("/unread", async (req, res) => {
//   id = req.query.id; //message id

//   const updateMessage = await Message.findByIdAndUpdate(
//     id,
//     { read: true },
//     { returnDocument: "after" }
//   );
//   res.send(updateMessage);
// });

//get
router.get("/unread", async (req, res) => {
  id = req.query.id;
  const conversations = await Conversation.getConversationsByEmployeeProfileId(
    id
  );
  const convoIds = conversations?.map((c) => c._id.toString());
  console.log(convoIds);

  // find every message with conversationId and see if read = false
  let count = 0;
  try {
    for (let cId of convoIds) {
      const unread = await Message.find({
        conversationId: cId,
        read: { $ne: id },
      });
      if (unread.length > 0) {
        count++;
        // array.push(count);
        result = count;
      }
    }
    console.log(result);
    res.json(result);
  } catch {
    res.json(0);
  }
});

router.get("/:conversationId", async (req, res) => {
  convoId = req.params.conversationId;
  user = req.query.user.toString();
  console.log("this is user id", user);
  try {
    const messages = await Message.find({
      conversationId: convoId,
    });

    messages.forEach(async (m) => {
      await Message.findByIdAndUpdate(
        m._id,
        { $addToSet: { read: user } },
        { returnDocument: "after" }
      );
    });

    console.log("messages", messages);

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
