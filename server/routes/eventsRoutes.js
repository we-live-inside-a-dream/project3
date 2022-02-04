const express = require("express");
const router = express.Router();
const eventModel = require("../models/events");

router.post("/create-event", async (req, res) => {
  let newEvent = req.body;
  let createdEventId = await eventModel.createEvent(newEvent);
  res.send(createdEventId);
  console.log("From API event route eventId:", createdEventId);
});

router.post("/:id", async (req, res) => {
  let id = req.params.id;
  let updatedEvent = req.body;
  let newUpdatedEvent = await eventModel.updateEvent(id, updatedEvent);
  res.json(newUpdatedEvent);
  console.log("From API event route eventId:", newUpdatedEvent);
});

module.exports = router;
