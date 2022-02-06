const express = require("express");
const router = express.Router();
const chatModel = require("..models/chat")

router.post("/create", async (req, res) => {
    let newConvo = req.body;
    let createdConversation = await chatModel.create(newConvo);
    res.send(createdConversation);
    console.log("From API new Conversation:", createdConversation);
  });

router.get("/id", async (req, res) => {
    let id = req.query.id;
    let conversations = await chatModel.findById(id);
    console.log("from chat API...id:", conversations);
    res.json(conversations);
  });

  router.post("/update", async (req, res) => {
    let id = req.query.id;
    let updateConvo = req.body;
    let newConvo = await chatModel.update(id, updateConvo);
    res.json(newConvo);
  });


  module.exports = router;