const router = require("express").Router();
const Conversation = require("../models/conversation");

//new conv

router.post("/", async (req, res) => {
  let members = req.body;
  let createdConversation = await Conversation.create(members);
  res.json(createdConversation);

  console.log(createdConversation);
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  let id = req.params.userId;
  console.log(id);
  let userConversations = await Conversation.Conversation.find({
    "members.value": id,
  });
  res.json(userConversations);
});

// get conv includes two userId

// router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
//   try {
//     const conversation = await Conversation.findOne({
//       members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//     });
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
