const express = require("express");
const router = express.Router();
const eventModel = require("../models/events");

router.post("/create-event", async (req, res) => {
  let newEvent = req.body;
  let createdEventId = await eventModel.createEvent(newEvent);
  res.send(createdEventId);
  console.log("From API event route eventId:", createdEventId);
});

router.get("/event/get-for-user-type", async (req, res) => {
  let userPermissions = req.query.permissions;
  let eventsList = await eventModel.findEventsByPermission(userPermissions);
  console.log("is the events list", eventsList);
  res.json(eventsList);
});

router.get("/event/get-for-employees", async (req, res) => {
  let eventsList = await eventModel.findEventsForEmployees();
  console.log(eventsList, "is the events list");
  res.json(eventsList);
});

router.get("/event/:id", async (req, res) => {
  let id = req.params.id;
  let event = await eventModel.findById(id);
  res.send(event);
});

router.post("/:id", async (req, res) => {
  let id = req.params.id;
  let updatedEvent = req.body;
  let newUpdatedEvent = await eventModel.updateEvent(id, updatedEvent);
  res.json(newUpdatedEvent);
  console.log("From API event route eventId:", newUpdatedEvent);
});

module.exports = router;
